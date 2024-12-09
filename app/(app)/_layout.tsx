// app/_layout.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Redirect, Stack } from 'expo-router'; 
import { useSession } from '../../providers/ctx'; 
import Navbar from '../../components/Navbar'; 
import CustomHeader from './customHeader';

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
          header: () => <CustomHeader />,
          headerShown: true, // removes the header from all screens in the stack
          headerSearchBarOptions: {}, 
          headerTintColor: '#000',
        }}
      >
      </Stack>
      <Navbar />
    </View>
  );
}
