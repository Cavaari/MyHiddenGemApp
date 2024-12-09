import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useSession } from '../providers/ctx'; // Adjust the import path

export default function Navbar() {
  const router = useRouter();
  const { user } = useSession(); // Assuming this gives you access to the user session

  const handleAccountPress = () => {
    if (user?.role === 'admin') {
      router.push('/adminPage'); // Navigate to the admin page
    } else {
      router.push('/account'); // Navigate to the account page
    }
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push('/home')}>
        <FontAwesome name="home" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/favourites')}>
        <FontAwesome name="heart" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/maps')}>
        <FontAwesome name="map-marker" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAccountPress}>
        <FontAwesome name="user" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FF7B00', 
  },
  icon: {
    fontSize: 32,
    color: '#fff', 
  },
});
