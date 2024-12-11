import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import LocationCard from './locationCard';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebase';

type Location = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
};

const Home: React.FC = () => {
  const router = useRouter();
  const { searchQuery } = useGlobalSearchParams<{ searchQuery: string }>(); // Retrieve the searchQuery
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch locations from Firestore
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'locations'));
        const fetchedLocations: Location[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedLocations.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            imagePath: data.imagePath,
          });
        });
        setLocations(fetchedLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Filter locations dynamically based on searchQuery
  useEffect(() => {
    if (searchQuery) {
      setFilteredLocations(
        locations.filter((location) =>
          location.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredLocations(locations);
    }
  }, [searchQuery, locations]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredLocations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LocationCard
            title={item.title}
            description={item.description}
            imagePath={item.imagePath}
            onPress={() => {
              router.push({
                pathname: '/(app)/selectCard',
                params: {
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  imagePath: item.imagePath,
                },
              });
            } } onHeartPress={function (): void {
              throw new Error('Function not implemented.');
            } }          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default Home;
