import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Text } from 'react-native';

interface MarkerData {
  id: string;
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

interface MarkersProps {
  markerData: MarkerData[];
}

const Markers: React.FC<MarkersProps> = ({ markerData }) => {
  return (
    <>
      {markerData.map((marker) => (
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
