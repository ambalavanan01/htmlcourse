import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { curriculum } from '../data/curriculum';
import { FaCheckCircle, FaLock, FaPlayCircle, FaTrophy } from 'react-icons/fa';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function Dashboard() {
  const { userData, currentUser } = useAuth();
  const navigate = useNavigate();

  const progress = userData?.progress || {};
  // Find the highest unlocked module or default to the very first one
  const savedModuleExists = curriculum.some(l => l.id === userData?.currentModule);
  const currentModuleId = savedModuleExists ? userData.currentModule : curriculum[0].id;

  const completedCount = Object.keys(progress).filter(key => progress[key]).length;
  const totalModules = curriculum.length;
  const progressPercentage = Math.round((completedCount / totalModules) * 100) || 0;

  const handleContinue = () => {
    navigate(`/lesson/${currentModuleId}`);
  };

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const usersRef = collection(db, 'users');
        // Order by xp descending, limit to top 5
        const q = query(usersRef, orderBy('xp', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);

        const topUsers = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.xp && data.xp > 0) {
            topUsers.push({
              id: doc.id,
              name: data.fullName || data.email,
              xp: data.xp
            });
          }
        });
        setLeaderboard(topUsers);
      } catch (error) {
        console.error("Error fetching leaderboard: ", error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Group curriculum by tracks
  const tracks = useMemo(() => {
    const groups = {
      'HTML': [],
      'CSS': [],
      'JavaScript': []
    };
    curriculum.forEach(lesson => {
      if (groups[lesson.track]) {
        groups[lesson.track].push(lesson);
      }
    });
    return groups;
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <header className="mb-4">
        <h1 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back, {userData?.fullName?.split(' ')[0] || 'Student'}!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Track your progress through individual concepts.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Main Curriculum Area (Takes 2 cols on Large screens) */}
        <div className="lg:col-span-2 space-y-8">
          {Object.entries(tracks).map(([trackName, modules], trackIndex) => {
            if (modules.length === 0) return null;
            return (
              <div key={trackName} className="glass-panel p-6">
                <h2 className="text-lg md:text-2xl font-bold mb-6 text-slate-900 dark:text-white border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                  Level {trackIndex + 1}: {trackName} Concepts
                </h2>

                <div className="space-y-3 relative">
                  {modules.map((lesson, index) => {
                    const isCompleted = progress[lesson.id];
                    const isUnlocked = isCompleted || lesson.id === currentModuleId;

                    return (
                      <div
                        key={lesson.id}
                        className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all ${isUnlocked
                          ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:shadow-md cursor-pointer hover:-translate-y-0.5'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-transparent opacity-50'
                          }`}
                        onClick={() => isUnlocked && navigate(`/lesson/${lesson.id}`)}
                      >
                        <div className="flex-shrink-0 z-10 w-10 flex items-center justify-center">
                          {isCompleted ? (
                            <FaCheckCircle className="text-2xl text-green-500" />
                          ) : isUnlocked ? (
                            <FaPlayCircle className="text-2xl text-primary-500 animate-pulse" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                              <FaLock className="text-sm text-slate-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex-grow">
                          <div className="flex justify-between items-center">
                            <h3 className={`font-bold text-sm md:text-lg ${isUnlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                              {lesson.title}
                            </h3>
                          </div>
                          <p className={`text-xs md:text-sm mt-1 ${isUnlocked ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400'}`}>
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Progress Area */}
        <div className="space-y-6">
          <div className="glass-panel p-6 text-center sticky top-24 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
              Overall Progress
            </h3>

            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-slate-100 dark:text-slate-800 stroke-current"
                  strokeWidth="8"
                  cx="50" cy="50" r="40" fill="transparent"
                ></circle>
                <circle
                  className="text-primary-500 progress-ring__circle stroke-current transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeLinecap="round"
                  cx="50" cy="50" r="40" fill="transparent"
                  strokeDasharray={`${progressPercentage * 2.51} 251.2`}
                  transform="rotate(-90 50 50)"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-5xl font-black text-slate-900 dark:text-white">{progressPercentage}%</span>
              </div>
            </div>

            <p className="text-md font-medium text-slate-600 dark:text-slate-300 mb-6 bg-slate-100 dark:bg-slate-800 py-2 px-4 rounded-full inline-block">
              {completedCount} of {totalModules} concepts mastered
            </p>

            {/* Gamification Stats Component */}
            <div className="flex justify-around items-center bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-700">
              <div className="text-center">
                <p className="text-2xl mb-1">🔥</p>
                <p className="font-bold text-slate-800 dark:text-slate-200">{userData?.streak || 0}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Day Streak</p>
              </div>
              <div className="w-px h-12 bg-slate-200 dark:bg-slate-700"></div>
              <div className="text-center">
                <p className="text-2xl mb-1">⭐</p>
                <p className="font-bold text-slate-800 dark:text-slate-200">{userData?.xp || 0}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total XP</p>
              </div>
            </div>

            {/* Badges Component */}
            {(userData?.badges && userData.badges.length > 0) && (
              <div className="mb-8 text-left">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Earned Badges</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {userData.badges.map(badge => (
                    <span key={badge} className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 text-xs font-bold rounded-full border border-yellow-200 dark:border-yellow-700/50">
                      🏆 {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleContinue}
              className="btn-primary w-full py-4 text-lg font-bold uppercase tracking-wider mb-8"
            >
              {completedCount === 0 ? 'Start Learning' : (completedCount === totalModules ? 'View Certificate' : 'Resume Course')}
            </button>

            {/* Global Leaderboard Component */}
            {leaderboard.length > 0 && (
              <div className="text-left mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <FaTrophy className="text-yellow-500" /> Global Top 5
                </h3>
                <div className="space-y-3">
                  {leaderboard.map((user, idx) => (
                    <div key={user.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className={`font-bold w-6 h-6 flex items-center justify-center rounded-full text-xs ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : idx === 1 ? 'bg-slate-200 text-slate-700' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                          {idx + 1}
                        </span>
                        <span className="font-medium text-slate-700 dark:text-slate-300 text-sm truncate max-w-[100px]" title={user.name}>
                          {user.name.split(' ')[0]}
                        </span>
                      </div>
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">
                        {user.xp} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
