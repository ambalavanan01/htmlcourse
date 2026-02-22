import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for further instructions.');
            // Automatically redirect to login after 3 seconds on success
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError('Failed to reset password: ' + err.message);
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
                        Reset Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                        Enter your email and we'll send you a link to get back into your account.
                    </p>
                </div>

                {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 shadow-md rounded-r-md text-sm">{error}</div>}
                {message && <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 shadow-md rounded-r-md text-sm">{message}</div>}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                        {loading ? 'Sending Request...' : 'Reset Password'}
                    </button>

                    <div className="text-center mt-6">
                        <Link to="/login" className="font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                            ← Back to Log In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
