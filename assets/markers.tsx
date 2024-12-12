import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import OpenLocationButton from '../src/OpenLocationButton';

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

interface MarkersProps {
  markerData: MarkerData[];
}

const Markers: React.FC<MarkersProps> = ({ markerData }) => {
  return (
    <>
      {markerData.map((marker) => (
        <Marker key={marker.id} coordinate={marker.coordinate}>
          <Callout tooltip={Platform.OS === 'ios'}>
            <View style={Platform.OS === 'ios' ? styles.calloutContainer : styles.androidCallout}>
              {marker.imagePath ? (
                <Image source={{ uri: marker.imagePath }} style={styles.calloutImage} />
              ) : (
                <Text style={styles.noImageText}>No Image Available</Text>
              )}
              <Text style={styles.calloutTitle}>{marker.title}</Text>
              <Text style={styles.calloutDescription}>{marker.description}</Text>

              <OpenLocationButton
                title={marker.title}
                latitude={marker.coordinate.latitude}
                longitude={marker.coordinate.longitude}
              />
            </View>
          </Callout>
        </Marker>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    alignItems: 'center',
    padding: 8,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  androidCallout: {
    width: 250,
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
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
    textAlign: 'center',
  },
  noImageText: {
    color: '#555',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
});

export default Markers;
