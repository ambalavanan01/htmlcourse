import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// Removed html2canvas and jsPDF to fix generation crashes
import { curriculum } from '../data/curriculum';

export default function Certificate() {
    const { userData, currentUser } = useAuth();
    const navigate = useNavigate();
    const certificateRef = useRef();

    const [generating, setGenerating] = useState(false);

    const progress = userData?.progress || {};
    const totalModules = curriculum.length;
    const completedCount = Object.keys(progress).filter(key => progress[key]).length;

    useEffect(() => {
        if (userData && completedCount < totalModules) {
            alert("You must complete all modules to earn a certificate.");
            navigate('/dashboard');
        }
    }, [userData, completedCount, totalModules, navigate]);

    const generatePDF = async () => {
        if (!certificateRef.current || !currentUser) return;

        setGenerating(true);
        try {
            // Give React a tiny moment to render the "Generating" state, then trigger print
            setTimeout(() => {
                window.print();
                setGenerating(false);
            }, 500);
        } catch (error) {
            console.error('Error generating PDF', error);
            alert('Failed to initialize print dialog.');
            setGenerating(false);
        }
    };

    if (!userData) return null;

    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const certId = `CERT-${currentUser.uid.substring(0, 8).toUpperCase()}-${new Date().getFullYear()}`;

    return (
        <div className="space-y-8 animate-fade-in flex flex-col items-center certificate-page print:m-0 print:p-0">
            {/* The controls UI should be hidden during print */}
            <div className="text-center space-y-4 max-w-2xl print:hidden">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    Congratulations, {userData.fullName.split(' ')[0]}! 🎉
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                    You have successfully completed the Web Development curriculum.
                </p>

                <button onClick={generatePDF} disabled={generating} className="btn-primary mt-6 text-lg px-8 py-3 shadow-md hover:shadow-lg transition-all">
                    {generating ? 'Generating PDF...' : 'Download as PDF'}
                </button>
            </div>

            <div className="w-full max-w-5xl overflow-x-auto pb-4">
                <div
                    ref={certificateRef}
                    className="bg-slate-50 min-w-[750px] aspect-[1.414/1] relative p-8 flex flex-col items-center justify-center border-[12px] border-slate-900 shadow-2xl mx-auto overflow-hidden"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2394a3b8' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
                    }}
                >
                    {/* Inner styling border */}
                    <div className="absolute inset-4 border-[3px] border-slate-300 pointer-events-none"></div>
                    <div className="absolute inset-5 border border-slate-200 pointer-events-none"></div>

                    <div className="text-center space-y-6 z-10 w-full relative">

                        {/* Title Section */}
                        <div className="mb-10">
                            <h2 className="text-5xl text-slate-900 uppercase tracking-[0.2em] font-serif mb-2 text-shadow-sm">
                                Certificate
                            </h2>
                            <h3 className="text-xl text-amber-600 font-serif italic tracking-widest">
                                OF ACHIEVEMENT
                            </h3>
                        </div>

                        <p className="text-base text-slate-500 uppercase tracking-widest font-semibold">
                            Proudly Presented To
                        </p>

                        {/* Name Section */}
                        <div className="py-6">
                            <h3 className="text-5xl font-bold text-slate-900 font-serif italic flex flex-col items-center">
                                {userData.fullName}
                                <span className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-slate-400 to-transparent mt-6"></span>
                            </h3>
                        </div>

                        {/* Description Section */}
                        <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-serif">
                            For successfully completing the comprehensive <br />
                            <span className="font-bold text-slate-900 text-xl mt-3 inline-block"> Web Development</span><br />
                            demonstrating exceptional proficiency in HTML5, CSS3, and modern JavaScript.
                        </p>

                        {/* Footer Signatures */}
                        <div className="flex justify-between items-end pt-16 mt-8 w-full px-16 relative">

                            {/* Date */}
                            <div className="text-center w-64 z-10">
                                <div className="border-b-2 border-slate-500 pb-2 mb-2 font-serif text-lg font-medium text-slate-800">
                                    {date}
                                </div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Date Issued</p>
                            </div>

                            {/* Seal */}
                            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-4">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-600 flex items-center justify-center p-1 shadow-xl border-4 border-white">
                                    <div className="w-full h-full rounded-full border-2 border-amber-200 border-dashed flex items-center justify-center bg-transparent relative">
                                        {/* Ribbon tails */}
                                        <div className="absolute -bottom-8 -left-2 w-8 h-12 bg-amber-600 -z-10 transform -rotate-12 border-b-8 border-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>
                                        <div className="absolute -bottom-8 -right-2 w-8 h-12 bg-amber-600 -z-10 transform rotate-12 border-b-8 border-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>

                                        <div className="text-center">
                                            <span className="block text-white font-serif font-black text-xl shadow-sm">VERIFIED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Certificate ID */}
                            <div className="text-center w-64 z-10">
                                <div className="border-b-2 border-slate-500 pb-2 mb-2 font-mono text-sm tracking-tighter text-slate-800">
                                    {certId}
                                </div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Certificate ID</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
