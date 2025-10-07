import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('');

    //? Fetch All Recipes Data:
    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const res = await fetch('https://recipe-book-server-kappa.vercel.app/allRecipes');
                if (!res.ok) throw new Error('Failed to fetch recipes');
                const result = await res.json();
                setData(result);

            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllRecipes();
    }, []);

    //? Create User:
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //? Signin User:
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    //? Forgot Password:
    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    //? Google Sign in:
    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
    }

    //? SignOut:
    const userSignout = () => {
        setLoading(true);
        return signOut(auth);
    };

    const authData = {
        data,
        user,
        loading,
        setUser,
        setLoading,
        createUser,
        googleSignIn,
        signInUser,
        forgotPassword,
        userSignout
    }

    //? Observation :
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log('Observed user: ', currentUser);
        });

        return () => {
            unSubscribe(); // cleanup
        };
    }, []); // empty dependency list


    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;