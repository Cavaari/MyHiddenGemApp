import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Text } from 'react-native';

const MARKER_DATA = [
  {
    id: '1',
    title: 'The Moon',
    description: 'A Moonlit lookout which has spectacular views.',
    coordinate: {
      latitude: 14.1014727,
      longitude: -60.9229791,
    },
  },
  {
    id: '2',
    title: 'Naked Fisherman',
    description: 'A pictureesq beach with lovely waves and warm sand.',
    coordinate: {
      latitude: 14.1005684,
      longitude: -60.9498062,
    },
  },
  {
    id: '3',
    title: 'Wonderers Trail',
    description: 'A short Trail with an impeccable view of the Atlantic ocean.',
    coordinate: {
      latitude: 14.1051266,
      longitude: -60.9418092,
    },
  },
  {
    id: '4',
    title: 'Vigie Cliffs',
    description: 'A short cliff which has a great view of the city.',
    coordinate: {
      latitude: 14.0196995,
      longitude: -61.0019175,
    },
  },
  {
    id: '5',
    title: 'Grill & Chill',
    description: 'A small local restaurant with great food and a great view.',
    coordinate: {
      latitude: 13.7575715,
      longitude: -60.9367314,
    },
  },
  {
    id: '6',
    title: 'Tapion Ruins',
    description: 'Ancient Ruins which cross a portion of the sea.',
    coordinate: {
      latitude: 14.016084,
      longitude: -61.006527,
    },
  },
];

const Markers = () => {
    return (
      <>
        {MARKER_DATA.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
          >
            <Callout>
              <Text style={{ fontWeight: 'bold' }}>{marker.title}</Text>
              <Text>{marker.description}</Text>
            </Callout>
          </Marker>
        ))}
      </>
    );
  };

export default Markers;
