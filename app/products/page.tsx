'use client';

import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<{ id?: number; name: string; description: string; price: string }>({
    name: '',
    description: '',
    price: '',
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit for create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const priceNum = parseFloat(form.price);
    if (!form.name || !form.description || isNaN(priceNum)) {
      setError('Please fill all fields correctly.');
      return;
    }

    try {
      let res: Response;
      if (isEditing && form.id !== undefined) {
        res = await fetch(`/api/products?id=${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, description: form.description, price: priceNum }),
        });
      } else {
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, description: form.description, price: priceNum }),
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save product');
      }

      setForm({ name: '', description: '', price: '' });
      setIsEditing(false);
      fetchProducts();
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    }
  };

  // Handle edit button click
  const handleEdit = (product: Product) => {
    setForm({ id: product.id, name: product.name, description: product.description, price: product.price.toString() });
    setIsEditing(true);
  };

  // Handle delete button click
  const handleDelete = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete product');
      }
      fetchProducts();
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    }
  };

  // Handle cancel editing
  const handleCancel = () => {
    setForm({ name: '', description: '', price: '' });
    setIsEditing(false);
    setError(null);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Products</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <div>
          <label>
            Name:{' '}
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Description:{' '}
            <textarea name="description" value={form.description} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Price:{' '}
            <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required />
          </label>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <button type="submit">{isEditing ? 'Update' : 'Add'} Product</button>{' '}
          {isEditing && <button type="button" onClick={handleCancel}>Cancel</button>}
        </div>
      </form>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table border={1} cellPadding={5} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
