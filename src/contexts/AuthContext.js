import React, { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';

initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, userLoading, userError] = useAuthState(auth);

	const API = { user, userLoading, userError };

	return <AuthContext.Provider value={API}>{children}</AuthContext.Provider>;
}
