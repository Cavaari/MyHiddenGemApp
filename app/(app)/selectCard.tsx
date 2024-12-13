import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

type Location = {
  id: string;
  title: string;
  area: string;
  community: string;
  coordinates: string;
  terrain: string;
  priceRange: string;
  description: string;
  recommendedViewingTime: string;
  safetyLevel: string;
  imagePath: string;
  recommendedModeOfTravel: string;
};

const SelectCard: React.FC = () => {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavourited, setIsFavourited] = useState<boolean>(false);

  // Check if the location is already in favourites
  const checkIfFavourited = async (locationId: string) => {
    try {
      const storedFavourites = await AsyncStorage.getItem('favouriteCards');
      const favourites = storedFavourites ? JSON.parse(storedFavourites) : [];
      const exists = favourites.some((fav: Location) => fav.id === locationId);
      setIsFavourited(exists);
    } catch (error) {
      console.error('Error checking favourites:', error);
    }
  };

  // Add or remove from favourites
  const handleHeartPress = async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem('favouriteCards');
      const favourites = storedFavourites ? JSON.parse(storedFavourites) : [];

      let updatedFavourites;

      if (isFavourited) {
        updatedFavourites = favourites.filter((fav: Location) => fav.id !== id);
        setIsFavourited(false);
        Alert.alert('Removed', `${location?.title} removed from favourites.`);
      } else {
        updatedFavourites = [...favourites, location];
        setIsFavourited(true);
        Alert.alert('Added', `${location?.title} added to favourites.`);
      }

      await AsyncStorage.setItem('favouriteCards', JSON.stringify(updatedFavourites));
    } catch (error) {
      console.error('Error updating favourites:', error);
    }
  };

  useEffect(() => {
    if (id && typeof id === 'string') {
      checkIfFavourited(id);
    }

    const fetchLocation = async () => {
      try {
        const db = getFirestore();
        const locationRef = doc(db, 'locations', id as string);
        const snapshot = await getDoc(locationRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          const locationData: Location = {
            id: id as string,
            title: data.title || '',
            area: data.area || '',
            community: data.community || '',
            coordinates: `${data.coordinates.latitude}, ${data.coordinates.longitude}` || '',
            terrain: data.terrain || '',
            priceRange: data.priceRange || '',
            description: data.description || '',
            recommendedViewingTime: data.recommendedViewingTime || '',
            safetyLevel: data.safetyLevel || '',
            imagePath: data.imagePath || '',
            recommendedModeOfTravel: data.recommendedModeOfTravel || '',
          };

          setLocation(locationData);

          if (locationData.imagePath) {
            const storage = getStorage();
            const imageRef = ref(storage, locationData.imagePath);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
          }
        } else {
          console.log('No document found for ID:', id);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchLocation();
    }
  }, [id]);

  if (isLoading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (!location) {
    return <View style={styles.container}><Text>Location not found</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text>No image available</Text>
        )}
        <TouchableOpacity style={styles.heartButton} onPress={handleHeartPress}>
          <FontAwesome
            name="heart"
            style={[styles.heartIcon, { color: isFavourited ? 'red' : '#ddd' }]}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{location.title}</Text>
      <Text style={styles.description}>{location.description}</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.detailHeader}>Area:</Text>
        <Text style={styles.detailText}>{location.area}</Text>

        <Text style={styles.detailHeader}>Community:</Text>
        <Text style={styles.detailText}>{location.community}</Text>

        <Text style={styles.detailHeader}>Coordinates:</Text>
        <Text style={styles.detailText}>{location.coordinates}</Text>

        <Text style={styles.detailHeader}>Terrain:</Text>
        <Text style={styles.detailText}>{location.terrain}</Text>

        <Text style={styles.detailHeader}>Price Range:</Text>
        <Text style={styles.detailText}>{location.priceRange}</Text>

        <Text style={styles.detailHeader}>Recommended Viewing Time:</Text>
        <Text style={styles.detailText}>{location.recommendedViewingTime}</Text>

        <Text style={styles.detailHeader}>Safety Level:</Text>
        <Text style={styles.detailText}>{location.safetyLevel}</Text>

        <Text style={styles.detailHeader}>Recommended Mode of Travel:</Text>
        <Text style={styles.detailText}>{location.recommendedModeOfTravel}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  heartIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    textAlign: 'justify',
  },
  detailContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    borderColor: '#EEE',
    borderWidth: 1,
    marginVertical: 8,
  },
  detailHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});

export default SelectCard;
