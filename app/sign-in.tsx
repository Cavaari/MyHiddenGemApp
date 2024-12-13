// app/SignInScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import { router } from 'expo-router'; 
import { auth } from '../config/firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth"; 

const { width } = Dimensions.get('window');

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password); 
      router.replace('/'); // Navigate to home screen after sign-in
    } catch (error) {
      Alert.alert("Sign In Error", (error as any).message); 
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSignUp = () => {
    router.push('/sign-up'); // Navigate to the sign-up screen
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/gem-logo-2.png')} style={styles.logo} />
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

      {/* Sign-Up screen link */}
      <TouchableOpacity onPress={handleGoToSignUp}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
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
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: '#87CEEB', 
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  signupText: {
    color: '#fff', 
    marginTop: 20, 
    textAlign: 'center', 
  },
  signupLink: {
    color: '#00BFFF', 
  },
});

export default SignInScreen;
