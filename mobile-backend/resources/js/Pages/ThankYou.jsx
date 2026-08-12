import { Link, Head } from '@inertiajs/react';

export default function ThankYou({ order }) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
            <Head title="Order Confirmed" />
            
            <div className="max-w-2xl w-full">
                {/* Main Card */}
                <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 print:shadow-none print:border-none">
                    
                    {/* Top Section: Success Message */}
                    <div className="bg-blue-600 p-10 text-center text-white print:bg-white print:text-black print:p-5">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm print:hidden">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Order Confirmed!</h1>
                        <p className="opacity-90 font-medium">Hi {order?.customer || 'Customer'}, your order is being processed.</p>
                    </div>

                    {/* Middle Section: Order Details */}
                    <div className="p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 mb-10 border-b border-gray-100 pb-8">
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Order Number</p>
                                <p className="text-lg font-bold text-gray-800">#{order?.order_id || 'RM-00000'}</p>
                            </div>
                            <div className="md:text-right">
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Order Date</p>
                                <p className="text-lg font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Customer & Shipping Details */}
                        <div className="mb-10">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-4 tracking-widest">Shipping & Billing Details</h3>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Customer Name:</span>
                                    <span className="text-gray-800 font-bold text-sm">{order?.customer || 'N/A'}</span>
                                </div>
                                
                                {/* Phone Number - Security Updated */}
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Phone Number:</span>
                                    <span className="text-gray-800 font-bold text-sm">
                                        {order?.phone || order?.customer_phone || order?.phone_number || 'N/A'}
                                    </span>
                                </div>

                                {/* Delivery Address - Security Updated */}
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Delivery Address:</span>
                                    <span className="text-gray-800 font-bold text-sm text-right max-w-[200px]">
                                        {order?.address || order?.shipping_address || order?.billing_address || 'N/A'}
                                    </span>
                                </div>

                                <div className="flex justify-between pt-2 border-t border-gray-200/50">
                                    <span className="text-gray-500 text-sm font-bold uppercase">Payment Method:</span>
                                    <span className="text-blue-600 font-black text-sm uppercase italic tracking-wider">
                                        {order?.payment_method || 'Cash on Delivery'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Box */}
                        <div className="bg-white rounded-3xl p-6 mb-8 border-2 border-dashed border-gray-200">
                            <h3 className="text-xs font-black uppercase text-gray-400 mb-4 tracking-widest">Final Bill Summary</h3>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">Subtotal</span>
                                <span className="text-gray-800 font-bold">Rs. {order?.total || '0.00'}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">Delivery Fee</span>
                                <span className="text-green-600 font-bold uppercase text-[10px]">Free</span>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <span className="text-gray-800 font-black uppercase text-sm">Total Paid/Due</span>
                                <span className="text-2xl font-black text-blue-600">Rs. {order?.total || '0.00'}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
                            <Link 
                                href={route('home')} 
                                className="bg-blue-600 text-white text-center font-black py-4 rounded-2xl uppercase text-[11px] tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                            >
                                Back to Home
                            </Link>
                            <button 
                                onClick={() => window.print()}
                                className="bg-gray-800 text-white text-center font-black py-4 rounded-2xl uppercase text-[11px] tracking-widest hover:bg-gray-900 transition"
                            >
                                Print Receipt
                            </button>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
                            Royal Mobiles - The Best Gadgets in Town
                        </p>
                    </div>
                </div>
                
                <p className="text-center mt-8 text-gray-400 text-xs font-medium print:hidden">
                    A confirmation email has been sent to your inbox.
                </p>
            </div>
        </div>
    );
}