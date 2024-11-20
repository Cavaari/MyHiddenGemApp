import React, {useEffect} from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Text } from 'react-native';
import { firestore, collection, setDoc } from '../config/firebase';
import { doc } from 'firebase/firestore';

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
    title: 'Tambu Bar & Grill',
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
  {
    id: '7',
    title: 'Plas Kassav',
    description: 'A popular restaurant serving traditional cassava bread.',
    coordinate: {
      latitude: 13.9137373,
      longitude: -61.0560612,
    },
  },
  {
    id: '8',
    title: 'Cacoa Sainte Lucie',
    description: 'A cozy restaurant with a beautiful view at Belvedere.',
    coordinate: {
      latitude: 13.890177,
      longitude: -61.052993,
    },
  },
  {
    id: '9',
    title: "Fedo's",
    description: 'A local restaurant in Palmiste, Soufriere known for authentic cuisine.',
    coordinate: {
      latitude: 13.858301,
      longitude: -61.052272,
    },
  },
  {
    id: '10',
    title: "Skeeterz Rum Bar/Grill",
    description: 'A beachfront bar and grill at Sapphire in Laborie.',
    coordinate: {
      latitude: 13.753496,
      longitude: -61.019571,
    },
  },
  {
    id: '11',
    title: 'Faye Gastronomie',
    description: 'A slightly upscale restaurant located in Hewanorra, Vieux Fort.',
    coordinate: {
      latitude: 13.738081,
      longitude: -60.945542,
    },
  },
  {
    id: '12',
    title: 'Shernells',
    description: 'A budget-friendly restaurant in Bean Field, Vieux Fort.',
    coordinate: {
      latitude: 13.729969,
      longitude: -60.951025,
    },
  },
  {
    id: '13',
    title: "Mome's Cuisine",
    description: 'A casual dining spot on New Dock Road in Vieux Fort.',
    coordinate: {
      latitude: 13.728680,
      longitude: -60.951846,
    },
  },
  {
    id: '14',
    title: 'Tet Rouge Resort',
    description: 'An eco-friendly resort with stunning views at La Pointe, Choiseul.',
    coordinate: {
      latitude: 13.794625,
      longitude: -61.061936,
    },
  },
  {
    id: '15',
    title: 'Fond Doux Eco Resort',
    description: 'An eco-friendly resort nestled in the heart of Fond Doux, Soufriere.',
    coordinate: {
      latitude: 13.822006,
      longitude: -61.050075,
    },
  },
  {
    id: '16',
    title: "Glamity's Bar",
    description: 'A popular bar and restaurant located in Odsan, Castries.',
    coordinate: {
      latitude: 13.97211,
      longitude: -60.986569,
    },
  },
  {
    id: '17',
    title: "Cinderella's Slipper Cliffs",
    description: 'Beautiful cliffs located in Ciceron, Castries.',
    coordinate: {
      latitude: 13.996803,
      longitude: -61.014702,
    },
  },
  {
    id: '18',
    title: 'Mini Marigot Bay',
    description: 'A smaller, picturesque bay with scenic cliffs in Marigot, Castries.',
    coordinate: {
      latitude: 13.963085,
      longitude: -61.029930,
    },
  },
  {
    id: '19',
    title: 'Soley Kouche',
    description: 'A quaint restaurant in Delcer, Choiseul offering local cuisine.',
    coordinate: {
      latitude: 13.799460,
      longitude: -61.061919,
    },
  },
];

const uploadMarkersToFirestore = async () => {
  try {
    const locationsCollection = collection(firestore, 'locations');
    for (const marker of MARKER_DATA) {
      const markerRef = doc(locationsCollection, marker.id);
      await setDoc(markerRef, {
        title: marker.title,
        description: marker.description,
        coordinate: marker.coordinate,
      });
    }
    console.log("Markers uploaded to Firestore successfully!");
  } catch (error) {
    //console.error("Error uploading markers: ", error);
  }
};

const Markers = () => {
  // Upload markers to Firestore on first render
  useEffect(() => {
    uploadMarkersToFirestore();
  }, []);

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
