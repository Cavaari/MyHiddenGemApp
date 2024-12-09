// app/_layout.tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../providers/ctx';
import Navbar from '../../components/Navbar';
import CustomHeader from './customHeader';

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          header: () => <CustomHeader setSearchQuery={setSearchQuery} searchQuery={searchQuery} />,
          headerShown: true,
          headerSearchBarOptions: {},
          headerTintColor: '#000',
        }}
      />
      <Navbar />
    </View>
  );
}
