import { Link, Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    // 1. Load cart items from localStorage on component mount
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        const sum = cart.reduce((acc, item) => acc + Number(item.price), 0);
        setTotal(sum);
        
        // Pre-fill form data with cart items and total amount
        setData(prev => ({ ...prev, items: cart, total_amount: sum }));
    }, []);

    // 2. Inertia Form Helper
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        payment_method: 'cash', 
        card_number: '', 
        card_expiry: '',
        card_cvc: '',
        items: [],
        total_amount: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('checkout.store'), {
            preserveScroll: true,
            onSuccess: () => {
                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('storage'));
                reset();
            },
        });
    };

    // Success State - Order completed
    if (wasSuccessful) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center p-6">
                <div className="space-y-8 animate-fade-in">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white">
                        Royal Order <span className="text-red-600">Confirmed!</span>
                    </h2>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">Welcome to the inner circle. Your flagship is being prepared.</p>
                    <Link href={route('shop')} className="inline-block bg-white text-black px-16 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl">
                        Continue Experience
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600">
            <Head title="Secure Checkout | ROYAL MOBILES" />
            
            {/* Minimal Navigation with Logout */}
            <nav className="flex justify-between items-center px-10 py-8 bg-black/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
                <h1 className="text-2xl font-black tracking-tighter uppercase italic">ROYAL <span className="text-red-600">MOBILES</span></h1>
                
                <div className="flex items-center gap-8">
                    <Link href={route('cart')} className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-all">← Back to Bag</Link>
                    
                    {/* Logout Button Added Here */}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-[10px] font-black uppercase tracking-widest bg-red-600 text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Logout [→
                    </Link>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-20 px-6">
                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        
                        {/* LEFT: Shipping & Payment Form */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-6xl font-black uppercase italic tracking-tighter">Shipping <span className="text-red-600">Protocol</span></h2>
                                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Complete your premium acquisition</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" placeholder="Full Name" required className="bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-red-600 outline-none transition" onChange={e => setData('name', e.target.value)} />
                                    <input type="email" placeholder="Email Address" required className="bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-red-600 outline-none transition" onChange={e => setData('email', e.target.value)} />
                                </div>
                                <input type="text" placeholder="Phone Number" required className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-red-600 outline-none transition" onChange={e => setData('phone', e.target.value)} />
                                <textarea placeholder="Delivery Address" required rows="4" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-red-600 outline-none transition" onChange={e => setData('address', e.target.value)}></textarea>

                                {/* Settlement Method Selection */}
                                <div className="pt-6">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50">Settlement Method</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button type="button" onClick={() => setData('payment_method', 'cash')} className={`p-6 rounded-3xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${data.payment_method === 'cash' ? 'border-red-600 bg-red-600/10 text-white' : 'border-white/5 bg-white/5 text-gray-500'}`}>
                                            <span className="block text-2xl mb-2">💵</span> Cash on Delivery
                                        </button>
                                        <button type="button" onClick={() => setData('payment_method', 'card')} className={`p-6 rounded-3xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${data.payment_method === 'card' ? 'border-red-600 bg-red-600/10 text-white' : 'border-white/5 bg-white/5 text-gray-500'}`}>
                                            <span className="block text-2xl mb-2">💳</span> Card Payment
                                        </button>
                                    </div>
                                </div>

                                {data.payment_method === 'card' && (
                                    <div className="p-8 bg-white/5 rounded-[40px] border border-white/10 space-y-4 animate-in fade-in duration-500">
                                        <input type="text" placeholder="Card Number" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none" onChange={e => setData('card_number', e.target.value)} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="MM / YY" className="bg-black/40 border border-white/10 p-4 rounded-xl outline-none" onChange={e => setData('card_expiry', e.target.value)} />
                                            <input type="text" placeholder="CVC" className="bg-black/40 border border-white/10 p-4 rounded-xl outline-none" onChange={e => setData('card_cvc', e.target.value)} />
                                        </div>
                                    </div>
                                )}

                                <button disabled={processing} className="w-full bg-red-600 py-8 rounded-full font-black uppercase tracking-[0.4em] text-[11px] hover:bg-white hover:text-black transition-all duration-700 shadow-[0_20px_60px_rgba(220,38,38,0.25)]">
                                    {processing ? 'Encrypting Order...' : `Confirm Acquisition — Rs. ${total.toLocaleString()}`}
                                </button>
                            </form>
                        </div>

                        {/* RIGHT: Order Summary Card */}
                        <div className="lg:sticky lg:top-32 h-fit">
                            <div className="bg-white text-black rounded-[60px] p-12 relative overflow-hidden">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 border-b border-black/5 pb-6 opacity-40">Review Selection</h3>
                                
                                <div className="space-y-8 mb-12 max-h-[400px] overflow-y-auto pr-2">
                                    {cartItems.map((item, idx) => (
                                        <div key={idx} className="flex gap-6 items-center">
                                            <div className="w-20 h-20 bg-gray-100 rounded-3xl p-3 flex-shrink-0">
                                                <img src={`/storage/${item.image}`} className="w-full h-full object-contain" alt={item.name} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-black uppercase italic text-sm leading-tight">{item.name}</h4>
                                                <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest">{item.selected_storage || item.storage} EDITION</span>
                                            </div>
                                            <span className="font-black italic text-sm">Rs.{Number(item.price).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 border-t border-black/5 pt-8">
                                    <div className="flex justify-between text-[10px] font-bold uppercase opacity-40 tracking-widest">
                                        <span>Logistics</span>
                                        <span className="text-green-600 font-black">Complimentary</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-2">
                                        <span className="font-black uppercase italic text-4xl tracking-tighter">Total</span>
                                        <span className="font-black text-4xl italic tracking-tighter text-red-600">Rs. {total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white/5 rounded-[80px] border border-white/5">
                        <h3 className="text-4xl font-black uppercase italic mb-8 opacity-20 tracking-tighter">Your Bag is Empty</h3>
                        <Link href={route('shop')} className="inline-block bg-red-600 text-white px-16 py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">
                            Browse Collection
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}