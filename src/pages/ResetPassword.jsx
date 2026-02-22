import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get('oobCode');
    const mode = searchParams.get('mode');

    // If Firebase directs the user here with an oobCode, we are actually matching the reset action
    const isConfirming = mode === 'resetPassword' && oobCode;

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { resetPassword, confirmReset } = useAuth();
    const navigate = useNavigate();

    const handleRequestReset = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for further instructions.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError('Failed to reset password: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmReset = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await confirmReset(oobCode, newPassword);
            setMessage('Password has been reset successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError('Failed to securely confirm password reset: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full glass-panel p-8 space-y-8 animate-fade-in relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-tertiary-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>

                <div>
                    <h2 className="text-center text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                        {isConfirming ? 'Create New Password' : 'Reset Password'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                        {isConfirming
                            ? "Enter your new password below."
                            : "Enter your email and we'll send you a link to get back into your account."}
                    </p>
                </div>

                {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 shadow-md rounded-r-md text-sm">{error}</div>}
                {message && <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 shadow-md rounded-r-md text-sm">{message}</div>}

                {/* Render Confirmation Form vs Request Form */}
                {isConfirming ? (
                    <form className="mt-8 space-y-6" onSubmit={handleConfirmReset}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    required
                                    className="input-field"
                                    placeholder="Enter secure new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    minLength="6"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 py-3 uppercase tracking-wider font-bold shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5"
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleRequestReset}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="input-field"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 py-3 uppercase tracking-wider font-bold shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5"
                        >
                            {loading ? 'Sending Request...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}

                <div className="text-center mt-6">
                    <Link to="/login" className="font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                        ← Back to Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}
