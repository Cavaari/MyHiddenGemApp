import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import LocationCard from '../(app)/locationCard'; 
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Location = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
};

const Favourites: React.FC = () => {
  const router = useRouter();
  const [favouriteCards, setFavouriteCards] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load favourites from AsyncStorage
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const favs = await AsyncStorage.getItem('favouriteCards');
        const parsedFavourites = favs ? JSON.parse(favs) : [];
        
        // Ensure each card has a unique key if not provided
        const enrichedFavourites = parsedFavourites.map((card: Location, index: number) => ({
          ...card,
          id: card.id || `fav-${index}`,
        }));

        setFavouriteCards(enrichedFavourites);
      } catch (error) {
        console.error('Error loading favourites:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFavourites();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favouriteCards.length > 0 ? (
        favouriteCards.map((card) => (
          <LocationCard
            key={card.id}  // Ensures a unique key
            title={card.title}
            description={card.description}
            imagePath={card.imagePath}
            onPress={() => { 
              router.push({
                pathname: '/(app)/selectCard',
                params: {
                  id: card.id,
                },
              });
            }} 
            onHeartPress={() => {
              console.error('Heart press not implemented.');
            }}
          />
        ))
      ) : (
        <Text style={styles.emptyMessage}>No favourites yet!</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Favourites;
