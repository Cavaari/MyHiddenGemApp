import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import LocationCard from '../(app)/locationCard'; 
import AsyncStorage from '@react-native-async-storage/async-storage';



const Favourites = () => {
  const [favouriteCards, setFavouriteCards] = useState<any[]>([]);

  useEffect(() => {
    const loadFavourites = async () => {
      const favs = await AsyncStorage.getItem('favouriteCards');
      const favouriteCards = favs ? JSON.parse(favs) : [];
      setFavouriteCards(favouriteCards);
    };

    loadFavourites();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favouriteCards.length > 0 ? (
        favouriteCards.map((card: any, index: number) => (
          <LocationCard
            key={index}
            title={card.title}
            description={card.description}
            imagePath={card.imagePath}
            imageUrl={card.imageUrl}
            onPress={() => { } } onHeartPress={function (): void {
              throw new Error('Function not implemented.');
            } }          
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default Favourites;
