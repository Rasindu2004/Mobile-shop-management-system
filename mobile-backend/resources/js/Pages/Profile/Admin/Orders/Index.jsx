import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, orders }) {
    const { patch, delete: destroy } = useForm();

    // Order එකක Status එක වෙනස් කරන Function එක
    const updateStatus = (id, newStatus) => {
        if (confirm(`Change status to ${newStatus}?`)) {
            patch(route('orders.updateStatus', { id: id }), {
                data: { status: newStatus },
                preserveScroll: true
            });
        }
    };

    // Order එකක් අයින් කරන Function එක
    const deleteOrder = (id) => {
        if (confirm("Are you sure you want to delete this royal order?")) {
            destroy(route('orders.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-2xl text-white tracking-tighter uppercase italic">Order <span className="text-red-600">Vault</span></h2>}
        >
            <Head title="Manage Orders | ROYAL MOBILES" />

            <div className="py-12 bg-[#050505] min-h-screen text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white/5 overflow-hidden shadow-2xl rounded-[40px] border border-white/10 backdrop-blur-md">
                        <div className="p-8">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Order ID</th>
                                        <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Customer</th>
                                        <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Items</th>
                                        <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Total</th>
                                        <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Status</th>
                                        <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-white/[0.02] transition-all group">
                                            <td className="py-6 px-4 font-mono text-xs opacity-50">#RM-{order.id.toString().padStart(4, '0')}</td>
                                            <td className="py-6 px-4">
                                                <div className="font-bold uppercase text-xs">{order.name}</div>
                                                <div className="text-[10px] opacity-40 lowercase">{order.email}</div>
                                                <div className="text-[10px] opacity-40">{order.phone}</div>
                                            </td>
                                            <td className="py-6 px-4">
                                                <div className="max-w-[200px] truncate text-[10px] font-bold uppercase text-gray-400">
                                                    {order.items.map(item => item.name).join(', ')}
                                                </div>
                                            </td>
                                            <td className="py-6 px-4">
                                                <div className="font-black italic text-red-600">Rs. {Number(order.total_amount).toLocaleString()}</div>
                                                <div className="text-[8px] font-black uppercase tracking-tighter opacity-40">{order.payment_method}</div>
                                            </td>
                                            <td className="py-6 px-4">
                                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                                    order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                                    'bg-red-500/10 text-red-500'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-6 px-4 text-right space-x-2">
                                                <button 
                                                    onClick={() => updateStatus(order.id, 'completed')}
                                                    className="bg-white text-black px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
                                                >
                                                    Ship
                                                </button>
                                                <button 
                                                    onClick={() => deleteOrder(order.id)}
                                                    className="p-2 text-gray-600 hover:text-red-600 transition-all"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {orders.length === 0 && (
                                <div className="py-20 text-center opacity-20 font-black uppercase italic text-2xl">No Royal Orders Yet</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}