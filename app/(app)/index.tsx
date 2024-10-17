import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { useSession } from '../../providers/ctx';
import { router } from 'expo-router'; 
import { auth } from '../../config/firebase';

export default function Index() {
  const { session } = useSession(); 
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity is 1

  useEffect(() => {
    if (!session) {
      // If the user is not logged in, redirect to the sign-in screen
      router.replace('/sign-in');
    }
  }, [session]);

  // Fade-out after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade to opacity 0
        duration: 1000, // Duration of fade-out (1 second)
        useNativeDriver: true,
      }).start(() => {
        router.replace('/home'); 
      });
    }, 3000); // Wait for 3 seconds before starting the fade-out

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.welcomeText}>Welcome {auth.currentUser?.email}!</Text>
    </Animated.View>
  );
}

// Welcome screen styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7B00', 
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
});
