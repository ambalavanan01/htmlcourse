import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Signup and store additional info in Firestore
    const signup = async (email, password, additionalInfo) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user profile document in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            ...additionalInfo,
            progress: {
                "html-basics": false,
            },
            currentModule: "html-basics",
            createdAt: serverTimestamp(),
        });

        return userCredential;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                // Fetch extended user data from Firestore
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const confirmReset = (oobCode, newPassword) => {
        return confirmPasswordReset(auth, oobCode, newPassword);
    }

    const value = {
        currentUser,
        userData,
        loading,
        signup,
        login,
        logout,
        resetPassword,
        confirmReset
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
