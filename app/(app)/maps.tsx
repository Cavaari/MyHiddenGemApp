import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Markers from '../../assets/markers';

const MapScreen = () => {
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
        minDelta={0.1} 
      >
        <Markers />
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
});

export default MapScreen;
