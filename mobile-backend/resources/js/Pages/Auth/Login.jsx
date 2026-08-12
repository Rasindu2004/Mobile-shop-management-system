import { useEffect, useState } from 'react'; // useState එකතු කළා
import { Head, Link, useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';

export default function Login({ status, canResetPassword }) {
    // Password එක පෙන්වනවාද නැද්ද යන්න තීරණය කරන State එක
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f1115]">
            <Head title="Log in" />

            {/* Background Image */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2081&auto=format&fit=crop')`,
                    filter: 'brightness(0.35) contrast(1.1)'
                }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/20 via-black/60 to-purple-900/20 backdrop-blur-[1px]"></div>

            <div className="relative z-10 w-full max-w-[380px] px-4">
                <div className="bg-[#16191e]/85 backdrop-blur-2xl p-7 md:p-9 rounded-[2.5rem] border border-white/10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.8)]">
                    
                    {/* Header Section */}
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-blue-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-[#1a1d23] p-3 rounded-2xl border border-white/10 shadow-inner">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-xl font-black text-white tracking-tight uppercase italic">
                            WELCOME BACK
                        </h1>
                        <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.3em] mt-1">
                            LOGIN TO ROYAL ACCOUNT
                        </p>
                    </div>

                    {status && <div className="mb-4 font-bold text-[10px] text-green-400 text-center uppercase tracking-widest">{status}</div>}

                    <form onSubmit={submit} className="space-y-4">
                        {/* Email Address */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-3 block">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                className="w-full bg-white/[0.03] border border-white/10 text-white text-sm rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none placeholder-gray-700 shadow-inner"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                            <InputError message={errors.email} className="mt-1 ml-2 text-[10px]" />
                        </div>

                        {/* Password Section with Eye Icon */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] ml-3 block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    className="w-full bg-white/[0.03] border border-white/10 border-b-blue-500/40 text-white text-sm rounded-xl px-4 py-3.5 pr-11 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none border-b-2 shadow-inner"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                
                                {/* Eye Button */}
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
                            <InputError message={errors.password} className="mt-1 ml-2 text-[10px]" />
                        </div>

                        {/* Remember & Forgot Password */}
                        <div className="flex items-center justify-between px-1 mt-2">
                            <label className="flex items-center cursor-pointer group">
                                <Checkbox 
                                    name="remember" 
                                    checked={data.remember} 
                                    onChange={(e) => setData('remember', e.target.checked)} 
                                    className="bg-white/5 border-white/10 text-blue-600 focus:ring-offset-0 focus:ring-blue-500/50 rounded"
                                />
                                <span className="ms-2 text-[10px] font-bold text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-tighter">Remember</span>
                            </label>
                            
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-tighter"
                                >
                                    Forgot?
                                </Link>
                            )}
                        </div>

                        {/* Login Button */}
                        <div className="pt-4 flex flex-col gap-4">
                            <button
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 rounded-xl uppercase text-[10px] tracking-[0.2em] transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-[0.97]"
                            >
                                {processing ? 'Verifying...' : 'LOG IN NOW'}
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                                    New here?
                                </span>
                                <Link
                                    href={route('register')}
                                    className="text-[10px] font-black text-white hover:text-blue-400 uppercase tracking-wider transition-all underline underline-offset-4 decoration-blue-500/30"
                                >
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Brand Footer */}
                <div className="mt-6 text-center">
                    <p className="text-[8px] text-gray-700 font-bold uppercase tracking-[0.5em] opacity-50">
                        Royal Mobiles Luxury Edition
                    </p>
                </div>
            </div>
        </div>
    );
}