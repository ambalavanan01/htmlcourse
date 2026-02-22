import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaRocket, FaCertificate } from 'react-icons/fa';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center space-y-16 py-12">
            <div className="text-center space-y-6 max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    Master Web Development <br />
                    <span className="text-primary-600 dark:text-primary-400">From Zero to Hero</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300">
                    The ultimate interactive platform to learn HTML, CSS, and JavaScript.
                    Write code in the browser, build real projects, and earn your certificate.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Link to="/signup" className="btn-primary text-lg px-8 py-3">
                        Start Learning for Free
                    </Link>
                    <Link to="/login" className="btn-outline text-lg px-8 py-3">
                        I already have an account
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 w-full">
                <div className="glass-panel p-8 text-center space-y-4">
                    <div className="mx-auto bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl">
                        <FaCode />
                    </div>
                    <h3 className="text-xl font-bold dark:text-white">Interactive Editor</h3>
                    <p className="text-slate-600 dark:text-slate-400">Practice writing real code alongside the theory with our built-in VS Code style editor.</p>
                </div>
                <div className="glass-panel p-8 text-center space-y-4">
                    <div className="mx-auto bg-secondary-100 dark:bg-secondary-900/30 w-16 h-16 rounded-full flex items-center justify-center text-secondary-600 dark:text-secondary-400 text-2xl">
                        <FaRocket />
                    </div>
                    <h3 className="text-xl font-bold dark:text-white">Structured Roadmap</h3>
                    <p className="text-slate-600 dark:text-slate-400">Follow a clear path from beginner (HTML/CSS) to advanced (JavaScript DOM & ES6).</p>
                </div>
                <div className="glass-panel p-8 text-center space-y-4">
                    <div className="mx-auto bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-2xl">
                        <FaCertificate />
                    </div>
                    <h3 className="text-xl font-bold dark:text-white">Verified Certificate</h3>
                    <p className="text-slate-600 dark:text-slate-400">Complete all modules and projects to earn a unique, downloadable completion certificate.</p>
                </div>
            </div>
        </div>
    );
}
