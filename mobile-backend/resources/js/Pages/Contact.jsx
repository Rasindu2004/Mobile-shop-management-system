import { Link, Head, useForm } from '@inertiajs/react'; 
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 

export default function Contact({ auth }) { 
    // --- CART COUNTER LOGIC ---
    const [cartCount, setCartCount] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
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

    // --- FORM LOGIC---
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                reset();
                //success alert
                Swal.fire({
                    title: 'MESSAGE TRANSMITTED',
                    text: 'Your royal request has been received successfully.',
                    icon: 'success',
                    background: darkMode ? '#18181b' : '#fff',
                    color: darkMode ? '#fff' : '#000',
                    confirmButtonColor: '#dc2626',
                    confirmButtonText: 'EXCELLENT'
                });
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#f8f8f8] dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Head title="Contact | ROYAL MOBILES" />

            {/* --- NAV BAR --- */}
            <nav className="flex justify-between items-center px-4 md:px-10 py-5 bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 transition-all border-b dark:border-zinc-900">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12">
                    <Link href="/">
                        <h1 className="text-xl md:text-3xl font-black text-black dark:text-white tracking-tighter uppercase italic shrink-0">
                            ROYAL <span className="text-red-600">MOBILES</span>
                        </h1>
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-3 md:gap-8 text-gray-500 dark:text-zinc-400 font-bold uppercase text-[9px] md:text-[11px] tracking-widest md:tracking-[0.2em]">
                        <Link href={route('home')} className="hover:text-red-600 transition">Home</Link>
                        <Link href={route('shop')} className="hover:text-red-600 transition">Shop</Link>
                        <Link href={route('about')} className="hover:text-red-600 transition">About</Link>
                        <Link href={route('blogs')} className="hover:text-red-600 transition">Blogs</Link>
                        <Link href={route('contact')} className="text-red-600 transition">Contact</Link>
                    </div>
                </div>

                <div className="flex items-center gap-3 md:gap-6 shrink-0">
                    <button 
                        onClick={toggleDarkMode}
                        className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:scale-110 transition-all duration-300 shadow-inner"
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>

                    {auth?.user ? (
                        <Link href={route('dashboard')} className="text-[9px] md:text-xs font-black uppercase tracking-widest text-gray-700 dark:text-zinc-300 hover:text-red-600 transition">Account</Link>
                    ) : (
                        <Link href={route('login')} className="text-[9px] md:text-xs font-black uppercase tracking-widest text-gray-700 dark:text-zinc-300 hover:text-red-600 transition">Login</Link>
                    )}
                    
                    <Link 
                        href={route('cart')} 
                        className="text-xl md:text-2xl hover:scale-110 transition relative p-2 bg-gray-50 dark:bg-zinc-800 rounded-full"
                    >
                        🛒
                        <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] md:text-[10px] text-white rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold shadow-lg">
                            {cartCount}
                        </span>
                    </Link>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="relative h-[400px] flex items-center justify-center bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-gradient-to-b from-gray-800 to-black dark:from-zinc-900 dark:to-black"></div>
                <div className="relative z-10 text-center px-4">
                    <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter italic animate-slideIn">Connect With Us</h2>
                    <p className="text-red-600 uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold text-xs mt-4">Experience Royal Service</p>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
                
                {/* --- CONTACT INFO --- */}
                <div className="space-y-12">
                    <div>
                        <span className="text-red-600 font-black uppercase tracking-widest text-xs">Direct Contact</span>
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2 mb-6 italic dark:text-white">Visit our <br/> Flagship Store</h3>
                        <p className="text-gray-500 dark:text-zinc-400 text-lg leading-relaxed max-w-md italic">
                            Experience the latest technology firsthand at our premium showroom in the heart of Colombo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                            <h4 className="font-black uppercase text-xs tracking-widest text-gray-400">Main Showroom</h4>
                            <p className="font-bold text-lg italic dark:text-zinc-200">Galle Road, Colombo 03, <br/> Sri Lanka</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-black uppercase text-xs tracking-widest text-gray-400">Business Hours</h4>
                            <p className="font-bold text-lg italic dark:text-zinc-200">Mon - Sun: 9:00 AM - 8:00 PM</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-black uppercase text-xs tracking-widest text-gray-400">Support Line</h4>
                            <p className="font-bold text-lg text-red-600">+94 112 345 678</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-black uppercase text-xs tracking-widest text-gray-400">Email</h4>
                            <p className="font-bold text-lg underline italic dark:text-zinc-200">hello@royalmobiles.lk</p>
                        </div>
                    </div>
                </div>

                {/* --- PREMIUM FORM --- */}
                <div className="bg-white dark:bg-zinc-900 rounded-[50px] p-8 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-gray-50 dark:border-zinc-800 transition-colors">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Full Name"
                                    className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-3xl py-5 px-8 focus:ring-2 focus:ring-red-600 transition-all placeholder:font-bold placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest italic dark:text-white"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-red-600 text-[10px] font-black italic mt-2 ml-4 uppercase tracking-widest">{errors.name}</p>}
                            </div>

                            <div>
                                <input 
                                    required
                                    type="email" 
                                    placeholder="Email Address"
                                    className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-3xl py-5 px-8 focus:ring-2 focus:ring-red-600 transition-all placeholder:font-bold placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest italic dark:text-white"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="text-red-600 text-[10px] font-black italic mt-2 ml-4 uppercase tracking-widest">{errors.email}</p>}
                            </div>

                            <div>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Subject"
                                    className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-3xl py-5 px-8 focus:ring-2 focus:ring-red-600 transition-all placeholder:font-bold placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest italic dark:text-white"
                                    value={data.subject}
                                    onChange={e => setData('subject', e.target.value)}
                                />
                                {errors.subject && <p className="text-red-600 text-[10px] font-black italic mt-2 ml-4 uppercase tracking-widest">{errors.subject}</p>}
                            </div>

                            <div>
                                <textarea 
                                    required
                                    rows="4" 
                                    placeholder="Your Message"
                                    className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-[35px] py-5 px-8 focus:ring-2 focus:ring-red-600 transition-all placeholder:font-bold placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest resize-none italic dark:text-white"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                ></textarea>
                                {errors.message && <p className="text-red-600 text-[10px] font-black italic mt-2 ml-4 uppercase tracking-widest">{errors.message}</p>}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full bg-black dark:bg-white dark:text-black text-white py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-red-600 hover:text-white transition-all shadow-2xl disabled:opacity-50 group"
                        >
                            {processing ? 'Processing...' : 'Transmit Message'}
                        </button>
                    </form>
                </div>
            </div>

            {/* --- FOOTER --- */}
            <footer className="bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 pt-20 pb-10 transition-colors">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                    <div>
                        <h2 className="text-2xl font-black uppercase italic mb-6 dark:text-white">ROYAL <span className="text-red-600">MOBILES</span></h2>
                        <p className="text-gray-500 dark:text-zinc-400 text-sm italic">The premier destination for elite mobile technology in Sri Lanka.</p>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[10px] tracking-widest mb-6 text-gray-400 font-sans">Navigation</h4>
                        <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-600 dark:text-zinc-400 italic">
                            <li><Link href={route('home')} className="hover:text-red-600 transition">Home</Link></li>
                            <li><Link href={route('shop')} className="hover:text-red-600 transition">Shop</Link></li>
                            <li><Link href={route('about')} className="hover:text-red-600 transition">About</Link></li>
                            <li><Link href={route('blogs')} className="hover:text-red-600 transition">Blogs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[10px] tracking-widest mb-6 text-gray-400 font-sans">Legal</h4>
                        <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-600 dark:text-zinc-400 italic">
                            <li>Privacy Policy</li>
                            <li>Terms of Use</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase text-[10px] tracking-widest mb-6 text-gray-400 font-sans">Follow Us</h4>
                        <div className="flex justify-center md:justify-start gap-4 font-black italic text-xs dark:text-zinc-300">
                            <span className="hover:text-red-600 cursor-pointer transition">INSTAGRAM</span>
                            <span className="hover:text-red-600 cursor-pointer transition">FACEBOOK</span>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-20 pt-8 border-t border-gray-50 dark:border-zinc-900 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    © 2026 ROYAL MOBILES. STYLED FOR EXCELLENCE.
                </div>
            </footer>
        </div>
    );
}