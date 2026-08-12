import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, product }) {
    // --- FORM LOGIC ---
    const { data, setData, post, processing, errors } = useForm({
        name: product.name || '',
        brand: product.brand || '',
        price: product.price || '',
        category: product.category || 'Mobile',
        image: null,
        storage_prices: product.storage_prices || [{ storage: '', price: '' }],
        _method: 'put', 
    });

    const handlePriceChange = (index, field, value) => {
        const newPrices = [...data.storage_prices];
        newPrices[index][field] = value;
        setData('storage_prices', newPrices);
    };

    const addPriceOption = () => setData('storage_prices', [...data.storage_prices, { storage: '', price: '' }]);
    
    const removePriceOption = (index) => {
        const newPrices = data.storage_prices.filter((_, i) => i !== index);
        setData('storage_prices', newPrices);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('products.update', product.id), {
            forceFormData: true,
            onSuccess: () => alert('Product updated successfully!'), // කැමති නම් Notification එකක් දාන්න
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-800 uppercase tracking-tight">
                    Edit Product <span className="text-blue-600 ml-1">/ {product.name}</span>
                </h2>
            }
        >
            <Head title={`Edit ${product.name}`} />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="p-8 bg-white shadow-sm sm:rounded-3xl border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-sm font-black uppercase tracking-widest text-blue-600">Product Details</h3>
                            <Link href={route('dashboard')} className="text-[10px] font-black uppercase text-gray-400 hover:text-gray-600 transition-colors">Back to Dashboard</Link>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Product Name & Brand */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Product Name</label>
                                    <input type="text" className={`w-full border-gray-100 rounded-xl bg-gray-50 text-sm ${errors.name ? 'border-red-500' : ''}`} value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    {errors.name && <div className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.name}</div>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Brand</label>
                                    <input type="text" className="w-full border-gray-100 rounded-xl bg-gray-50 text-sm" value={data.brand} onChange={e => setData('brand', e.target.value)} required />
                                    {errors.brand && <div className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.brand}</div>}
                                </div>
                            </div>

                            {/* Price & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Base Price (Rs.)</label>
                                    <input type="number" className="w-full border-gray-100 rounded-xl bg-gray-50 text-sm" value={data.price} onChange={e => setData('price', e.target.value)} required />
                                    {errors.price && <div className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.price}</div>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Category</label>
                                    <select 
                                        value={data.category} 
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full border-gray-100 rounded-xl bg-gray-50 text-sm font-bold text-gray-600"
                                        required
                                    >
                                        <option value="Mobile">Mobile Phones</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>
                                </div>
                            </div>

                            {/* Storage & Pricing Options */}
                            <div className="space-y-4 bg-gray-50/50 p-6 rounded-2xl border border-dashed border-gray-200">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-400">
                                    <span>Storage & Pricing Options</span>
                                    <button type="button" onClick={addPriceOption} className="text-blue-600 hover:text-blue-800 transition-colors">+ Add Option</button>
                                </div>
                                {data.storage_prices.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <input type="text" placeholder="e.g. 256GB" className="flex-1 border-gray-100 rounded-xl text-sm bg-white shadow-sm" value={item.storage} onChange={(e) => handlePriceChange(index, 'storage', e.target.value)} required />
                                        <input type="number" placeholder="Price" className="flex-1 border-gray-100 rounded-xl text-sm bg-white shadow-sm" value={item.price} onChange={(e) => handlePriceChange(index, 'price', e.target.value)} required />
                                        {data.storage_prices.length > 1 && (
                                            <button type="button" onClick={() => removePriceOption(index)} className="text-red-400 hover:text-red-600">×</button>
                                        )}
                                    </div>
                                ))}
                                {errors.storage_prices && <div className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.storage_prices}</div>}
                            </div>

                            {/* Image Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-blue-50/30 p-4 rounded-2xl border border-blue-50">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Current Image</label>
                                    <div className="w-24 h-24 bg-white rounded-2xl border border-gray-100 p-2 flex items-center justify-center shadow-sm">
                                        <img src={`/storage/${product.image}`} className="max-h-full object-contain" alt="Current product" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-blue-500 italic ml-1 tracking-tighter">Upload New (Optional)</label>
                                    <input type="file" className="block w-full text-[10px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white file:text-[10px] file:font-black hover:file:bg-blue-700 cursor-pointer" onChange={e => setData('image', e.target.files[0])} />
                                    {errors.image && <div className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.image}</div>}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-6 border-t border-gray-50 flex gap-4">
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className={`flex-1 text-white font-black py-4 rounded-2xl uppercase text-xs tracking-widest transition shadow-lg ${processing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
                                >
                                    {processing ? 'Processing...' : 'Update Product'}
                                </button>
                                <Link 
                                    href={route('dashboard')} 
                                    className="px-8 bg-gray-100 text-gray-400 font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-gray-200 transition flex items-center justify-center"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}