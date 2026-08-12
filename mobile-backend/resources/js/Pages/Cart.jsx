import { Link, Head, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 

export default function Cart() {
    const { auth } = usePage().props; //  get logging users details
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    // LocalStorage data loading
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        calculateTotal(cart);
    }, []);

    // total price calculation
    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => {
            const price = typeof item.price === 'string' 
                ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
                : item.price;
            return acc + price;
        }, 0);
        setTotal(sum);
    };

    // item delete on cart
    const removeItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
        window.dispatchEvent(new Event('storage'));
    };

    // --- AUTH CHECK LOGIC ---
    const handleCheckout = (e) => {
        e.preventDefault();

        if (!auth?.user) {
            // customer is not logged in, show the royal access alert
            Swal.fire({
                title: 'ROYAL ACCESS REQUIRED',
                text: 'Please login to your account to proceed with secure checkout.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'LOGIN NOW',
                cancelButtonText: 'LATER',
                background: '#0a0c10',
                color: '#fff',
                confirmButtonColor: '#dc2626', // Red color for Royal theme
                cancelButtonColor: '#374151',
                customClass: {
                    popup: 'rounded-[30px] border border-white/10 shadow-2xl',
                    title: 'italic font-black uppercase tracking-tighter',
                    confirmButton: 'rounded-full px-8 py-3 font-bold uppercase tracking-widest text-[10px]',
                    cancelButton: 'rounded-full px-8 py-3 font-bold uppercase tracking-widest text-[10px]'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    router.get(route('login'));
                }
            });
        } else {
            
            router.visit(route('checkout'));
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600">
            <Head title="Royal Cart | Luxury Experience" />

            {/* Premium Navbar */}
            <nav className="flex justify-between items-center px-6 md:px-12 py-6 md:py-8 bg-black/50 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50">
    {/* --- LOGO --- */}
    <Link href="/" className="text-lg md:text-2xl font-black tracking-tighter italic uppercase shrink-0">
        ROYAL <span className="text-red-600">MOBILES</span>
    </Link>

    {/* --- CONTINUE SHOPPING LINK --- */}
    <Link 
        href={route('shop')} 
        className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] hover:text-red-600 transition text-right"
    >
        Continue Shopping
    </Link>
</nav>
            <div className="max-w-7xl mx-auto py-20 px-6 relative">
                <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-16 opacity-10 absolute -top-10 left-10 select-none">
                    Your Bag
                </h2>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative z-10">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-10">
                            {cartItems.map((item, index) => (
                                <div key={index} className="group flex flex-col md:flex-row items-center gap-10 bg-gradient-to-r from-white/[0.03] to-transparent p-8 rounded-[40px] border border-white/5 hover:border-red-600/30 transition-all duration-700">
                                    <div className="w-48 h-48 bg-black rounded-3xl overflow-hidden flex items-center justify-center p-4 border border-white/10 group-hover:scale-105 transition-transform duration-500">
                                        <img src={`/storage/${item.image}`} alt={item.name} className="object-contain w-full h-full shadow-2xl" />
                                    </div>
                                    
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                                            <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] block">Premium Device</span>
                                            {item.selected_storage && (
                                                <span className="bg-white text-black text-[9px] px-3 py-1 rounded-full font-black tracking-widest uppercase">
                                                    {item.selected_storage}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <h3 className="text-3xl font-black uppercase italic tracking-tight mb-2">{item.name}</h3>
                                        <p className="text-gray-500 text-[10px] mb-6 uppercase tracking-widest font-bold italic">
                                            {item.selected_storage ? `${item.selected_storage} Exclusive Edition` : 'Standard Edition'}
                                        </p>
                                        
                                        <button onClick={() => removeItem(index)} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-600 transition-colors">
                                            Remove Item [—]
                                        </button>
                                    </div>

                                    <div className="text-3xl font-black italic text-white pr-4">
                                        Rs. {Number(item.price).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white text-black rounded-[50px] p-12 sticky top-32 shadow-[0_30px_100px_rgba(255,255,255,0.05)]">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-10 border-b border-black/10 pb-4">Order Summary</h3>
                                <div className="space-y-6 mb-12">
                                    <div className="flex justify-between font-bold uppercase text-[10px] tracking-widest">
                                        <span className="opacity-50">Subtotal</span>
                                        <span>Rs. {total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-bold uppercase text-[10px] tracking-widest">
                                        <span className="opacity-50">Shipping</span>
                                        <span className="text-green-600 font-black">Complimentary</span>
                                    </div>
                                    <div className="pt-6 border-t border-black/10 flex justify-between items-end">
                                        <span className="font-black uppercase italic text-2xl tracking-tighter">Total</span>
                                        <span className="font-black text-4xl italic tracking-tighter">Rs. {total.toLocaleString()}</span>
                                    </div>
                                </div>

                               
                                <button 
                                    onClick={handleCheckout} 
                                    className="block w-full bg-black text-white text-center py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-red-600 transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-2xl"
                                >
                                    Secure Checkout →
                                </button>

                                <p className="text-center text-[9px] font-bold uppercase tracking-widest mt-6 opacity-40">
                                    Tax included. Shipping calculated at checkout.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Premium Empty Cart View */
                    <div className="text-center py-20 animate-fade-in relative z-10">
                        <div className="relative inline-block mb-10">
                             <div className="absolute inset-0 bg-red-600 blur-[120px] opacity-20"></div>
                             <img 
                                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000&auto=format&fit=crop" 
                                alt="Empty Bag" 
                                className="w-80 h-80 object-cover rounded-[60px] grayscale brightness-50 border border-white/10 relative z-10"
                             />
                        </div>
                        <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Your Bag is Empty</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-10 font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed">
                            The world's most powerful devices are waiting for you. Start your royal collection today.
                        </p>
                        <Link href={route('shop')} className="inline-block bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all">
                            Go To Shop
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}