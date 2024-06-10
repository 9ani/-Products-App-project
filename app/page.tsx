"use client"

import React from 'react';
import Link from 'next/link';
import ProductsList from './components/ProductsList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/product-create" className="btn">
        Create Product
      </Link>

      <ProductsList />

    </main>
  );
}
