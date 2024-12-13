// app/home.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import LocationCard from './locationCard';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { useSearch } from '../../providers/searchContext';

type Location = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
};

const Home: React.FC = () => {
  const router = useRouter();
  const { searchQuery } = useSearch();
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch locations from Firestore
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'locations'));
        const fetchedLocations: Location[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            imagePath: data.imagePath,
          } as Location;
        });
        setLocations(fetchedLocations);
        setFilteredLocations(fetchedLocations);
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
    const filterResults = () => {
      if (searchQuery?.trim()) {
        const results = locations.filter((location) =>
          location.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredLocations(results);
      } else {
        setFilteredLocations(locations);
      }
    };

    filterResults();
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
                },
              });
            }}
            onHeartPress={() => {
              console.error('Heart press not implemented.');
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingBottom: 16 },
});

export default Home;
