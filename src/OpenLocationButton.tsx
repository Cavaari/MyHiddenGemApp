import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Alert, Platform } from 'react-native';

interface OpenLocationButtonProps {
  title: string;
  latitude: number;
  longitude: number;
}

const OpenLocationButton: React.FC<OpenLocationButtonProps> = ({ title, latitude, longitude }) => {
  const openInMaps = () => {
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = Platform.OS === 'ios' 
      ? `http://maps.apple.com/?ll=${latitude},${longitude}&q=${encodeURIComponent(title)}`
      : `geo:${latitude},${longitude}?q=${encodeURIComponent(title)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open the location in maps.');
        }
      })
      .catch((err) => {
        console.error('Error opening maps:', err);
        Alert.alert('Error', 'Something went wrong while opening the location.');
      });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={openInMaps}>
      <Text style={styles.buttonText}>Open in Maps</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: '#2375fa',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OpenLocationButton;
