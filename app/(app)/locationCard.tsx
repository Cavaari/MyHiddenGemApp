import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

interface LocationCardProps {
  title: string;
  description: string;
  imagePath: string;
  imageUrl?: string;
  onPress: () => void;
  onHeartPress: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ title, description, imagePath, onPress, onHeartPress }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isFavourited, setIsFavourited] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
    checkIfFavourited(); // Check if the card is favourited
  }, [imagePath]);

  // Function to check if this card is favourited from AsyncStorage
  const checkIfFavourited = async () => {
    const favs = await AsyncStorage.getItem('favouriteCards');
    const favouriteCards = favs ? JSON.parse(favs) : [];
    setIsFavourited(favouriteCards.some((card: any) => card.title === title)); // Check if the current card is in the favourites
  };

  // Handle heart button press to add/remove from favourites
  const handleHeartPress = async () => {
    if (isFavourited) {
      // Show confirmation dialog before removing
      Alert.alert(
        "Remove from favourites",
        "Are you sure you want to remove this location from your favourites?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: async () => {
              let favs = await AsyncStorage.getItem('favouriteCards');
              const favouriteCards = favs ? JSON.parse(favs) : [];

              // Remove from favourites
              const updatedFavourites = favouriteCards.filter((card: any) => card.title !== title);
              await AsyncStorage.setItem('favouriteCards', JSON.stringify(updatedFavourites));
              setIsFavourited(false);
            }
          }
        ]
      );
    } else {
      // Add to favourites if not favourited
      let favs = await AsyncStorage.getItem('favouriteCards');
      const favouriteCards = favs ? JSON.parse(favs) : [];

      const newFavourite = { title, description, imagePath, imageUrl };
      favouriteCards.push(newFavourite);
      await AsyncStorage.setItem('favouriteCards', JSON.stringify(favouriteCards));
      setIsFavourited(true);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.heartButton} onPress={handleHeartPress}>
        <FontAwesome 
          name="heart" 
          style={[styles.icon, { color: isFavourited ? 'red' : '#ddd' }]} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  heartButton: {
    alignSelf: 'flex-end',
  },
  icon: {
    fontSize: 24,
  },
  content: {
    marginBottom: 8,
  },
});

export default LocationCard;
