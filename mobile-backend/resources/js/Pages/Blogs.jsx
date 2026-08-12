import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import DarkModeToggle from '@/Components/DarkModeToggle';

export default function Blogs({ auth }) {
    // Modal control state
    const [selectedPost, setSelectedPost] = useState(null);

    const blogPosts = [
        {
            id: 1,
            title: "The Future of Mobile Intelligence: 2026 Edition",
            category: "Technology",
            date: "Jan 15, 2026",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
            excerpt: "Explore how AI is redefining the way we interact with our handheld devices...",
            content: "The year 2026 marks a paradigm shift in mobile technology. AI is no longer just a feature; it is the core engine. From predictive battery management to real-time neural translation, the smartphone has evolved into a personal digital twin that understands your context before you even speak."
        },
        {
            id: 2,
            title: "Why Titanium is the New Standard for Flagships",
            category: "Design",
            date: "Jan 12, 2026",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
            excerpt: "A deep dive into why leading manufacturers are switching to aerospace-grade materials...",
            content: "Strength meets lightness. Titanium grade 5 is now the gold standard for premium mobiles. It offers a superior strength-to-weight ratio compared to stainless steel, making the largest flagship devices feel incredibly light while remaining virtually indestructible."
        },
        {
            id: 3,
            title: "Mobile Photography: Beyond the Megapixels",
            category: "Photography",
            date: "Jan 10, 2026",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000",
            excerpt: "Understanding how variable aperture and AI processing are winning the camera wars...",
            content: "Megapixel counts are now a secondary metric. The real battle is in computational photography. Advanced light sensors combined with periscope telephoto lenses allow for professional-grade bokeh and low-light performance that rivals high-end DSLR cameras."
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f8f8] dark:bg-gray-950 font-sans transition-colors duration-700 relative overflow-x-hidden">
            <Head title="Blogs | ROYAL MOBILES" />

            {/* --- NAV BAR --- */}
            <nav className="flex justify-between items-center px-4 md:px-10 py-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm sticky top-0 z-[60] transition-all border-b dark:border-gray-800">
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
        {/* --- LOGO --- */}
        <Link href="/">
            <h1 className="text-xl md:text-3xl font-black text-black dark:text-white tracking-tighter uppercase italic cursor-pointer shrink-0">
                ROYAL <span className="text-red-600">MOBILES</span>
            </h1>
        </Link>
        
        {/* --- NAV LINKS */}
        <div className="flex flex-wrap items-center gap-3 md:gap-8 text-gray-500 dark:text-gray-400 font-bold uppercase text-[9px] md:text-[11px] tracking-widest md:tracking-[0.2em]">
            <Link href="/" className="hover:text-red-600 transition">Home</Link>
            <Link href={route('shop')} className="hover:text-red-600 transition">Shop</Link>
            <Link href={route('about')} className="hover:text-red-600 transition">About Us</Link>
            <Link href={route('blogs')} className="text-red-600 transition">Blogs</Link>
            <Link href={route('contact')} className="hover:text-red-600 transition">Contact</Link>
        </div>
    </div>

    <div className="flex items-center gap-3 md:gap-6 shrink-0">
        <DarkModeToggle />
        
        {/* --- AUTH CHECK --- */}
        {auth?.user ? (
            <Link href={route('dashboard')} className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-red-600 transition">Account</Link>
        ) : (
            <Link href={route('login')} className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-red-600 transition">Login</Link>
        )}
        
        {/* --- CART ICON --- */}
        <Link href="#" className="text-xl md:text-2xl hover:scale-110 transition p-1.5 md:p-2 bg-gray-50 dark:bg-gray-800 rounded-full">🛒</Link>
    </div>
</nav>

            {/* --- BLOG HERO --- */}
            <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.4] dark:brightness-[0.2] transition-all duration-700 scale-105" 
                    alt="Blog Banner" 
                />
                <div className="relative z-10 text-center space-y-4">
                    <span className="text-red-600 font-black tracking-[0.6em] uppercase text-[10px] bg-red-600/10 px-4 py-2 rounded-full">Royal Insights</span>
                    <h2 className="text-white text-6xl md:text-9xl font-black uppercase tracking-tighter italic animate-pulse">The Journal</h2>
                    <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full"></div>
                </div>
            </div>

            {/* --- LATEST STORIES --- */}
            <div className="max-w-7xl mx-auto py-32 px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-6">
                    <div className="text-center md:text-left">
                        <span className="text-red-600 font-bold tracking-widest text-xs uppercase">Curated Content</span>
                        <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic mt-2">Latest Stories</h3>
                    </div>
                    <div className="hidden md:block h-[1px] flex-1 bg-gray-200 dark:bg-gray-800 mx-12"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="group flex flex-col cursor-pointer" onClick={() => setSelectedPost(post)}>
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[50px] mb-8 shadow-2xl dark:shadow-none border dark:border-gray-800 group-hover:border-red-600 transition-all duration-700">
                                <img 
                                    src={post.image} 
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                                    alt={post.title} 
                                />
                                <div className="absolute top-8 left-8">
                                    <span className="bg-white/90 backdrop-blur-md text-black px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="px-4">
                                <span className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{post.date}</span>
                                <h4 className="text-2xl font-black text-gray-900 dark:text-white mt-4 mb-4 leading-tight group-hover:text-red-600 transition-colors uppercase italic tracking-tight">
                                    {post.title}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 italic text-sm line-clamp-2">
                                    "{post.excerpt}"
                                </p>
                                <button 
                                    className="inline-block text-[11px] font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white border-b-2 border-red-600 pb-1 group-hover:bg-red-600 group-hover:text-white group-hover:px-4 transition-all duration-300 w-fit"
                                >
                                    Read Article
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- PREMIUM MODAL POPUP --- */}
            {selectedPost && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500"
                        onClick={() => setSelectedPost(null)}
                    ></div>

                    <div className="relative bg-white dark:bg-gray-950 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[40px] md:rounded-[60px] shadow-2xl border dark:border-gray-800 scrollbar-hide animate-modal-entry">
                        
                        <button 
                            onClick={() => setSelectedPost(null)}
                            className="absolute top-6 right-6 md:top-10 md:right-10 z-20 bg-black text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all hover:bg-red-600 hover:rotate-90"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-1/2 h-[300px] lg:h-auto overflow-hidden">
                                <img src={selectedPost.image} className="w-full h-full object-cover" alt={selectedPost.title} />
                            </div>

                            <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                                <span className="text-red-600 font-black tracking-[0.4em] text-[10px] uppercase mb-4">
                                    {selectedPost.category}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-[1.1] mb-8">
                                    {selectedPost.title}
                                </h2>
                                <div className="prose prose-lg dark:prose-invert">
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8 italic">
                                        {selectedPost.content}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 border-t dark:border-gray-900 pt-8 mt-4">
                                    <div className="w-12 h-12 bg-gradient-to-tr from-red-600 to-black rounded-full"></div>
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white">Royal Editorial Team</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{selectedPost.date} • 5 MIN READ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- NEWSLETTER SECTION --- */}
            <div className="max-w-7xl mx-auto pb-32 px-6">
                <div className="bg-white dark:bg-gray-900 rounded-[80px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border dark:border-gray-800">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]"></div>
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">Stay Ahead of <span className="text-red-600">the Curve</span></h2>
                        <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mt-12">
                            <input type="email" placeholder="Enter your email" className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-full px-8 py-5 text-sm dark:text-white focus:ring-2 focus:ring-red-600 outline-none" />
                            <button className="bg-black dark:bg-red-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition shadow-xl text-xs">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FOOTER --- */}
            <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 py-16 transition-colors text-center">
                <h2 className="text-2xl font-black italic uppercase dark:text-white tracking-tighter">ROYAL <span className="text-red-600">MOBILES</span></h2>
                <p className="text-gray-400 dark:text-gray-600 text-[10px] font-black uppercase tracking-[0.4em] mt-6">© 2026 ROYAL MOBILES. All Rights Reserved.</p>
            </footer>

            {/* Modal Animations CSS */}
            <style jsx="true">{`
                @keyframes modalEntry {
                    0% { opacity: 0; transform: scale(0.9) translateY(20px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-modal-entry {
                    animation: modalEntry 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}