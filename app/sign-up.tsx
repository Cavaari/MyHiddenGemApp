import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import { auth, firestore } from '../config/firebase'; 
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods

const { width, height } = Dimensions.get('window');

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState(''); // Initialize with an empty string
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State to control the dropdown

  // Updated options for the security question dropdown
  const securityQuestions = [
    { label: "Select a Security Question", value: '' }, // Use an empty string instead of null
    { label: "What is your mother's maiden name?", value: 'mother_maiden_name' },
    { label: "What was the name of your first pet?", value: 'first_pet' },
    { label: "What is your favorite book?", value: 'favorite_book' },
  ];

  // Handle sign-up
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a document in the 'users' collection for the new user
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        email: user.email,
        role: 'user', // Default role as 'user'
        securityQuestion,
        securityAnswer,
      });

      Alert.alert('Success', 'Account created successfully!');
      router.replace('/'); // Redirect to home screen 
    } catch (error: any) {
      Alert.alert('Sign Up Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('@/assets/images/gem-logo-2.png')} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {/* <DropDownPicker
        open={open} // Controlled open state
        value={securityQuestion}
        items={securityQuestions}
        setOpen={setOpen}  // Function to open/close the dropdown
        setValue={setSecurityQuestion}  // Function to set the selected value
        containerStyle={{ height: 50, marginBottom: 15 }}
        style={styles.dropdown}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Answer"
        placeholderTextColor="#aaa"
        value={securityAnswer}
        onChangeText={setSecurityAnswer}
      /> */}

      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'SIGN UP'}</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Already a user? <Text style={styles.loginLink} onPress={handleGoToSignIn}>SIGN IN</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FF7B00',
    height: height,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 20,
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
  dropdown: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
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
  loginText: {
    marginTop: 20,
    color: '#fff',
  },
  loginLink: {
    color: '#00BFFF',
  },
});

export default SignupScreen;
