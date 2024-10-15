// app/_layout.tsx
import React from 'react';
import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../providers/ctx';  // Import the SessionProvider from your context file

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Redirect to sign-in if not authenticated
  if (!session) {
    return <Redirect href="../sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // This removes the header from all screens in the stack
      }}
    />
  );
}
