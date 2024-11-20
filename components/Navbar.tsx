import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Navbar() {
  const router = useRouter();

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
      <TouchableOpacity onPress={() => router.push('/account')}>
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
