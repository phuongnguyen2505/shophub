import type { LucideIcon } from 'lucide-react';
import { 
    Smartphone, Laptop, Flower2, Sprout, ShoppingBasket, 
    Home, Sofa, Shirt, Footprints, Watch, Handbag, Gem 
} from 'lucide-react';

export interface Category {
    name: string;
    slug: string;
    icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
    { name: 'Smartphones', slug: 'smartphones', icon: Smartphone },
    { name: 'Laptops', slug: 'laptops', icon: Laptop },
    { name: 'Fragrances', slug: 'fragrances', icon: Flower2 },
    { name: 'Skincare', slug: 'skincare', icon: Sprout },
    { name: 'Groceries', slug: 'groceries', icon: ShoppingBasket },
    { name: 'Home Decoration', slug: 'home-decoration', icon: Home },
    { name: 'Furniture', slug: 'furniture', icon: Sofa },
    { name: 'Tops', slug: 'tops', icon: Shirt },
    { name: 'Womens Dresses', slug: 'womens-dresses', icon: Shirt },
    { name: 'Womens Shoes', slug: 'womens-shoes', icon: Footprints },
    { name: 'Mens Shirts', slug: 'mens-shirts', icon: Shirt },
    { name: 'Mens Shoes', slug: 'mens-shoes', icon: Footprints },
    { name: 'Mens Watches', slug: 'mens-watches', icon: Watch },
    { name: 'Womens Watches', slug: 'womens-watches', icon: Watch },
    { name: 'Womens Bags', slug: 'womens-bags', icon: Handbag },
    { name: 'Womens Jewellery', slug: 'womens-jewellery', icon: Gem },
];