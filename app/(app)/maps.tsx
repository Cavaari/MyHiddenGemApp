import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { firestore, collection, getDocs } from '../../config/firebase';
import Markers from '@/assets/markers';

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

const MapScreen = () => {
  const [markerData, setMarkerData] = useState<MarkerData[]>([]);
  const [loading, setLoading] = useState(true);

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

      //console.log('Fetched Markers:', markers); 
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.9094,
          longitude: -60.9789,
          latitudeDelta: 0.8,
          longitudeDelta: 0.6,
        }}
        showsUserLocation
        showsMyLocationButton
        rotateEnabled={false}
        maxDelta={0.5}
        minDelta={0.001}
      >
        <Markers markerData={markerData} />
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
});

export default MapScreen;
