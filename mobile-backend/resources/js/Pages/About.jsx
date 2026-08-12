import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function About({ auth }) {
    const [cartCount, setCartCount] = useState(0);
    // Dark mode state 
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Initial dark mode setup
        if (localStorage.getItem('theme') === 'dark' || 
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }

        const updateCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartCount(cart.length);
        };

        updateCount();
        window.addEventListener('storage', updateCount);
        return () => window.removeEventListener('storage', updateCount);
    }, []);

    // Dark Mode change Function
    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setDarkMode(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#f3f4f6] dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Head title="About Us | ROYAL MOBILES" />

            {/* --- NAV BAR --- */}
            <nav className="flex justify-between items-center px-4 md:px-10 py-5 bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 transition-all border-b dark:border-zinc-800">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12">
                    <Link href="/">
                        <h1 className="text-xl md:text-3xl font-black text-black dark:text-white tracking-tighter uppercase italic shrink-0">
                            ROYAL <span className="text-red-600">MOBILES</span>
                        </h1>
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-3 md:gap-8 text-gray-500 dark:text-zinc-400 font-bold uppercase text-[9px] md:text-[11px] tracking-widest md:tracking-[0.2em]">
                        <Link href={route('home')} className="hover:text-red-600 transition">Home</Link>
                        <Link href={route('shop')} className="hover:text-red-600 transition">Shop</Link>
                        <Link href={route('about')} className="text-red-600 transition">About</Link>
                        <Link href={route('blogs')} className="hover:text-red-600 transition">Blogs</Link>
                        <Link href={route('contact')} className="hover:text-red-600 transition">Contact</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6 shrink-0">
                    {/* --- DARK MODE TOGGLE BUTTON --- */}
                    <button 
                        onClick={toggleDarkMode}
                        className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:scale-110 transition-all duration-300 shadow-inner"
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>

                    {auth?.user ? (
                        <Link href={route('dashboard')} className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-700 dark:text-zinc-300 hover:text-red-600 transition">Account</Link>
                    ) : (
                        <Link href={route('login')} className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-700 dark:text-zinc-300 hover:text-red-600 transition">Login</Link>
                    )}
                    
                    <Link 
                        href={route('cart')} 
                        className="text-xl md:text-2xl hover:scale-110 transition relative inline-block p-1.5 bg-gray-50 dark:bg-zinc-800 rounded-full"
                    >
                        🛒
                        <span className="absolute -top-1 -right-2 bg-red-600 text-[8px] md:text-[10px] text-white rounded-full h-4 w-4 flex items-center justify-center font-bold">
                            {cartCount}
                        </span>
                    </Link>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="relative h-[450px] md:h-[650px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/images/about-hero.jpg" 
                        className="w-full h-full object-cover"
                        alt="Royal Mobiles Premium Store"
                    />
                    <div className="absolute inset-0 bg-black/50 dark:bg-black/70 transition-colors"></div>
                </div>
                
                <div className="relative z-10 text-center animate-slideIn px-4">
                    <h1 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter italic leading-none">
                        ROYAL <span className="text-red-600">MOBILES</span>
                    </h1>
                    <p className="text-white text-lg md:text-2xl mt-6 font-light tracking-[0.2em] uppercase max-w-3xl mx-auto">
                        The Ultimate Destination for Premium Flagships
                    </p>
                    <div className="mt-10 h-1 w-32 bg-red-600 mx-auto rounded-full"></div>
                </div>
            </div>

            {/* --- HERITAGE SECTION --- */}
            <div className="max-w-7xl mx-auto py-20 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group overflow-hidden rounded-[40px] shadow-2xl h-[400px] md:h-[500px]">
                        <img 
                            src="/images/about-heritage.jpg" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            alt="Our Heritage"
                        />
                        <div className="absolute bottom-10 left-10 bg-black/60 backdrop-blur-md border border-white/20 px-6 py-2 rounded-xl">
                            <span className="text-white font-bold tracking-widest uppercase text-sm">Our Heritage</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-[40px] p-8 md:p-12 shadow-xl flex flex-col justify-center border border-gray-100 dark:border-zinc-800 transition-colors">
                        <span className="text-red-600 font-bold tracking-widest text-sm uppercase mb-4 tracking-[0.3em]">Crafting the Best</span>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight mb-6 transition-colors">
                            Mobile Experience <br/> in Sri Lanka
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
                            ROYAL MOBILES was established with a visionary goal to redefine how Sri Lankans experience technology. We are not just a retailer; we are a gateway to the future.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed italic border-l-4 border-red-600 pl-6">
                            "We don't just sell smartphones; we provide a curated experience for those who demand excellence in every detail."
                        </p>
                    </div>
                </div>
            </div>

            {/* --- CORE PROMISES --- */}
            <div className="max-w-7xl mx-auto pb-24 px-6">
                <div className="bg-white dark:bg-zinc-900 rounded-[50px] p-8 md:p-20 shadow-2xl relative overflow-hidden border border-gray-50 dark:border-zinc-800 transition-colors">
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter dark:text-white transition-colors">Our Core Promises</h2>
                            <div className="h-1 w-24 bg-red-600 mt-4 md:mt-0 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-4 group">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-inner">💎</div>
                                <h3 className="text-xl font-black uppercase italic tracking-wide dark:text-white">Authentic Gear</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Every device is guaranteed 100% genuine, brand new, and factory-sealed for your total peace of mind.</p>
                            </div>
                            <div className="space-y-4 group">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-inner">⚡</div>
                                <h3 className="text-xl font-black uppercase italic tracking-wide dark:text-white">Swift Delivery</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Our lightning-fast island-wide shipping ensures your flagship arrives safely at your doorstep.</p>
                            </div>
                            <div className="space-y-4 group">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-inner">🛠️</div>
                                <h3 className="text-xl font-black uppercase italic tracking-wide dark:text-white">Expert Care</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Professional after-sales support and technical guidance to keep your tech performing at its peak.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FINAL CALL TO ACTION --- */}
            <div className="py-20 text-center bg-gray-900 dark:bg-black relative overflow-hidden transition-colors">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-10 tracking-tighter relative z-10 px-4">
                    Ready to join the <span className="text-red-600">Royal</span> lifestyle?
                </h2>
                <Link href={route('shop')} className="relative z-10 bg-red-600 text-white px-10 md:px-16 py-4 md:py-6 rounded-full font-black hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.2em] shadow-2xl inline-block text-sm md:text-base">
                    Explore Our Shop
                </Link>
            </div>

            {/* --- PROFESSIONAL FOOTER --- */}
            <footer className="bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800 pt-20 pb-10 transition-colors">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div>
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic mb-6 dark:text-white">
                            ROYAL <span className="text-red-600">MOBILES</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            The leading destination for premium flagship smartphones in Sri Lanka. Excellence in every device.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-gray-400">Navigation</h4>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-widest">
                            <li><Link href={route('home')} className="hover:text-red-600 transition">Home</Link></li>
                            <li><Link href={route('shop')} className="hover:text-red-600 transition">Shop</Link></li>
                            <li><Link href={route('about')} className="hover:text-red-600 transition">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-gray-400">Support</h4>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-widest">
                            <li><Link href="#" className="hover:text-red-600 transition">Shipping</Link></li>
                            <li><Link href={route('contact')} className="hover:text-red-600 transition">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase text-xs tracking-widest mb-6 text-gray-400">Social</h4>
                        <div className="flex gap-4">
                            <span className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer font-bold text-xs dark:text-white">FB</span>
                            <span className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer font-bold text-xs dark:text-white">IG</span>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-gray-50 dark:border-zinc-900 text-center">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        © 2026 ROYAL MOBILES. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}