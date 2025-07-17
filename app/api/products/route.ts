import { NextRequest, NextResponse } from 'next/server';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

// Static array to hold products
let products: Product[] = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
];

// Helper to find product index by id
function findProductIndex(id: number) {
  return products.findIndex((p) => p.id === id);
}

// GET /api/products or /api/products?id=1
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get('id');

  if (idParam) {
    const id = parseInt(idParam, 10);
    const product = products.find((p) => p.id === id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  return NextResponse.json(products);
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price } = body;

    if (!name || !description || typeof price !== 'number') {
      return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
    }

    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct: Product = { id: newId, name, description, price };
    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

// PUT /api/products?id=1
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get('id');

  if (!idParam) {
    return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
  }

  const id = parseInt(idParam, 10);
  const index = findProductIndex(id);

  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const { name, description, price } = body;

    if (!name || !description || typeof price !== 'number') {
      return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
    }

    products[index] = { id, name, description, price };
    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

// DELETE /api/products?id=1
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get('id');

  if (!idParam) {
    return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
  }

  const id = parseInt(idParam, 10);
  const index = findProductIndex(id);

  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  products.splice(index, 1);
  return NextResponse.json({ message: 'Product deleted' });
}
