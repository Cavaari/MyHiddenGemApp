import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { firestore, collection, getDocs } from '../../config/firebase';

const MapScreen = () => {
  interface MarkerData {
    id: string;
    title: string;
    description: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }

  const [markerData, setMarkerData] = useState<MarkerData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMarkersFromFirebase = async () => {
    try {
      const locationsCollection = collection(firestore, 'locations');
      const snapshot = await getDocs(locationsCollection);
      const markers = snapshot.docs.map((doc: { id: any; data: () => any; }) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMarkerData(markers);
    } catch (error) {
      console.error('Error fetching markers: ', error);
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
        showsUserLocation={true}
        showsMyLocationButton={true}
        rotateEnabled={false}
        maxDelta={0.5} // Island Zoom Out limit
        minDelta={0.001}
      >
        {markerData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinates}
            title={marker.title}
          >
            <Callout>
              <View>
                <Text style={styles.calloutTitle}>{marker.title}</Text>
                <Text>{marker.description}</Text>
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
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});

export default MapScreen;
