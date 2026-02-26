import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg transition-colors duration-200">
            <div className="print:hidden"><Navbar /></div>
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
            <footer className="print:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>© {new Date().getFullYear()} WebDev Learn. All rights reserved.</p>
            </footer>
        </div>
    );
}
