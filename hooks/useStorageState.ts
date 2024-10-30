import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { firebase, firestore, auth } from '../config/firebase';
import { useNetworkStatus } from './useNetworkStatus';
import { setDoc, doc } from 'firebase/firestore';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

async function syncWithFirebase(key: string, value: string | null) {
  if (!value) return;
  try {
    const userId = auth.currentUser?.uid; // Get current user ID
    console.log('User ID:', userId); // Debug log
    if (userId) {
      console.log('Attempting to set document in Firestore...');
      await setDoc(doc(firestore, 'userData', userId), {
        [key]: value,
      }, { merge: true });
      console.log('Document successfully written!');
    }
  } catch (error) {
    console.error('Failed to sync with Firebase:', error);
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();
  const isConnected = useNetworkStatus();

  useEffect(() => {
    async function loadData() {
      if (Platform.OS === 'web') {
        try {
          const localValue = localStorage.getItem(key);
          setState(localValue);
        } catch (e) {
          console.error('Local storage is unavailable:', e);
        }
      } else {
        const secureValue = await SecureStore.getItemAsync(key);
        setState(secureValue);
      }
    }
    loadData();
  }, [key]);

  useEffect(() => {
    if (isConnected && state[1]) {
      syncWithFirebase(key, state[1]); // Sync when connection is restored
    }
  }, [isConnected, key, state]);

  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
      if (isConnected) {
        syncWithFirebase(key, value); // Immediate sync if online
      }
    },
    [isConnected, key]
  );

  return [state, setValue];
}
