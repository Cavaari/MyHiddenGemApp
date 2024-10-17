import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSession } from '../../providers/ctx'; // Import the session provider

const AccountScreen = () => {
  const { signOut } = useSession(); // Destructure signOut from the session context

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Page</Text>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20, // Add some spacing below the text
  },
  signOutButton: {
    backgroundColor: '#00BFFF', // Same color as your welcome screen for consistency
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AccountScreen;
