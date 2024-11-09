import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import LocationCard from '../(app)/locationCard';

const sampleLocations = [
  {
    id: '1',
    title: 'The Moon',
    description: 'A Moonlit lookout which has spectacular views.',
    imageUrl: 'https://example.com/image1.jpg',
  },
  {
    id: '2',
    title: 'Naked Fisherman',
    description: 'A pictureesq beach with lovely waves and warm sand.',
    imageUrl: 'https://example.com/image2.jpg',
  },
  {
    id: '3',
    title: 'Wonderers Trail',
    description: 'A short Trail with an impeccable view of the Atlantic ocean.',
    imageUrl: 'https://example.com/image3.jpg',
  },
  {
    id: '4',
    title: 'Vigie Cliffs',
    description: 'A short cliff which has a great view of the city.',
    imageUrl: 'https://example.com/image4.jpg',
  },
  {
    id: '5',
    title: "Grill & Chill",
    description: 'A small local restaurant with great food and a great view.',
    imageUrl: 'https://example.com/image5.jpg',
  },
  {
    id: '6',
    title: "Tapion Ruins",
    description: 'Ancient Ruins which cross a portion of the sea.',
    imageUrl: 'https://example.com/image6.jpg',
  },
  {
    id: '7',
    title: "Plas Kassav",
    description: 'A popular restaurant serving traditional cassava bread.',
    imageUrl: 'https://example.com/image7.jpg',
  },
  {
    id: '8',
    title: "Cacoa Sainte Lucie",
    description: 'A cozy restaurant with a beautiful view at Belvedere.',
    imageUrl: 'https://example.com/image8.jpg',
  },
  {
    id: '9',
    title: "Fedo's",
    description: 'A local restaurant in Palmiste, Soufriere known for authentic cuisine.',
    imageUrl: 'https://example.com/image9.jpg',
  },
  {
    id: '10',
    title: "Skeeterz Rum Bar/Grill",
    description: 'A beachfront bar and grill at Sapphire in Laborie.',
    imageUrl: 'https://example.com/image10.jpg',
  },
  {
    id: '11',
    title: "Faye Gastronomie",
    description: 'A slightly upscale restaurant located in Hewanorra, Vieux Fort.',
    imageUrl: 'https://example.com/image11.jpg',
  },
  {
    id: '12',
    title: "Shernells",
    description: 'A budget-friendly restaurant in Bean Field, Vieux Fort.',
    imageUrl: 'https://example.com/image12.jpg',
  },
  {
    id: '13',
    title: "Mome's Cuisine",
    description: 'A casual dining spot on New Dock Road in Vieux Fort.',
    imageUrl: 'https://example.com/image13.jpg',
  },
  {
    id: '14',
    title: "Tet Rouge Resort",
    description: 'An eco-friendly resort with stunning views at La Pointe, Choiseul.',
    imageUrl: 'https://example.com/image14.jpg',
  },
  {
    id: '15',
    title: "Fond Doux Eco Resort",
    description: 'An eco-friendly resort nestled in the heart of Fond Doux, Soufriere.',
    imageUrl: 'https://example.com/image15.jpg',
  },
  {
    id: '16',
    title: "Glamity's Bar",
    description: 'A popular local restaurant and bar located in Odsan, Castries.',
    imageUrl: 'https://example.com/image16.jpg',
  },
  {
    id: '17',
    title: "Cinderella's Slipper Cliffs",
    description: 'Beautiful cliffs located in Ciceron, Castries.',
    imageUrl: 'https://example.com/image17.jpg',
  },
  {
    id: '18',
    title: "Mini Marigot Bay",
    description: 'A smaller, picturesque bay with scenic cliffs in Marigot, Castries.',
    imageUrl: 'https://example.com/image18.jpg',
  },
  {
    id: '19',
    title: "Soley Kouche",
    description: 'A quaint restaurant in Delcer, Choiseul offering local cuisine.',
    imageUrl: 'https://example.com/image19.jpg',
  },
  {
    id: '20',
    title: "The Lookout",
    description: 'A scenic lookout point in Morne Fortune, Castries.',
    imageUrl: 'https://example.com/image20.jpg',
  },
  {
    id: '21',
    title: "The Cliff",
    description: 'A cliff with a view of the Caribbean Sea in Labrelotte Bay, Castries.',
    imageUrl: 'https://example.com/image21.jpg',
  },
  {
    id: '22',
    title: "The Beach",
    description: 'A beautiful beach located in Marigot Bay, Castries.',
    imageUrl: 'https://example.com/image22.jpg',
  },
  {
    id: '23',
    title: "The Pitons",
    description: 'The iconic twin peaks located in Soufriere.',
    imageUrl: 'https://example.com/image23.jpg',
  },
  {
    id: '24',
    title: "The Waterfall",
    description: 'A picturesque waterfall located in Tete Morne, Choiseul.',
    imageUrl: 'https://example.com/image24.jpg',
  },
  {
    id: '25',
    title: "The Lighthouse",
    description: 'A historic lighthouse located in Vieux Fort.',
    imageUrl: 'https://example.com/image25.jpg',
  },
  {
    id: '26',
    title: "The Fort",
    description: 'A historic fort located in Vigie, Castries.',
    imageUrl: 'https://example.com/image26.jpg',
  },
  {
    id: '27',
    title: "The Market",
    description: 'A local market located in Castries.',
    imageUrl: 'https://example.com/image27.jpg',
  },
  {
    id: '28',
    title: "The Garden",
    description: 'A botanical garden located in Soufriere.',
    imageUrl: 'https://example.com/image28.jpg',
  },
  {
    id: '29',
    title: "The Park",
    description: 'A recreational park located in Vieux Fort.',
    imageUrl: 'https://example.com/image29.jpg',
  },
  {
    id: '30',
    title: "The Beach",
    description: 'A popular beach located in Laborie.',
    imageUrl: 'https://example.com/image30.jpg',
  },
];

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleLocations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LocationCard
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            onPress={() => console.log(`Selected ${item.title}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default HomeScreen;
