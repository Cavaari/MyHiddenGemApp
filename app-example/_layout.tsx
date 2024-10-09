// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} // Hide header for SignupScreen
        />
        {/* <Stack.Screen 
          name="tabs/index" 
          options={{ title: 'Home' }} 
        /> */}
      </Stack>
  );
}
