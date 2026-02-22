import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../services/firebase';
import { curriculum } from '../data/curriculum';

export default function Certificate() {
    const { userData, currentUser } = useAuth();
    const navigate = useNavigate();
    const certificateRef = useRef();

    const [generating, setGenerating] = useState(false);
    const [certificateUrl, setCertificateUrl] = useState(userData?.certificateUrl || null);

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
            const canvas = await html2canvas(certificateRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            const pdf = new jsPDF('landscape', 'px', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

            const pdfBase64 = pdf.output('datauristring');

            const storageRef = ref(storage, `certificates/${currentUser.uid}.pdf`);
            await uploadString(storageRef, pdfBase64, 'data_url');
            const downloadURL = await getDownloadURL(storageRef);

            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, { certificateUrl: downloadURL });

            setCertificateUrl(downloadURL);

            pdf.save(`WebDev_Certificate_${userData?.fullName.replace(/\s+/g, '_')}.pdf`);

        } catch (error) {
            console.error('Error generating PDF', error);
            alert('Failed to generate certificate.');
        } finally {
            setGenerating(false);
        }
    };

    if (!userData) return null;

    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const certId = `CERT-${currentUser.uid.substring(0, 8).toUpperCase()}-${new Date().getFullYear()}`;

    return (
        <div className="space-y-8 animate-fade-in flex flex-col items-center">
            <div className="text-center space-y-4 max-w-2xl">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    Congratulations, {userData.fullName.split(' ')[0]}! 🎉
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                    You have successfully completed the Web Development curriculum.
                </p>

                {certificateUrl ? (
                    <div className="flex gap-4 justify-center mt-6">
                        <a href={certificateUrl} target="_blank" rel="noreferrer" className="btn-primary">
                            View PDF Certificate
                        </a>
                        <button onClick={generatePDF} className="btn-outline" disabled={generating}>
                            {generating ? 'Regenerating...' : 'Download Again'}
                        </button>
                    </div>
                ) : (
                    <button onClick={generatePDF} disabled={generating} className="btn-primary mt-6 text-lg px-8 py-3">
                        {generating ? 'Generating PDF & Saving...' : 'Generate & Download Certificate'}
                    </button>
                )}
            </div>

            <div className="w-full max-w-4xl overflow-x-auto pb-4">
                <div
                    ref={certificateRef}
                    className="bg-white min-w-[800px] aspect-[1.414/1] relative p-16 flex flex-col items-center justify-center border-[16px] border-primary-900 shadow-2xl mx-auto"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231d4ed8\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
                >
                    <div className="text-center space-y-8 z-10 w-full">
                        <h2 className="text-6xl font-serif text-slate-900 uppercase tracking-widest font-black">
                            Certificate <span className="text-primary-700 block text-3xl mt-2 font-sans font-bold tracking-normal">of Completion</span>
                        </h2>

                        <p className="text-xl text-slate-500 italic">This is to certify that</p>

                        <h3 className="text-5xl font-bold text-primary-900 border-b-2 border-primary-300 pb-4 inline-block px-12">
                            {userData.fullName}
                        </h3>

                        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
                            has successfully completed the comprehensive <br />
                            <span className="font-bold">Web Development Fundamentals Course</span> <br />
                            demonstrating proficiency in HTML, CSS, and JavaScript.
                        </p>

                        <div className="flex justify-between items-end pt-12 mt-12 w-full px-12 border-t-2 border-slate-100">
                            <div className="text-left w-1/3">
                                <div className="border-b border-slate-400 pb-2 mb-2 w-48 text-center text-lg font-bold text-slate-800">
                                    {date}
                                </div>
                                <p className="text-sm text-slate-500 font-semibold pl-4">Date of Completion</p>
                            </div>

                            <div className="text-center w-1/3">
                                <div className="w-24 h-24 mx-auto rounded-full bg-primary-100 border-4 border-primary-600 flex items-center justify-center">
                                    <span className="text-primary-700 font-bold text-xl">Verified</span>
                                </div>
                            </div>

                            <div className="text-right w-1/3 flex flex-col items-end">
                                <div className="border-b border-slate-400 pb-2 mb-2 w-48 text-center text-slate-800 font-mono text-sm tracking-tighter">
                                    {certId}
                                </div>
                                <p className="text-sm text-slate-500 font-semibold pr-8">Certificate ID</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
