// locationCard.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage, firestore } from '../../config/firebase';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';

interface LocationCardProps {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  onPress: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({
  id, title, description, imagePath, onPress
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isFavourited, setIsFavourited] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

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
    if (user?.uid) checkIfFavourited(); 
  }, [imagePath]);

  const checkIfFavourited = async () => {
    if (!user?.uid) return;

    try {
      const favDoc = doc(firestore, `users/${user.uid}/favourites`, id);
      const favSnapshot = await getDoc(favDoc);
      setIsFavourited(favSnapshot.exists());
    } catch (error) {
      console.error('Error checking favourites:', error);
    }
  };

  const handleHeartPress = async () => {
    if (!user?.uid) {
      Alert.alert('Error', 'You must be signed in to manage favourites.');
      return;
    }

    const favDoc = doc(firestore, `users/${user.uid}/favourites`, id);

    if (isFavourited) {
      Alert.alert(
        'Remove from favourites',
        'Are you sure you want to remove this location from your favourites?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteDoc(favDoc);
                setIsFavourited(false);
                // Alert.alert('Removed', `${title} has been removed from your favourites.`);
              } catch (error) {
                console.error('Error removing favourite:', error);
              }
            },
          },
        ]
      );
    } else {
      try {
        await setDoc(favDoc, {
          id,
          title,
          description,
          imagePath,
          imageUrl,
        });
        setIsFavourited(true);
        // Alert.alert('Added', `${title} has been added to your favourites.`);
      } catch (error) {
        console.error('Error adding to favourites:', error);
      }
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
