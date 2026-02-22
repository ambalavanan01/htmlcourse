import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [educationLevel, setEducationLevel] = useState('High School');
    const [learningGoal, setLearningGoal] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signup(email, password, {
                fullName,
                age: Number(age),
                educationLevel,
                learningGoal,
            });
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create an account: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full glass-panel p-8 space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-slate-900 dark:text-white">
                        Start Learning
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                        Or{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            login to your account
                        </Link>
                    </p>
                </div>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">{error}</div>}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="Password (min 6 characters)"
                            minLength="6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number"
                                required
                                className="input-field"
                                placeholder="Age"
                                min="10"
                                max="100"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            <select
                                className="input-field"
                                value={educationLevel}
                                onChange={(e) => setEducationLevel(e.target.value)}
                            >
                                <option value="High School">High School</option>
                                <option value="College">College</option>
                                <option value="University">University</option>
                                <option value="Professional">Professional</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <textarea
                            required
                            className="input-field min-h-[100px]"
                            placeholder="What is your main learning goal?"
                            value={learningGoal}
                            onChange={(e) => setLearningGoal(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary disabled:opacity-50"
                    >
                        {loading ? 'Signing up...' : 'Sign up'}
                    </button>
                </form>
            </div>
        </div>
    );
}
