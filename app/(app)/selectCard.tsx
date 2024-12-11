import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

type Location = {
  id: string;
  title: string;
  area: string;
  constituency: string;
  coordinates: string;
  terrain: string;
  priceRange: string;
  description: string;
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
        try {
          const db = getFirestore();
          const locationRef = doc(db, 'locations', id as string); // Ensure the correct type
          const snapshot = await getDoc(locationRef);
      
          if (snapshot.exists()) {
            const data = snapshot.data();
            const locationData: Location = {
              id: id as string, // Ensure id is passed correctly
              title: data.title || '',
              area: data.area || '',
              constituency: data.constituency || '',
              coordinates: `${data.coordinates.latitude}, ${data.coordinates.longitude}` || '',
              terrain: data.terrain || '',
              priceRange: data.priceRange || '',
              description: data.description || '',
              recommendedViewingTime: data.recommendedViewingTime || '',
              safetyLevel: data.safetyLevel || '',
              imagePath: data.imagePath || '',
            };
      
            setLocation(locationData);
      
            if (locationData.imagePath) {
              const storage = getStorage();
              const imageRef = ref(storage, locationData.imagePath);
              try {
                const url = await getDownloadURL(imageRef);
                setImageUrl(url);
              } catch (error) {
                console.error('Error fetching image URL:', error);
              }
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
    //console.log('Accessing location:', location?.title);
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (!location) {
    return <View style={styles.container}><Text>Location not found</Text></View>;
  }

  return (
    <View style={styles.container}>
  <View style={styles.imageContainer}>
    {imageUrl ? (
      <Image source={{ uri: imageUrl }} style={styles.image} />
    ) : (
      <Text>No image available</Text>
    )}
  </View>

  <Text style={styles.title}>{location.title}</Text>
  <Text style={styles.description}>{location.description}</Text>

  <View style={styles.detailContainer}>
    <Text style={styles.detailHeader}>Area:</Text>
    <Text style={styles.detailText}>{location.area}</Text>

    <Text style={styles.detailHeader}>Constituency:</Text>
    <Text style={styles.detailText}>{location.constituency}</Text>

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
  </View>
</View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    imageContainer: {
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 16,
    },
    image: {
      width: '100%',
      height: 250,
      resizeMode: 'cover',
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
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
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
