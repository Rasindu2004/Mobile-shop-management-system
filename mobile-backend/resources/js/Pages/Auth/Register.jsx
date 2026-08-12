import { useEffect, useState } from 'react'; // 👈 useState එකතු කළා
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function Register() {
    // 1. Password එක පේන්න/නොපේන්න සකස් කරන State එක
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'customer',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f1115]">
            <Head title="Join Royal Mobiles" />

            {/* Background Image */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2081&auto=format&fit=crop')`,
                    filter: 'brightness(0.35) contrast(1.1)'
                }}
            ></div>

            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/20 via-black/60 to-purple-900/20 backdrop-blur-[1px]"></div>

            <div className="relative z-10 w-full max-w-[380px] px-4 my-10">
                <div className="bg-[#16191e]/85 backdrop-blur-2xl p-7 md:p-9 rounded-[2.5rem] border border-white/10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.8)]">
                    
                    {/* Header Section */}
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-blue-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-[#1a1d23] p-3 rounded-2xl border border-white/10 shadow-inner">
                                    <svg className="w-6 h-6 text-blue-500 shadow-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-xl font-black text-white tracking-tight uppercase italic">
                            JOIN ROYAL MOBILES
                        </h1>
                        <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.3em] mt-1">
                            Create Premium Account
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Name Input */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-3 block">Full Name</label>
                            <input
                                type="text"
                                value={data.name}
                                className="w-full bg-white/[0.03] border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none placeholder-gray-700"
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                            <InputError message={errors.name} className="mt-1 ml-2 text-[10px]" />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-3 block">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                className="w-full bg-white/[0.03] border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none placeholder-gray-700"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                            <InputError message={errors.email} className="mt-1 ml-2 text-[10px]" />
                        </div>

                        {/* Account Type Selection */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-3 block">Account Type</label>
                            <select 
                                value={data.role}
                                className="w-full bg-white/[0.03] border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-widest rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-blue-500/50 outline-none appearance-none cursor-pointer italic"
                                onChange={(e) => setData('role', e.target.value)}
                                required
                            >
                                <option value="customer" className="bg-[#1a1d23]">Regular Customer</option>
                                <option value="dealer" className="bg-[#1a1d23]">Authorized Dealer</option>
                            </select>
                            <InputError message={errors.role} className="mt-1 ml-2 text-[10px]" />
                        </div>

                        {/* Password Field - Eye Icon එකතු කළා */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-3 block">Set Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    className="w-full bg-white/[0.03] border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 pr-11 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-blue-400 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password - Toggle එක මෙතනටත් වැඩ */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-3 block">Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={data.password_confirmation}
                                className="w-full bg-white/[0.03] border border-white/10 border-b-blue-500/40 text-white text-sm rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-blue-500/50 outline-none border-b-2"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.password} className="mt-1 ml-2 text-[10px]" />

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-col gap-4">
                            <button
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 rounded-xl uppercase text-[10px] tracking-[0.2em] transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-[0.97] disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Sign Up Now'}
                            </button>

                            <div className="flex items-center justify-between px-1">
                                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                                    Already registered?
                                </span>
                                <Link
                                    href={route('login')}
                                    className="text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-wider transition-all"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Brand */}
                <div className="mt-6 text-center">
                    <p className="text-[8px] text-gray-700 font-bold uppercase tracking-[0.5em] opacity-50">
                        Royal Mobiles Luxury Edition
                    </p>
                </div>
            </div>
        </div>
    );
}