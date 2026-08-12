import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ProductView({ product }) {
    const [selectedVariant, setSelectedVariant] = useState(product.storage_prices[0]);
    const [isHovered, setIsHovered] = useState(false);

    const addToCart = () => {
        const item = {
            id: product.id,
            name: product.name,
            storage: selectedVariant.storage,
            price: selectedVariant.price,
            image: product.image,
            qty: 1
        };
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('storage'));
        alert(`${product.name} (${selectedVariant.storage}) added to cart!`);
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-red-100">
            <Head title={`${product.name} | ROYAL MOBILES`} />
            
            {/* Minimalist Nav (Optional - if not in Layout) */}
            <div className="max-w-7xl mx-auto px-10 py-8 flex justify-between items-center">
                <Link href={route('shop')} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Collection
                </Link>
            </div>

            <main className="max-w-7xl mx-auto px-10 py-12 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                    
                    {/* --- LEFT: ULTRA PREMIUM IMAGE DISPLAY --- */}
                    <div className="lg:col-span-7 sticky top-32">
                        <div 
                            className="relative aspect-[4/5] bg-[#f9f9f9] rounded-[60px] overflow-hidden group border border-gray-100 flex items-center justify-center p-16"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Decorative background element */}
                            <div className="absolute top-10 left-10 text-[120px] font-black opacity-[0.02] select-none uppercase italic leading-none">
                                {product.brand}
                            </div>

                            <img 
                                src={`/storage/${product.image}`} 
                                alt={product.name}
                                className={`w-full h-full object-contain transition-all duration-[1.5s] ease-out ${isHovered ? 'scale-110 rotate-2' : 'scale-100'}`}
                            />

                            {/* Floating Badge */}
                            <div className="absolute bottom-10 left-10 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white shadow-xl shadow-black/5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Original Flagship</span>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: ELEGANT DETAILS PANEL --- */}
                    <div className="lg:col-span-5 space-y-12">
                        <header className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="h-[1px] w-12 bg-red-600"></span>
                                <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px]">{product.brand} Excellence</span>
                            </div>
                            <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-[0.9] text-gray-900">
                                {product.name.split(' ').map((word, i) => (
                                    <span key={i} className={i === 0 ? "block" : "block text-red-600"}>{word} </span>
                                ))}
                            </h1>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm">
                                Elevate your digital lifestyle with the peak of mobile engineering. Precision crafted for those who demand the absolute best.
                            </p>
                        </header>

                        {/* --- SELECTOR SECTION --- */}
                        <section className="space-y-10">
                            {/* Storage Grid */}
                            <div className="space-y-5">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Choose Capacity</label>
                                    <span className="text-[10px] font-bold text-black bg-gray-100 px-3 py-1 rounded-md">{selectedVariant.storage}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.storage_prices.map((variant, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`relative overflow-hidden group py-5 rounded-[24px] font-black uppercase text-[11px] tracking-widest transition-all border-2 
                                                ${selectedVariant.storage === variant.storage 
                                                    ? 'border-black bg-black text-white shadow-2xl shadow-black/20' 
                                                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-300'
                                                }`}
                                        >
                                            {variant.storage}
                                            {selectedVariant.storage === variant.storage && (
                                                <div className="absolute top-0 right-0 w-8 h-8 bg-red-600 rounded-bl-full flex items-center justify-center pl-2 pb-2">
                                                    <span className="text-white text-[8px]">✓</span>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Presentation */}
                            <div className="p-10 bg-black rounded-[40px] text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                    <svg width="60" height="60" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-1.63-.33-3.13-1.25-4.14-2.58l1.62-1.03c.83 1.09 1.99 1.83 3.32 2.05v-2.91c-2.31-.62-4.14-1.72-4.14-4.22 0-2.22 1.63-3.72 3.84-4.16V3h2.82v1.94c1.37.28 2.63 1.01 3.51 2.08l-1.65 1.04c-.65-.81-1.46-1.32-2.37-1.52v2.79c2.51.72 4.41 1.95 4.41 4.39 0 2.44-1.99 3.86-4.51 4.37zM10.6 8.32c0 .64.49 1.03 1.41 1.3v-2.6c-.88.22-1.41.61-1.41 1.3zm2.81 7.21c1.08-.26 1.7-.8 1.7-1.48 0-.74-.63-1.12-1.7-1.4v2.88z"/></svg>
                                </div>
                                <span className="text-gray-500 text-[9px] font-black uppercase tracking-[0.4em] block mb-2">Total Investment</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-red-600 text-xl font-black italic uppercase">Rs.</span>
                                    <h2 className="text-5xl font-black italic tracking-tighter">
                                        {Number(selectedVariant.price).toLocaleString()}
                                    </h2>
                                </div>
                            </div>
                        </section>

                        {/* --- CTA BUTTON --- */}
                        <div className="pt-6">
                            <button 
                                onClick={addToCart}
                                className="w-full bg-red-600 text-white py-8 rounded-full font-black uppercase tracking-[0.4em] text-[12px] shadow-[0_20px_40px_rgba(220,38,38,0.25)] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-500"
                            >
                                Secure Your Flagship
                            </button>
                            <div className="flex justify-center gap-8 mt-8">
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">In Stock</p>
                                    <p className="text-[10px] font-bold text-gray-900 uppercase tracking-tighter">Ready to Ship</p>
                                </div>
                                <div className="w-[1px] bg-gray-100"></div>
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Warranty</p>
                                    <p className="text-[10px] font-bold text-gray-900 uppercase tracking-tighter">Official Royal Care</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}