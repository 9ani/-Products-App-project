"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import ProductsList from './ProductsList';
import  FormattedProduct  from './ProductCreate';
export type FormattedProduct = {
  id?: number; 
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const ProductCreate: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [loadedBytes, setLoadedBytes] = useState<number>(0);
  const [totalBytes, setTotalBytes] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const router = useRouter();

  const [newProduct, setNewProduct] = useState<typeof FormattedProduct | null>(null);

  const mutation = useMutation(async (newProduct: FormattedProduct) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);
      console.log('New product added:', response.data);
      setNewProduct(response.data);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding new product:', error);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File | null) => {
    if (!file) {
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const loaded = progressEvent.loaded;
          const total = progressEvent.total ?? 0;
          setTotalBytes(total);
          const percent = (loaded / total) * 100;
          setUploadProgress(Math.round(percent));
          setStatus(Math.round(percent) + "% uploaded...");
        }
      });
      return response.data.location;
    } catch (error) {
      console.error('Error uploading image:', error);
      setStatus('Upload failed');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrl = await uploadFile(image);

    const formattedProduct: FormattedProduct = {
      title,
      price,
      description,
      image: imageUrl,
      category: 'electronic'
    };

    mutation.mutate(formattedProduct);
  };

  const toggleForm = (): void => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {!showForm && (
        <button onClick={toggleForm} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Create Product
        </button>
      )}

      {showForm && (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4">
          <h1 className="text-lg font-semibold mb-4">Create Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Image</label>
              <input type="file" onChange={handleFileChange} className="border" required />
              {uploadProgress > 0 && (
                <div className="mt-2">
                  <label>File progress: <progress value={uploadProgress} max="100" /></label>
                  <p>{status}</p>
                  <p>Uploaded {loadedBytes} bytes of {totalBytes}</p>
                </div>
              )}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Product</button>
          </form>
        </div>
      )}

      {newProduct && <ProductsList newProduct={newProduct} />}
    </div>
  );
};

export default ProductCreate;