// app/favourites.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import LocationCard from './locationCard';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { getAuth } from 'firebase/auth';

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
  const auth = getAuth();
  const user = auth.currentUser;

  const loadFavourites = async () => {
    if (!user?.uid) return;

    try {
      const querySnapshot = await getDocs(collection(firestore, `users/${user.uid}/favourites`));
      const fetchedFavourites: Location[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Location[];
      setFavouriteCards(fetchedFavourites);
    } catch (error) {
      console.error('Error loading favourites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            imagePath={card.imagePath}
            onPress={() =>
              router.push({
                pathname: '/(app)/selectCard',
                params: { id: card.id },
              })
            }
          />
        ))
      ) : (
        <Text style={styles.emptyMessage}>No favourites yet!</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  emptyMessage: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 20 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Favourites;
