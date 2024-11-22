import React, { useContext, createContext, PropsWithChildren, useEffect, useState } from 'react';
import { auth } from '../config/firebase'; 
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth'; // Firebase methods
import { useStorageState } from '../hooks/useStorageState'; // Custom storage hook

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
  user?: { role: string };
}>({
  signIn: async () => Promise.resolve(),
  signOut: async () => Promise.resolve(),
  session: null,
  isLoading: false,
  user: { role: 'admin' }
});

// User info access hook
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, storedSession], setSession] = useStorageState('session');
  const [session, setSessionState] = useState<string | null>(storedSession);

  // Listen for auth state changes and update session state accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setSessionState(currentUser.uid); // Store user ID 
        setSession(currentUser.uid); // Sync with storage
      } else {
        setSessionState(null);
        setSession(null); // Clear storage if no user
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSession(userCredential.user.uid); // Store user ID
    } catch (error) {
      console.error("Sign In Error:", error);
      throw error; // Rethrow error to handle in the sign-in component
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth); // Sign out from Firebase
      setSession(null); // Clear session in context
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
