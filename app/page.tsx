import React from 'react';
import Link from 'next/link';
import ProductsList from './components/ProductsList';

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/product-create" className="btn">
        Create Product
      </Link>

      <ProductsList />

    </main>
  );
};

export default Home;
