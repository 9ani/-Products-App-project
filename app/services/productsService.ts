import axiosInstance from '../axiosInstance';

export const fetchProducts = async () => {
  const { data } = await axiosInstance.get('/products');
  return data;
};

export const createProduct = async (product: any) => {
  const { data } = await axiosInstance.post('/products', product);
  return data;
};
