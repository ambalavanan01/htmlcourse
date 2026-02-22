import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import CodeEditor from '../components/editor/CodeEditor';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Lesson() {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const { userData, currentUser } = useAuth();

    const lesson = curriculum.find(l => l.id === lessonId);
    const [outputDoc, setOutputDoc] = useState('');
    const [completing, setCompleting] = useState(false);
    const [testResult, setTestResult] = useState(null); // null, { passed: true/false, message: '' }

    useEffect(() => {
        if (!lesson) {
            navigate('/dashboard');
        }
        // Reset test result on module change
        setTestResult(null);
        setOutputDoc('');
    }, [lesson, navigate]);

    if (!lesson) return null;

    const handleRunCode = ({ html, css, js }) => {
        // Evaluate user's code via the test function defined in the curriculum item
        if (lesson.test) {
            const result = lesson.test({ html, css, js });
            if (result === true) {
                setTestResult({ passed: true, message: 'Great job! Output is correct.' });
            } else {
                setTestResult({ passed: false, message: result || 'Code validation failed.' });
            }
        }

        const combinedOutput = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
        setOutputDoc(combinedOutput);
    };

    const handleCompleteLesson = async () => {
        setCompleting(true);
        try {
            if (currentUser && userData) {
                const userRef = doc(db, 'users', currentUser.uid);

                const updatedProgress = { ...userData.progress, [lesson.id]: true };

                // GAMIFICATION ENGINE MATH
                const currentXp = userData.xp || 0;
                const baseXP = 50; // Every lesson gives 50 base XP
                let bonusXP = 0;

                // If they passed on first try (no failures recorded yet in this session)
                if (testResult && testResult.passed) {
                    bonusXP += 25; // First try bonus concept
                }

                // Check Streak Logic
                let streak = userData.streak || 0;
                const now = new Date();
                const lastCompleted = userData.lastCompletedDate ? userData.lastCompletedDate.toDate() : null;

                if (lastCompleted) {
                    const diffTime = Math.abs(now - lastCompleted);
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    if (diffDays === 1) {
                        streak += 1; // Consecutive day
                    } else if (diffDays > 1) {
                        streak = 1; // Streak broken, reset to 1
                    }
                } else {
                    streak = 1; // First lesson ever completed
                }

                // Check Badges
                let badges = userData.badges || [];
                const htmlLessons = curriculum.filter(l => l.track === 'HTML');
                const htmlCompleted = htmlLessons.every(l => updatedProgress[l.id]);
                if (htmlCompleted && !badges.includes('HTML Novice')) badges.push('HTML Novice');

                const cssLessons = curriculum.filter(l => l.track === 'CSS');
                const cssCompleted = cssLessons.every(l => updatedProgress[l.id]);
                if (cssCompleted && !badges.includes('CSS Stylist')) badges.push('CSS Stylist');

                const jsLessons = curriculum.filter(l => l.track === 'JavaScript');
                const jsCompleted = jsLessons.every(l => updatedProgress[l.id]);
                if (jsCompleted && !badges.includes('JavaScript Ninja')) badges.push('JavaScript Ninja');


                const updates = {
                    progress: updatedProgress,
                    xp: currentXp + baseXP + bonusXP,
                    streak: streak,
                    badges: badges,
                    lastCompletedDate: now
                };

                if (lesson.nextModule) {
                    updates.currentModule = lesson.nextModule;
                }

                await updateDoc(userRef, updates);
            }

            if (lesson.nextModule) {
                navigate(`/lesson/${lesson.nextModule}`);
            } else {
                navigate('/certificate');
            }
        } catch (error) {
            console.error('Failed to update progress', error);
            alert('Failed to save progress. Please try again.');
        } finally {
            setCompleting(false);
        }
    };

    // If there is no test, or the test passed, user can proceed.
    const isNextEnabled = !lesson.test || (testResult && testResult.passed);

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 min-h-[calc(100vh-8rem)]">
            <div className="w-full md:w-1/3 glass-panel p-4 md:p-6 overflow-y-auto flex flex-col">
                <div className="flex-grow">
                    <div className="mb-2 inline-block px-2 text-[10px] md:px-3 md:py-1 md:text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 font-semibold rounded-full uppercase tracking-wider">
                        {lesson.track} - {lesson.level}
                    </div>
                    <h1 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
                        {lesson.title}
                    </h1>

                    <div className="prose dark:prose-invert max-w-none prose-sm prose-pre:bg-slate-800 prose-pre:text-slate-100 pb-4 border-b border-slate-200 dark:border-slate-700">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {lesson.content}
                        </ReactMarkdown>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    {testResult && (
                        <div className={`p-4 rounded-lg font-medium text-sm border ${testResult.passed ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'}`}>
                            {testResult.passed ? '✅ ' : '❌ '} {testResult.message}
                        </div>
                    )}

                    <div className="flex gap-4">
                        {isNextEnabled && (
                            <button
                                onClick={handleCompleteLesson}
                                disabled={completing}
                                className="w-full btn-primary font-bold py-3 animate-fade-in"
                            >
                                {completing ? 'Saving...' : (lesson.nextModule ? 'Next Concept →' : 'Complete Course')}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-4 h-[600px] md:h-auto">
                <div className="h-1/2 min-h-[250px] rounded-xl overflow-hidden shadow-lg border border-slate-700">
                    <CodeEditor initialCode={lesson.initialCode} onRun={handleRunCode} />
                </div>

                <div className="h-1/2 min-h-[250px] glass-panel p-0 flex flex-col overflow-hidden">
                    <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <span className="font-bold text-slate-700 dark:text-slate-300">Live Browser Output</span>
                        {!isNextEnabled && <span className="text-xs font-semibold text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">Run code to pass tests</span>}
                    </div>
                    <div className="flex-grow bg-white relative">
                        {outputDoc ? (
                            <iframe
                                title="Live Preview"
                                srcDoc={outputDoc}
                                className="w-full h-full border-none absolute inset-0"
                                sandbox="allow-scripts"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                                Press "Run Code" in the editor to view output
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
