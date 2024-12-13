import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

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
  recommendedActivities: string;
};

const SelectCard: React.FC = () => {
  const { id } = useGlobalSearchParams();
  const router = useRouter();
  const [location, setLocation] = useState<Location | null>(null);
  const [isFavourited, setIsFavourited] = useState<boolean>(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  // Check if the location is already in favourites
  const checkIfFavourited = async () => {
    if (!user?.uid || !id) return;

    try {
      const favDoc = doc(db, `users/${user.uid}/favourites`, id as string);
      const favSnapshot = await getDoc(favDoc);
      setIsFavourited(favSnapshot.exists());
    } catch (error) {
      console.error('Error checking favourites:', error);
    }
  };

  // Add or remove from favourites
  const handleHeartPress = async () => {
    if (!user?.uid || !id || !location) return;

    const favDoc = doc(db, `users/${user.uid}/favourites`, id as string);

    try {
      if (isFavourited) {
        // Remove from favourites
        await deleteDoc(favDoc);
        Alert.alert('Removed', `${location.title} removed from favourites.`);
        setIsFavourited(false);
      } else {
        // Add to favourites
        await setDoc(favDoc, { ...location });
        Alert.alert('Added', `${location.title} added to favourites.`);
        setIsFavourited(true);
      }
    } catch (error) {
      console.error('Error updating favourites:', error);
      Alert.alert('Error', 'Could not update favourites. Please try again.');
    }
  };

  // Fetch location details from Firestore
  useEffect(() => {
    const fetchLocation = async () => {
      if (!id) return;

      try {
        const locationRef = doc(db, 'locations', id as string);
        const snapshot = await getDoc(locationRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data) {
            setLocation({
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
              recommendedActivities: data.recommendedActivities || '',
            });
          } else {
            console.error('Fetched data is empty.');
          }
        } else {
          console.error('No document found for ID:', id);
        }

        if (user?.uid) {
          await checkIfFavourited();
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, [id]);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Location not found</Text>
      </View>
    );
  }

  const handleNavigateToMap = () => {
    router.push({
      pathname: '/(app)/maps',
      params: { 
        id: location.id, 
        title: location.title,
        coordinates: location.coordinates,
        imagePath: location.imagePath,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: location.imagePath }} style={styles.image} />
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

        {/* <Text style={styles.detailHeader}>Coordinates:</Text>
        <Text style={styles.detailText}>{location.coordinates}</Text> */}

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

        <Text style={styles.detailHeader}>Recommended Activities:</Text>
        <Text style={styles.detailText}>{location.recommendedActivities}</Text>
      </View>

      <TouchableOpacity
        style={styles.mapButton}
        onPress={handleNavigateToMap}
      >
        <Text style={styles.mapButtonText}>View on Map</Text>
      </TouchableOpacity>

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
  mapButton: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectCard;
