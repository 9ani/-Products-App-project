'use client';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchProducts } from '../services/productsService';
import { FormattedProduct } from './ProductCreate';

interface Props {
  newProduct: FormattedProduct | null; 
}

const ProductsList: React.FC<Props> = ({ newProduct }) => {
  const { data, error, isLoading, isError } = useQuery('products', fetchProducts);

  useEffect(() => {
    
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((product: FormattedProduct) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md mb-4" />
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <span className="text-gray-500">${product.price}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        </div>
      ))}
      {newProduct && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src={newProduct.image} alt={newProduct.title} className="w-full h-48 object-cover rounded-md mb-4" />
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{newProduct.title}</h2>
            <span className="text-gray-500">${newProduct.price}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{newProduct.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
