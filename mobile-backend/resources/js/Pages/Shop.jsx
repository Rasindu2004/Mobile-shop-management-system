import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Shop({ auth, products }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const [activeCategory, setActiveCategory] = useState('Mobile');
    
    // --- Dark Mode State ---
    const [darkMode, setDarkMode] = useState(false);

    // Dark Mode Initialization
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setDarkMode(true);
        }
    };

    // cart Updating Logic
    useEffect(() => {
        const updateCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartCount(cart.length);
        };
        updateCount();
        window.addEventListener('storage', updateCount);
        return () => window.removeEventListener('storage', updateCount);
    }, []);

    const addToCart = (product, selectedVariant) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemToAdd = {
            ...product,
            selected_storage: selectedVariant?.storage || 'Standard',
            price: selectedVariant?.price || product.price
        };
        cart.push(itemToAdd);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('storage'));
        alert(`${product.name} (${itemToAdd.selected_storage}) added to cart!`);
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        // Main Container
        <div className="min-h-screen bg-[#f8f8f8] dark:bg-[#0f0f0f] font-sans transition-colors duration-500">
            <Head title="Shop | ROYAL MOBILES" />

            {/* --- NAV BAR --- */}
            <nav className="flex justify-between items-center px-4 md:px-10 py-5 bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 transition-all border-b border-gray-50 dark:border-zinc-900">
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12">
        {/* --- LOGO --- */}
        <h1 className="text-xl md:text-3xl font-black text-black dark:text-white tracking-tighter uppercase italic shrink-0">
            ROYAL <span className="text-red-600">MOBILES</span>
        </h1>

        {/* --- NAV LINKS --- */}
        <div className="flex flex-wrap items-center gap-3 md:gap-8 text-gray-500 dark:text-zinc-400 font-bold uppercase text-[9px] md:text-[11px] tracking-widest md:tracking-[0.2em]">
            <Link href={route('home')} className="hover:text-red-600 transition">Home</Link>
            <Link href={route('shop')} className="text-red-600 transition">Shop</Link>
            <Link href={route('about')} className="hover:text-red-600 transition">About Us</Link>
            <Link href={route('blogs')} className="hover:text-red-600 transition">Blogs</Link>
            <Link href={route('contact')} className="hover:text-red-600 transition">Contact</Link>
        </div>
    </div>
    
    <div className="flex flex-wrap items-center justify-end gap-3 md:gap-6 shrink-0">
        {/* --- SEARCH BAR ---*/}
        <div className="relative group">
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 dark:bg-zinc-900 border-none rounded-full py-1.5 md:py-2.5 px-4 md:px-6 text-[10px] md:text-sm focus:ring-2 focus:ring-red-500 w-24 md:w-64 transition-all dark:text-white"
            />
        </div>

        {/* --- CART & DARK MODE --- */}
        <div className="flex items-center gap-2 md:gap-6">
            <Link 
                href={route('cart')} 
                className="text-xl md:text-2xl hover:scale-110 transition relative p-1.5 md:p-2 bg-gray-50 dark:bg-zinc-900 rounded-full"
            >
                🛒
                <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] md:text-[10px] text-white rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold shadow-lg">
                    {cartCount}
                </span>
            </Link>

            <button 
                onClick={toggleDarkMode}
                className="p-1.5 md:p-2 bg-gray-100 dark:bg-zinc-900 rounded-full hover:scale-110 transition-all duration-300"
            >
                {darkMode ? '☀️' : '🌙'}
            </button>
        </div>
    </div>
</nav>

            {/* --- SHOP HERO --- */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <img src="/images/shop-hero.jpg" className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" alt="Shop Banner" />
                <div className="relative z-10 text-center">
                    <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs mb-4 block animate-fadeIn">Limited Edition</span>
                    <h2 className="text-white text-7xl font-black uppercase tracking-tighter italic leading-none animate-slideIn">The Collection</h2>
                    <p className="text-gray-400 uppercase tracking-[0.4em] text-[10px] mt-6 font-bold">Refining the flagship standard</p>
                </div>
            </div>

            {/* --- CATEGORY TABS --- */}
            <div className="flex gap-4 mt-12 justify-center">
                <button 
                    onClick={() => setActiveCategory('Mobile')}
                    className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-sm ${
                        activeCategory === 'Mobile' 
                        ? 'bg-black text-white dark:bg-white dark:text-black scale-105' 
                        : 'bg-white text-gray-400 dark:bg-zinc-900 dark:text-zinc-500 hover:text-black dark:hover:text-white'
                    }`}
                >
                    Mobile Phones
                </button>
                <button 
                    onClick={() => setActiveCategory('Accessories')}
                    className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-sm ${
                        activeCategory === 'Accessories' 
                        ? 'bg-black text-white dark:bg-white dark:text-black scale-105' 
                        : 'bg-white text-gray-400 dark:bg-zinc-900 dark:text-zinc-500 hover:text-black dark:hover:text-white'
                    }`}
                >
                    Accessories
                </button>
            </div>

            {/* --- PRODUCT GRID --- */}
            <div className="max-w-7xl mx-auto py-16 px-6 min-h-[500px]">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {filteredProducts.map((product) => (
                            <ProductItem key={product.id} product={product} addToCart={addToCart} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32">
                        <div className="inline-block p-8 bg-white dark:bg-zinc-900 rounded-full shadow-sm mb-6 text-2xl">🔍</div>
                        <p className="text-gray-400 dark:text-zinc-600 font-bold uppercase tracking-widest text-sm">
                            No {activeCategory.toLowerCase()} match your search.
                        </p>
                    </div>
                )}
            </div>

            {/* --- FOOTER --- */}
            <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-900 pt-20 pb-10 mt-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic mb-6 dark:text-white">
                        ROYAL <span className="text-red-600">MOBILES</span>
                    </h2>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        © 2026 ROYAL MOBILES. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

function ProductItem({ product, addToCart }) {
    const hasStorage = product.storage_prices && product.storage_prices.length > 0;
    const [selectedVariant, setSelectedVariant] = useState(hasStorage ? product.storage_prices[0] : null);

    return (
        <div className="group">
            <div className="bg-white dark:bg-zinc-900 rounded-[50px] h-[420px] relative overflow-hidden flex items-center justify-center p-12 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-700 border border-gray-50 dark:border-zinc-800">
                <img 
                    src={`/storage/${product.image}`} 
                    className="w-full h-full object-contain group-hover:scale-110 transition duration-1000" 
                    alt={product.name} 
                />
                <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                        onClick={() => addToCart(product, selectedVariant)}
                        className="bg-black text-white dark:bg-white dark:text-black px-10 py-4 rounded-full font-bold translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white uppercase text-[10px] tracking-widest"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center px-2">
                <span className="text-red-600 text-[9px] font-black uppercase tracking-[0.3em]">{product.brand}</span>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg uppercase mt-1 tracking-tight">{product.name}</h3>
                
                {hasStorage && (
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {product.storage_prices.map((variant, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedVariant(variant)}
                                className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all duration-300 ${
                                    selectedVariant?.storage === variant.storage 
                                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md' 
                                    : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-500 hover:border-gray-400'
                                }`}
                            >
                                {variant.storage}
                            </button>
                        ))}
                    </div>
                )}

                <div className="mt-5 flex flex-col items-center">
                    <p className="text-gray-950 dark:text-white font-black text-2xl italic tracking-tight">
                        Rs. {selectedVariant ? Number(selectedVariant.price).toLocaleString() : Number(product.price).toLocaleString()}
                    </p>
                    <span className="mt-1 text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-600">
                        {selectedVariant ? `${selectedVariant.storage} Edition` : 'Original Accessory'}
                    </span>
                </div>
            </div>
        </div>
    );
}