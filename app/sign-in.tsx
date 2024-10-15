// app/SignInScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import { router } from 'expo-router'; // Import router for navigation
import { auth } from '../config/firebase'; // Import the Firebase auth object
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase sign-in method

const { width } = Dimensions.get('window');

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password); // Sign in using Firebase
      router.replace('/'); // Navigate to home screen after sign-in
    } catch (error) {
      Alert.alert("Sign In Error", (error as any).message); // Show error alert on failure
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSignUp = () => {
    router.push('/sign-up'); // Navigate to the sign-up screen
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/gem-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail} // Update email state
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword} // Update password state
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'SIGN IN'}</Text>
      </TouchableOpacity>

      {/* Button to navigate to the Sign-Up screen */}
      <TouchableOpacity onPress={handleGoToSignUp}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FF7B00',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: '#87CEEB', // Lighter color when disabled
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  signupText: {
    color: '#edf3f5', // Color for the sign-up link
    marginTop: 20, // Space above the text
    textAlign: 'center', // Center the text
  },
});

export default SignInScreen;
