// app/_layout.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Redirect, Stack } from 'expo-router'; // Removed Slot import
import { useSession } from '../../providers/ctx'; // Import the SessionProvider
import Navbar from '../../components/Navbar'; // Assuming you have a Navbar component

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>; // Loader while checking session
  }

  // Redirect to sign-in if not authenticated
  if (!session) {
    return <Redirect href="/sign-in" />; 
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack 
        screenOptions={{
          headerShown: false, // removes the header from all screens in the stack
        }}
      >
      </Stack>
      <Navbar />
    </View>
  );
}
