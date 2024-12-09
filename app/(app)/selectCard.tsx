import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

type Location = {
  id: string;
  nameOfLocation: string;
  nameOfArea: string;
  constituency: string;
  locationCoordinates: string;
  terrainType: string;
  priceRange: string;
  briefDescription: string;
  recommendedViewingTime: string;
  safetyLevel: string;
  imagePath: string;
};

const SelectCard: React.FC = () => {
  const router = useRouter();
  const { id } = useGlobalSearchParams(); // Get ID from query params
  const [location, setLocation] = useState<Location | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocation = async () => {
      console.log('Fetching location...');
      try {
        const db = getFirestore();
        // Ensure id is a string (if it's an array, take the first element)
        const locationId = Array.isArray(id) ? id[0] : id;

        if (!locationId) {
          console.error('Location ID is missing');
          setIsLoading(false);
          return;
        }

        console.log(`Fetching document with ID: ${locationId}`);
        const locationRef = doc(db, `locations/${locationId}`);
        const snapshot = await getDoc(locationRef);

        if (snapshot.exists()) {
          console.log('Document found:', snapshot.data());
          const data = snapshot.data();
          const locationData: Location = {
            id: locationId,
            nameOfLocation: data['Name of Location'] || '',
            nameOfArea: data['Name of Area'] || '',
            constituency: data['Constituency'] || '',
            locationCoordinates: data['Location Coordinates'] || '',
            terrainType: data['Terrain Type'] || '',
            priceRange: data['Price range (only if applicable)'] || '',
            briefDescription: data['Brief Description'] || '',
            recommendedViewingTime: data['Recommended Viewing Time'] || '',
            safetyLevel: data['Safety Level (red orange yellow green)'] || '',
            imagePath: data['imagePath'] || '', // Path to the image in Firebase Storage
          };

          setLocation(locationData);
          console.log('Location data set:', locationData);

          // If an image path is provided, fetch the image URL
          if (locationData.imagePath) {
            const storage = getStorage();
            const imageRef = ref(storage, locationData.imagePath);
            try {
              const url = await getDownloadURL(imageRef);
              setImageUrl(url);
              console.log('Image URL fetched:', url);
            } catch (error) {
              console.error('Error fetching image URL:', error);
            }
          }
        } else {
          console.log('No document found');
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
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )}
      <Text style={styles.title}>{location.nameOfLocation}</Text>
      <Text style={styles.description}>{location.briefDescription}</Text>
      <Text style={styles.detail}>Area: {location.nameOfArea}</Text>
      <Text style={styles.detail}>Constituency: {location.constituency}</Text>
      <Text style={styles.detail}>Coordinates: {location.locationCoordinates}</Text>
      <Text style={styles.detail}>Terrain: {location.terrainType}</Text>
      <Text style={styles.detail}>Price Range: {location.priceRange}</Text>
      <Text style={styles.detail}>Recommended Viewing Time: {location.recommendedViewingTime}</Text>
      <Text style={styles.detail}>Safety Level: {location.safetyLevel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default SelectCard;
