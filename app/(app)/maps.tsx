import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useGlobalSearchParams } from 'expo-router';
import { firestore, collection, getDocs } from '../../config/firebase';
import OpenLocationButton from '../../src/OpenLocationButton';
import { useSearch } from '../../providers/searchContext';

interface MarkerData {
  id: string;
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  imagePath: string;
}

const MapScreen: React.FC = () => {
  const { id, latitude, longitude } = useGlobalSearchParams();
  const { searchQuery } = useSearch();
  const [markerData, setMarkerData] = useState<MarkerData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch markers from Firestore
  const fetchMarkersFromFirebase = async () => {
    try {
      const locationsCollection = collection(firestore, 'locations');
      const snapshot = await getDocs(locationsCollection);

      const markers: MarkerData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        coordinate: {
          latitude: doc.data().coordinates.latitude,
          longitude: doc.data().coordinates.longitude,
        },
        imagePath: doc.data().imagePath || '',
      }));

      setMarkerData(markers);
    } catch (error) {
      console.error('Error fetching markers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkersFromFirebase();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF7B00" />
      </View>
    );
  }

  // Filter markers by ID or search query
  const filteredMarkers = searchQuery
    ? markerData.filter(
        (marker) =>
          marker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          marker.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : id
    ? markerData.filter((marker) => marker.id === id)
    : markerData;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude ? parseFloat(latitude as string) : 13.9094,
          longitude: longitude ? parseFloat(longitude as string) : -60.9789,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        showsUserLocation
        showsMyLocationButton
        rotateEnabled={false}
      >
        {filteredMarkers.map((marker) => (
          <Marker key={marker.id} coordinate={marker.coordinate}>
            <Callout>
              <View style={styles.calloutContainer}>
                <Image
                  source={{ uri: marker.imagePath }}
                  style={styles.calloutImage}
                />
                <Text style={styles.calloutTitle}>{marker.title}</Text>
                <Text style={styles.calloutDescription}>
                  {marker.description}
                </Text>

                <OpenLocationButton
                  title={marker.title}
                  latitude={marker.coordinate.latitude}
                  longitude={marker.coordinate.longitude}
                />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutContainer: {
    width: 250,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  calloutImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  calloutDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default MapScreen;
