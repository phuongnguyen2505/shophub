import { ProductsApiResponse, User } from '@/types';
import axios from 'axios';
import { AuthCredentials, AuthResponse } from '@/types';
import { Product } from '@/types';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const loginUser = async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

export const getProducts = async (limit = 20, skip = 0): Promise<ProductsApiResponse> => {
    try {
        const response = await apiClient.get(`/products?limit=${limit}&skip=${skip}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return { products: [], total: 0, skip: 0, limit: 0 };
    }
};

export const searchProducts = async (query: string): Promise<ProductsApiResponse> => {
    try {
        const response = await apiClient.get(`/products/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error('Failed to search products:', error);
        return { products: [], total: 0, skip: 0, limit: 0 };
    }
};

export const updateUser = async (userId: number, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put(`/users/${userId}`, data, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

export const getProductById = async (id: string | number): Promise<Product | null> => {
    try {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch product with id ${id}:`, error);
        return null;
    }
};

export const getProductsByCategory = async (category: string, limit = 4): Promise<ProductsApiResponse> => {
    try {
        const response = await apiClient.get(`/products/category/${category}?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch products in category ${category}:`, error);
        return { products: [], total: 0, skip: 0, limit: 0 };
    }
};