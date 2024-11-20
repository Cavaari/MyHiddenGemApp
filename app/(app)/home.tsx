import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import LocationCard from './locationCard';

// Define the Location type
type Location = {
  id: string; 
  title: string;
  description: string;
  imagePath: string; 
};

const Home: React.FC = () => {
  // Use Location type for the locations array
  const locations: Location[] = [
    {
      id: '1',
      title: 'The Moon',
      description: 'A Moonlit lookout which has spectacular views.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2FThe%20moon.jpg?alt=media',
    },
    {
      id: '2',
      title: 'Naked Fisherman',
      description: 'A picturesque beach with lovely waves and warm sand.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2FNaked%20Fisherman.jpg?alt=media',

    },
    {
      id: '3',
      title: 'Wonderers Trail',
      description: 'A short Trail with an impeccable view of the Atlantic ocean.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2FNaked%20Fisherman.jpg?alt=media',
    },
    {
      id: '4',
      title: 'Vigie Cliffs',
      description: 'A short cliff which has a great view of the city.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2FNaked%20Fisherman.jpg?alt=media',
    },
    {
      id: '5',
      title: 'Tambu Bar & Grill',
      description: 'A small local restaurant with great food and a great view.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2Ftambupatio.jpg?alt=media',
    },
    {
      id: '6',
      title: 'Tapion Ruins',
      description: 'Ancient Ruins which cross a portion of the sea.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2Ftapionruins.JPG?alt=media',
    },
    {
      id: '7',
      title: 'Plas Kassav',
      description: 'A popular restaurant serving traditional cassava bread.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2Fplaskassav.jpg?alt=media',
    },
    {
      id: '8',
      title: 'Cacoa Sainte Lucie',
      description: 'A cozy restaurant with a beautiful view at Belvedere.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2Fcacaosaintelucie.jpg?alt=media',
    },
    {
      id: '9',
      title: 'Fedo\'s',
      description: 'A local restaurant in Palmiste, Soufriere known for authentic cuisine.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2Ffedosfood.jpg?alt=media',
    },
    {
      id: '10',
      title: 'Skeeterz Rum Bar/Grill',
      description: 'A beachfront bar and grill at Sapphire in Laborie.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2FNaked%20Fisherman.jpg?alt=media',
    },
    {
      id: '11',
      title: 'Faye Gastronomie',
      description: 'A slightly upscale restaurant located in Hewanorra, Vieux Fort.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2FNaked%20Fisherman.jpg?alt=media',
    },
    {
      id: '12',
      title: 'Shernells',
      description: 'A budget-friendly restaurant in Bean Field, Vieux Fort.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2FNaked%20Fisherman.jpg?alt=media',
    },
    {
      id: '13',
      title: 'Mome\'s Cuisine',
      description: 'A casual dining spot on New Dock Road in Vieux Fort.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2FNaked%20Fisherman.jpg?alt=media',
    },
    {
      id: '14',
      title: 'Tet Rouge Resort',
      description: 'An eco-friendly resort with stunning views at La Pointe, Choiseul.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2Ftetrouge.jpg?alt=media',
    },
    {
      id: '15',
      title: 'Fond Doux Eco Resort',
      description: 'An eco-friendly resort nestled in the heart of Fond Doux, Soufriere.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2Ffonddoux.jpg?alt=media',
    },
    {
      id: '16',
      title: 'Glamity\'s Bar',
      description: 'A popular local restaurant and bar located in Odsan, Castries.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2Fglamityfood.jpg?alt=media',
    },
    {
      id: '17',
      title: 'Cinderella\'s Slipper Cliffs',
      description: 'Beautiful cliffs located in Ciceron, Castries.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2Fcinderellacliff.jpeg?alt=media',
    },
    {
      id: '18',
      title: 'Mini Marigot Bay',
      description: 'A smaller, picturesque bay with scenic cliffs in Marigot, Castries.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2Fminimarigotbay.jpg?alt=media',
    },
    {
      id: '19',
      title: 'Soley Kouche',
      description: 'A quaint restaurant in Delcer, Choiseul offering local cuisine.',
      imagePath: 'https://firebasestorage.googleapis.com/v0/b/myhiddengemapp.appspot.com/o/location%20images%2FNaked%20Fisherman.jpg?alt=media',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          title={location.title}
          description={location.description}
          imagePath={location.imagePath} 
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Home;
