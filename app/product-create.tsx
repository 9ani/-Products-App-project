import React from 'react';
import ProductCreate from './components/ProductCreate';

const ProductCreatePage: React.FC<string> = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Create a New Product</h1>
      <ProductCreate />
    </main>
  );
};

export default ProductCreatePage;
