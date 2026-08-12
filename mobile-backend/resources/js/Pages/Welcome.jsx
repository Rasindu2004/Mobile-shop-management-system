import { Link, Head } from '@inertiajs/react'; 
import { useState, useEffect } from 'react';
import DarkModeToggle from '@/Components/DarkModeToggle';

export default function Welcome({ auth, products }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    //cart count
    useEffect(() => {
        const updateCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartCount(cart.length);
        };
        updateCount();
        window.addEventListener('storage', updateCount);
        return () => window.removeEventListener('storage', updateCount);
    }, []);

    //add to cart 
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('storage'));
        alert(`${product.name} added to cart!`);
    };

    const slides = [
        { brand: "Apple", title: "IPHONE 17 PRO MAX", description: "Apple Intelligence. Beyond Pro. The first-ever Titanium-infused unibody design.", img: "/images/slider/iphone.png", bgColor: "bg-white dark:bg-gray-800" },
        { brand: "Samsung", title: "GALAXY S26 ULTRA", description: "Epic. Just like that. Integrated S-Pen and the world's most advanced 300MP AI Camera.", img: "/images/slider/samsung.png", bgColor: "bg-white dark:bg-gray-800" },
        { brand: "Google", title: "PIXEL 10 PRO", description: "The cleanest Android experience. Powered by the groundbreaking Tensor G5 chip.", img: "/images/slider/pixel.png", bgColor: "bg-gray-50 dark:bg-gray-800" },
        { brand: "Xiaomi", title: "XIAOMI 17 ULTRA", description: "The masterwork. Leica optical lens with the first-ever 1-inch variable aperture.", img: "/images/slider/xiaomi.png", bgColor: "bg-white dark:bg-gray-800" },
        { brand: "Infinix", title: "ZERO ULTRA 2026", description: "Thunder Charge. 300W charging that powers your day in just 5 minutes.", img: "/images/slider/infinix.png", bgColor: "bg-gray-100 dark:bg-gray-800" },
        { brand: "Redmi", title: "REDMI K90 PRO", description: "Performance King. Snapdragon 8 Gen 5 for the ultimate gaming experience.", img: "/images/slider/redmi.png", bgColor: "bg-white dark:bg-gray-800" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000); 
        return () => clearInterval(timer);
    }, [slides.length]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f8f8f8] dark:bg-gray-950 font-sans transition-colors duration-700">
            <Head title="ROYAL MOBILES | The Flagship Experience" />
            
            {/* --- NAV BAR --- */}
            <nav className="flex justify-between items-center px-4 md:px-10 py-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 transition-all border-b dark:border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                    <h1 className="text-xl md:text-3xl font-black text-black dark:text-white tracking-tighter uppercase italic shrink-0">
                        ROYAL <span className="text-red-600">MOBILES</span>
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-3 md:gap-8 text-gray-500 dark:text-gray-400 font-bold uppercase text-[9px] md:text-[11px] tracking-widest md:tracking-[0.2em]">
                        <Link href={route('home')} className="text-red-600 transition">Home</Link>
                        <Link href={route('shop')} className="hover:text-red-600 transition">Shop</Link>
                        <Link href={route('about')} className="hover:text-red-600 transition">About</Link>
                        <Link href={route('blogs')} className="hover:text-red-600 transition">Blogs</Link>
                        <Link href={route('contact')} className="hover:text-red-600 transition">Contact</Link>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 md:gap-6">
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Search Bar */}
                        <div className="relative group">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-gray-100 dark:bg-gray-800 border-none rounded-full py-1.5 md:py-2.5 px-4 md:px-6 text-[10px] md:text-sm focus:ring-2 focus:ring-red-500 w-24 md:w-64 dark:text-gray-200 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-5">
                        <DarkModeToggle />

                        <div className="flex items-center gap-2 md:gap-5">
                            {auth?.user ? (
                                <>
                                    <Link 
                                        href={route('dashboard')} 
                                        className="text-[9px] md:text-xs font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-red-600 transition"
                                    >
                                        Account
                                    </Link>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <Link 
                                    href={route('login')} 
                                    className="text-[9px] md:text-xs font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-red-600 transition"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Cart Icon */}
                        <Link 
                            href={route('cart')} 
                            className="text-xl md:text-2xl hover:scale-110 transition relative p-1.5 md:p-2 bg-gray-50 dark:bg-gray-800 rounded-full"
                        >
                            🛒
                            <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] md:text-[10px] text-white rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold shadow-lg">
                                {cartCount}
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* --- SLIDER & PRODUCTS (Keep same as before) --- */}
            <div className="max-w-[1600px] mx-auto px-4 py-6 overflow-hidden">
                {/* ... Slider code ... */}
                <div className={`relative ${slides[currentSlide].bgColor} rounded-[60px] h-[650px] flex items-center shadow-2xl overflow-hidden group transition-colors duration-[1500ms] ease-in-out`}>
                    <h1 className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-[150px] md:text-[300px] font-black text-gray-200/50 dark:text-gray-700/20 uppercase -z-0 select-none tracking-tighter transition-all duration-[1500ms] ease-in-out">
                        {slides[currentSlide].brand}
                    </h1>

                    <div className="flex flex-col md:flex-row items-center w-full z-10 px-8 md:px-28">
                        <div key={`text-${currentSlide}`} className="flex-1 text-center md:text-left animate-slideIn">
                            <span className="inline-block text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-4">Flagship of 2026</span>
                            <h2 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white leading-[0.9] mt-2 mb-6 tracking-tighter italic">
                                {slides[currentSlide].title}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md text-lg md:text-xl font-medium leading-relaxed italic">
                                "{slides[currentSlide].description}"
                            </p>
                            <div className="flex gap-4 mt-12 justify-center md:justify-start">
                                <Link href={route('shop')} className="bg-black dark:bg-red-600 text-white px-12 py-5 rounded-full font-bold shadow-2xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 uppercase text-xs tracking-widest">
                                    Pre-Order Now
                                </Link>
                                <button className="border-2 border-black dark:border-white text-black dark:text-white px-12 py-5 rounded-full font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 uppercase text-xs tracking-widest">
                                    Details
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 relative flex justify-center items-center mt-12 md:mt-0">
                            <img 
                                key={`img-${currentSlide}`}
                                src={slides[currentSlide].img} 
                                className="w-[350px] md:w-[550px] drop-shadow-[0_50px_50px_rgba(0,0,0,0.3)] transition-all duration-[1500ms] scale-100 hover:scale-105 cursor-pointer object-contain animate-zoomIn"
                                alt="Flagship Device"
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-4">
                        {slides.map((_, index) => (
                            <button 
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1.5 transition-all duration-[1000ms] rounded-full ${currentSlide === index ? 'w-16 bg-red-600' : 'w-8 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* --- TRENDING PRODUCTS --- */}
            <div className="max-w-7xl mx-auto py-24 px-6">
                <div className="flex flex-col items-center mb-16">
                    <span className="text-red-600 font-bold tracking-widest text-sm uppercase mb-2">Exclusive Deals</span>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight italic">Recently Added</h2>
                    <div className="h-1 w-20 bg-red-600 mt-4 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="group">
                            <div className="bg-white dark:bg-gray-900 rounded-[50px] h-[400px] relative overflow-hidden flex items-center justify-center p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none border dark:border-gray-800 hover:shadow-2xl dark:hover:border-red-600 transition-all duration-700">
                                <img src={`/storage/${product.image}`} className="w-full h-full object-contain group-hover:scale-110 transition duration-1000" alt={product.name} />
                                <div className="absolute bottom-8 flex gap-2 translate-y-20 group-hover:translate-y-0 transition-all duration-500">
                                    <button 
                                        onClick={() => addToCart(product)}
                                        className="bg-black dark:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 transition uppercase text-xs"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 text-center">
                                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg uppercase tracking-wide">{product.name}</h3>
                                <div className="flex flex-col items-center mt-1">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-tighter">From</span>
                                        <p className="text-red-600 font-black text-2xl tracking-wider italic">
                                            Rs. {Number(product.price).toLocaleString()}
                                        </p>
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500/80 dark:text-red-400/80 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-full mt-0.5 transition-all">
                                        Upwards
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 py-10 transition-colors">
                <div className="text-center">
                    <h2 className="text-xl font-black italic uppercase dark:text-white">ROYAL <span className="text-red-600">MOBILES</span></h2>
                    <p className="text-gray-400 dark:text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-4">© 2026 ROYAL MOBILES. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}