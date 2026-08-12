import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';

export default function Dashboard({ auth, products = [], orders = [], contacts = [], users = [] }) {
    const userRole = auth?.user?.role || 'user';

    const { data, setData, post, processing, reset } = useForm({
        name: '', 
        brand: '', 
        price: '', 
        category: 'Mobile', 
        image: null,
        storage_prices: [{ storage: '', price: '' }], 
    });

    const addPriceOption = () => setData('storage_prices', [...data.storage_prices, { storage: '', price: '' }]);
    
    const handlePriceChange = (index, field, value) => {
        const newPrices = [...data.storage_prices];
        newPrices[index][field] = value;
        setData('storage_prices', newPrices);
    };

    const submitProduct = (e) => {
        e.preventDefault();
        post(route('products.store'), { 
            onSuccess: () => reset(), 
            forceFormData: true 
        });
    };

    const updateOrderStatus = (id, status) => {
        router.patch(route('orders.updateStatus', id), { status }, { preserveScroll: true });
    };

    const deleteProduct = (id) => {
        if (confirm('Delete this item?')) router.delete(route('products.destroy', id), { preserveScroll: true });
    };

    const deleteMessage = (id) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('contact.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth?.user} 
            header={
                <h2 className="text-xl font-black leading-tight text-gray-900 dark:text-white uppercase tracking-tighter italic">
                    You're In <span className="text-red-600 ml-1">{userRole === 'admin' ? 'ADMIN PANEL' : 'DEALER PORTAL'}</span>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div 
                className="py-12 min-h-screen relative overflow-hidden transition-colors duration-500 bg-cover bg-center bg-no-repeat bg-fixed"
                style={{ 
                    backgroundImage: "url('/images/bg-image.jpg')", 
                }}
            >
                <div className="absolute inset-0 bg-white/40 dark:bg-zinc-950/70 backdrop-blur-[1px] z-0"></div>
                
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-red-500/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[25%] bg-blue-500/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-10">
                    
                    {/* 1. STOCK MANAGEMENT */}
                    <div className="p-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] sm:rounded-[40px] border border-white dark:border-zinc-800 transition-all">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800 dark:text-gray-200">Stock Management</h3>
                        </div>

                        <form onSubmit={submitProduct} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <input type="text" placeholder="Product Name" className="border-none ring-1 ring-gray-100 dark:ring-zinc-800 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/50 dark:text-white focus:ring-2 focus:ring-red-500 transition-all" value={data.name} onChange={e => setData('name', e.target.value)} required />
                            <input type="text" placeholder="Brand" className="border-none ring-1 ring-gray-100 dark:ring-zinc-800 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/50 dark:text-white focus:ring-2 focus:ring-red-500 transition-all" value={data.brand} onChange={e => setData('brand', e.target.value)} required />
                            <input type="number" placeholder="Base Price" className="border-none ring-1 ring-gray-100 dark:ring-zinc-800 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/50 dark:text-white focus:ring-2 focus:ring-red-500 transition-all" value={data.price} onChange={e => setData('price', e.target.value)} required />
                            
                            <select value={data.category} onChange={e => setData('category', e.target.value)} className="border-none ring-1 ring-gray-100 dark:ring-zinc-800 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/50 text-sm font-bold text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-red-500" required>
                                <option value="Mobile">Mobile Phones</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                            
                            <div className="md:col-span-4 space-y-4 bg-gray-100/30 dark:bg-zinc-800/30 p-6 rounded-[30px] border border-dashed border-gray-200 dark:border-zinc-700">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-400">
                                    <span>Storage & Pricing</span>
                                    <button type="button" onClick={addPriceOption} className="text-red-600 hover:scale-105 transition">+ Add Option</button>
                                </div>
                                {data.storage_prices.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <input type="text" placeholder="Capacity or Model" className="flex-1 border-none ring-1 ring-gray-100 dark:ring-zinc-700 rounded-xl text-sm bg-white dark:bg-zinc-800 dark:text-white" value={item.storage} onChange={(e) => handlePriceChange(index, 'storage', e.target.value)} required />
                                        <input type="number" placeholder="Price" className="flex-1 border-none ring-1 ring-gray-100 dark:ring-zinc-700 rounded-xl text-sm bg-white dark:bg-zinc-800 dark:text-white" value={item.price} onChange={(e) => handlePriceChange(index, 'price', e.target.value)} required />
                                    </div>
                                ))}
                            </div>
                            <div className="md:col-span-3">
                                <input type="file" className="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:bg-black dark:file:bg-white dark:file:text-black file:text-white file:font-bold hover:file:bg-red-600 transition" onChange={e => setData('image', e.target.files[0])} required />
                            </div>
                            <button type="submit" disabled={processing} className="bg-red-600 text-white font-black py-4 rounded-2xl uppercase text-[10px] tracking-[0.2em] hover:bg-black transition-all shadow-lg shadow-red-500/20">Add to Stock</button>
                        </form>
                    </div>

                    {/* 2. LIVE ORDERS */}
                    {userRole === 'admin' && (
                        <div className="p-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl sm:rounded-[40px] border border-white dark:border-zinc-800 overflow-hidden transition-all">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800 dark:text-gray-200 italic">LIVE ORDERS</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100 dark:border-zinc-800">
                                            <th className="px-4 py-5 text-left">ORDER</th>
                                            <th className="px-4 py-5 text-left">CUSTOMER</th>
                                            <th className="px-4 py-5 text-left">ITEMS</th>
                                            <th className="px-4 py-5 text-left">TOTAL</th>
                                            <th className="px-4 py-5 text-left">STATUS</th>
                                            <th className="px-4 py-5 text-right">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
                                        {orders && orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                                                <td className="px-4 py-6 font-black text-red-600 text-xs italic">#RYL-{order.id}</td>
                                                <td className="px-4 py-6">
                                                    <p className="text-xs font-black uppercase text-gray-800 dark:text-gray-200">{order.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold">{order.phone || 'N/A'}</p>
                                                </td>
                                                <td className="px-4 py-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {order.items?.map((item, index) => (
                                                            <span key={index} className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-[9px] font-black italic border border-gray-100 dark:border-zinc-700 dark:text-gray-300">
                                                                {item.name || item.product_name} <span className="text-red-600 ml-1">({item.selected_storage || 'N/A'})</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-6 text-xs font-black text-gray-700 dark:text-gray-300">Rs. {Number(order.total_amount || order.total).toLocaleString()}</td>
                                                <td className="px-4 py-6">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${
                                                        order.status === 'approved' ? 'bg-green-100 text-green-700' : 
                                                        order.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-6 text-right">
                                                    {order.status === 'pending' && (
                                                        <div className="flex justify-end gap-2">
                                                            <button onClick={() => updateOrderStatus(order.id, 'approved')} className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl text-[9px] font-black uppercase hover:bg-red-600 transition">Approve</button>
                                                            <button onClick={() => updateOrderStatus(order.id, 'rejected')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-[9px] font-black uppercase hover:bg-red-600 hover:text-white transition">Reject</button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* 3. ACTIVE INVENTORY */}
                    <div className="p-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl sm:rounded-[40px] border border-white dark:border-zinc-800 transition-all">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800 dark:text-gray-200 italic">ACTIVE INVENTORY</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {products && products.map((product) => (
                                <div key={product.id} className="bg-white/50 dark:bg-zinc-800/50 p-5 rounded-[30px] relative group hover:shadow-2xl hover:shadow-black/5 transition-all border border-gray-100 dark:border-zinc-700">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center p-2 shadow-sm">
                                            <img src={`/storage/${product.image}`} className="max-h-full object-contain" alt="" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[10px] font-black uppercase truncate text-gray-800 dark:text-white">{product.name}</p>
                                            <p className="text-[9px] font-bold text-red-600">Rs. {Number(product.price).toLocaleString()}</p>
                                            <span className="text-[7px] font-black uppercase text-gray-400">{product.category}</span>
                                        </div>
                                    </div>
                                    {userRole === 'admin' && (
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                            <Link href={route('products.edit', product.id)} className="bg-black text-white p-2 rounded-xl hover:bg-red-600 transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </Link>
                                            <button onClick={() => deleteProduct(product.id)} className="bg-red-600 text-white p-2 rounded-xl hover:bg-black transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. MESSAGES */}
                    {userRole === 'admin' && (
                        <div className="p-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl sm:rounded-[40px] border border-white dark:border-zinc-800 transition-all">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800 dark:text-gray-200">Customer Messages</h3>
                            </div>
                            
                            {contacts.length > 0 ? (
                                <div className="space-y-4">
                                    {contacts.map((msg) => (
                                        <div key={msg.id} className="bg-white/40 dark:bg-white/5 p-5 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-blue-500/30 transition-all">
                                            <div className="flex justify-between items-start text-[10px] text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest">
                                                <div className="flex flex-col gap-1">
                                                    <span>{msg.name} <span className="text-gray-400 dark:text-gray-600 ml-1">({msg.email})</span></span>
                                                </div>
                                                <span className="bg-gray-100 dark:bg-black/30 px-3 py-1 rounded-lg">
                                                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Recent'}
                                                </span>
                                            </div>
                                            <h4 className="text-gray-800 dark:text-white font-black text-sm mt-3 uppercase italic tracking-tight">
                                                {msg.subject || 'Inquiry from Web'}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs mt-2 leading-relaxed italic">
                                                "{msg.message}"
                                            </p>

                                            <div className="mt-4 flex justify-between items-center border-t border-gray-100 dark:border-zinc-800 pt-4">
                                                
                                                <button 
                                                    onClick={() => {
                                                        alert(`Reply to: ${msg.email}\n\nSubject: RE: ${msg.subject || 'Inquiry'}`);
                                                        window.location.href = `mailto:${msg.email}?subject=RE:${msg.subject || 'Inquiry'}`;
                                                    }}
                                                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl text-[9px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 10h10a8 8 0 018 8v2M3 10l5 5m-5-5l5-5" />
                                                    </svg>
                                                    Reply via Email
                                                </button>

                                                <button 
                                                    onClick={() => deleteMessage(msg.id)}
                                                    className="text-gray-400 hover:text-red-600 transition-colors p-2"
                                                    title="Delete Message"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic text-sm text-center py-10 bg-gray-50/50 dark:bg-black/20 rounded-3xl border border-dashed border-gray-200 dark:border-zinc-800">
                                    No messages found.
                                </p>
                            )}
                        </div>
                    )}

                    {/* 5. USER MANAGEMENT (Only for Admin) */}
                    {userRole === 'admin' && (
                        <div className="p-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl sm:rounded-[40px] border border-white dark:border-zinc-800 transition-all mt-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800 dark:text-gray-200">User Management</h3>
                                </div>
                                <a 
                                    href={route('users.pdf.download')} 
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition duration-200"
                                >
                                    Export PDF
                                </a>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full italic">
                                    <thead>
                                        <tr className="text-[10px] font-black uppercase text-gray-400 border-b border-gray-100 dark:border-zinc-800">
                                            <th className="px-4 py-5 text-left">User Name</th>
                                            <th className="px-4 py-5 text-left">Email</th>
                                            <th className="px-4 py-5 text-left">Role</th>
                                            <th className="px-4 py-5 text-left">Joined Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
                                        {users && users.map((u) => (
                                            <tr key={u.id} className="text-xs text-gray-700 dark:text-gray-300">
                                                <td className="px-4 py-4 font-bold">{u.name}</td>
                                                <td className="px-4 py-4">{u.email}</td>
                                                <td className="px-4 py-4 uppercase font-black text-red-600">{u.role}</td>
                                                <td className="px-4 py-4">{new Date(u.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}