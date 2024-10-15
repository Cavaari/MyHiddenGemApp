import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useSession } from '../../providers/ctx';
import { router } from 'expo-router'; // Import the router for navigation

export default function Index() {
  const { session, signOut } = useSession(); // Assuming `session` holds the current user's email

  // Animated value for glow effect
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!session) {
      // If the user is not logged in, redirect to the sign-in screen
      router.replace('/sign-in'); // Adjust to your sign-in route
    }
  }, [session]);

  useEffect(() => {
    // Create a glow effect by animating the opacity in a loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500, // How long the glow takes
          useNativeDriver: true, // Optimize animation performance
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [glowAnim]);

  // Extract the email ID (everything before the '@' symbol)
  const userEmail = session ? session.split('@')[0] : '';

  return (
    <View style={styles.container}>
      <Animated.Text // Use Animated.Text to animate the welcomeText
        style={[
          styles.welcomeText,
          {
            opacity: glowAnim, // Bind opacity to the animated value
          },
        ]}
      >
        Welcome{userEmail ? `, ${userEmail}` : ''}!
      </Animated.Text>
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styling for the welcome screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7B00', // Background color
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: '#00BFFF', // Button color
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
