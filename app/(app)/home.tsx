import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import LocationCard from './locationCard';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebase';

type Location = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
};

interface HomeProps {
  filter: string;
}

const Home: React.FC<HomeProps> = ({ filter }) => {
  const [favorites, setFavorites] = useState<Location[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

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
        setFilteredLocations(fetchedLocations); // Initialize the filtered data
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Filter locations based on user input from props
  useEffect(() => {
    if (filter) {
      setFilteredLocations(
        locations.filter((location) =>
          location.title.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredLocations(locations);
    }
  }, [filter, locations]);

  const handleAddToFavorites = (location: Location) => {
    if (favorites.some((fav) => fav.id === location.id)) {
      Alert.alert('Duplicate', `${location.title} is already in your favorites.`);
      return;
    }
    setFavorites((prevFavorites) => [...prevFavorites, location]);
    Alert.alert('Added', `${location.title} has been added to your favorites.`);
  };

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LocationCard
            title={item.title}
            description={item.description}
            imagePath={item.imagePath}
            onPress={() => {
              router.push({
                pathname: '/(app)/selectCard',
                params: {
                  title: item.title,
                  description: item.description,
                  imagePath: item.imagePath,
                },
              });
            }}
            onHeartPress={() => handleAddToFavorites(item)}
          />
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
