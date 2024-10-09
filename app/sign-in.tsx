// app/SignInScreen.tsx
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { router } from 'expo-router'; // Import router for navigation
import { useSession } from '../providers/ctx'; // Import the authentication context

const { width, height } = Dimensions.get('window');

const SignInScreen = () => {
  const { signIn } = useSession(); // Get the signIn function from context

  const handleSignIn = () => {
    signIn();
    router.replace('/'); // Navigate to home screen after sign-in
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/gem-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sign In</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>SIGN IN</Text>
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
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 20,
    },
});

export default SignInScreen;
