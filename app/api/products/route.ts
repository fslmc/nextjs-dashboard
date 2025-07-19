import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

// GET /api/products or /api/products?id=1
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');

    if (idParam) {
      const id = parseInt(idParam, 10);
      const product = await prisma.product.findUnique({
        where: { id },
      });
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product);
    }

    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price } = body;

    if (!name || !description || typeof price !== 'number') {
      return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: { name, description, price },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/products?id=1
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');

    if (!idParam) {
      return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
    }

    const id = parseInt(idParam, 10);
    const body = await request.json();
    const { name, description, price } = body;

    if (!name || !description || typeof price !== 'number') {
      return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price },
    });

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/products?id=1
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');

    if (!idParam) {
      return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
    }

    const id = parseInt(idParam, 10);
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
