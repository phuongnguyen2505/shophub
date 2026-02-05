'use client';

import Link from 'next/link';
import CartIconWithCount from './CartIconWithCount';
import { ChevronDown, LogOut, Package, Menu, X } from 'lucide-react';
import { CATEGORIES } from '@/constants/categories';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        router.push('/');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setIsDropdownOpen(false);
            }
            if (categoryRef.current && !categoryRef.current.contains(target)) {
                setIsCategoryOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const CategoryLink = ({ category }: { category: typeof CATEGORIES[0] }) => {
        const Icon = category.icon;
        return (
            <Link
                href={`/category/${category.slug}`}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                onClick={() => setIsCategoryOpen(false)}
            >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{category.name}</span>
            </Link>
        );
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground flex-shrink-0">
                    <Package className="w-6 h-6" />
                    <span className="hidden sm:inline">ShopHub</span>
                </Link>
                <div className="hidden lg:flex items-center space-x-1">
                    <Link href="/" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-slate-100">
                        All Products
                    </Link>
                    <div className="relative" ref={categoryRef}>
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-slate-100"
                        >
                            Categories
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isCategoryOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 mt-2 w-96 rounded-xl bg-white shadow-xl ring-1 ring-gray-200"
                                >
                                    <div className="grid grid-cols-2 gap-1 p-3">
                                        {CATEGORIES.map((category) => (
                                            <CategoryLink key={category.slug} category={category} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <CartIconWithCount />
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-1 text-sm font-medium px-2 py-2 rounded-md hover:bg-slate-100 transition-colors"
                            >
                                <span className="hidden sm:inline">Hi, {user.firstName}</span>
                                <span className="sm:hidden">{user.firstName}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-gray-200"
                                    >
                                        <div className="px-4 py-3 border-b bg-slate-50">
                                            <p className="text-sm font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
                                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-red-600 text-white px-3 md:px-4 py-2 rounded-md hover:bg-red-700 text-sm font-medium transition-colors"
                        >
                            <span className="hidden sm:inline">Login</span>
                            <span className="sm:hidden">Sign In</span>
                        </Link>
                    )}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-md hover:bg-slate-100"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden border-t bg-white"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            <Link
                                href="/"
                                className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                All Products
                            </Link>
                            <details className="group">
                                <summary className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md">
                                    Categories
                                    <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="space-y-1 px-2 py-2">
                                    {CATEGORIES.map((category) => (
                                        <CategoryLink key={category.slug} category={category} />
                                    ))}
                                </div>
                            </details>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}