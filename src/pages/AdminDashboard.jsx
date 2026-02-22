import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { curriculum } from '../data/curriculum';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalMastered: 0,
        averageProgress: 0
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const usersRef = collection(db, 'users');
                const q = query(usersRef);
                const querySnapshot = await getDocs(q);

                let usersList = [];
                let totalMasteredConcepts = 0;

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const completedCount = data.progress ? Object.keys(data.progress).filter(key => data.progress[key]).length : 0;

                    totalMasteredConcepts += completedCount;
                    usersList.push({
                        uid: doc.id,
                        email: data.email,
                        fullName: data.fullName,
                        completedCount,
                        currentModule: data.currentModule || 'Not Started'
                    });
                });

                setStats({
                    totalUsers: usersList.length,
                    totalMastered: totalMasteredConcepts,
                    averageProgress: usersList.length > 0 ? (totalMasteredConcepts / (usersList.length * curriculum.length)) * 100 : 0
                });

                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-8 text-center text-slate-500">Loading Analytics...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Analytics</h1>
                <p className="text-slate-600 dark:text-slate-400">Realtime platform statistics and user tracking.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 border-l-4 border-primary-500">
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Users</h3>
                    <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalUsers}</p>
                </div>
                <div className="glass-panel p-6 border-l-4 border-green-500">
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">Concepts Mastered</h3>
                    <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalMastered}</p>
                </div>
                <div className="glass-panel p-6 border-l-4 border-blue-500">
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">Avg Completion</h3>
                    <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.averageProgress.toFixed(1)}%</p>
                </div>
            </div>

            <div className="glass-panel p-0 overflow-hidden mt-8">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Student Roster</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4 font-semibold border-b dark:border-slate-700">Student</th>
                                <th className="px-6 py-4 font-semibold border-b dark:border-slate-700">Email</th>
                                <th className="px-6 py-4 font-semibold border-b dark:border-slate-700">Concepts Done</th>
                                <th className="px-6 py-4 font-semibold border-b dark:border-slate-700">Current Module Block</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {users.map((user) => (
                                <tr key={user.uid} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">{user.fullName || 'Anonymous'}</td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{user.email}</td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-slate-200 rounded-full h-2 dark:bg-slate-700">
                                                <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(user.completedCount / curriculum.length) * 100}%` }}></div>
                                            </div>
                                            <span className="text-xs whitespace-nowrap">{user.completedCount} / {curriculum.length}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400"><span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono">{user.currentModule}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}
