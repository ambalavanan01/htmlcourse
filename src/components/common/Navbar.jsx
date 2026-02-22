import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaCode, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const { currentUser, logout, userData } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            setIsMobileMenuOpen(false);
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const NavLinks = () => (
        <>
            {currentUser ? (
                <>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-2 md:py-0">
                        Dashboard
                    </Link>
                    {currentUser.email === 'ambalavanan1501@gmail.com' && (
                        <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-red-600 dark:text-red-400 font-bold py-2 md:py-0 md:ml-2">
                            Admin
                        </Link>
                    )}
                    <div className="text-sm font-semibold text-primary-700 bg-primary-50 px-3 py-1 rounded-full dark:text-primary-300 dark:bg-slate-800 py-2 md:py-0 md:ml-4">
                        {userData?.fullName || currentUser.email}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn-outline text-sm py-2 px-4 w-full md:w-auto mt-4 md:mt-0"
                    >
                        Log out
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-2 md:py-0">
                        Log in
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary text-sm py-2 px-6 rounded-full w-full md:w-auto mt-2 md:mt-0 text-center shadow-lg shadow-primary-500/30">
                        Get Started
                    </Link>
                </>
            )}
        </>
    );

    return (
        <nav className="glass-panel sticky top-0 z-50 rounded-none border-x-0 border-t-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Redesigned Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-xl shadow-lg shadow-primary-500/40 group-hover:scale-105 transition-transform">
                            <FaCode className="text-xl text-white" />
                        </div>
                        <span className="font-extrabold text-xl md:text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                            WebDev<span className="text-primary-600 dark:text-primary-500">Learn</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLinks />
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-slate-600 dark:text-slate-300 hover:text-primary-600 focus:outline-none p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl animate-fade-in origin-top">
                    <div className="flex flex-col px-6 py-6 space-y-4">
                        <NavLinks />
                    </div>
                </div>
            )}
        </nav>
    );
}
