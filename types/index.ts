export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    weight?: number;
    dimensions?: Dimensions;
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    tags?: string[];
    sku?: string;
    reviews?: Review[];
}

export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface ProductsApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    address?: {
        address?: string;
        city?: string;
        postalCode?: string;
    };
}

export interface AuthCredentials {
    username?: string;
    password?: string;
}

export interface AuthResponse extends User {
    token: string;
}