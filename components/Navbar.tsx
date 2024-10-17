// components/Navbar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Navbar() {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Text style={styles.icon}>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/favourites')}>
        <Text style={styles.icon}>❤️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/maps')}>
        <Text style={styles.icon}>📍</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/account')}>
        <Text style={styles.icon}>👤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#FF7B00', // Customize the navbar background color
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
});
