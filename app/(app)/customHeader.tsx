import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Platform, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomHeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ setSearchQuery, searchQuery }) => {
  const [isSearchActive, setIsSearchActive] = React.useState(false);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setSearchQuery(''); // Clear the search query
    }
  };

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text); // Update the search query
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/gem-logo.png')} style={styles.logo} />
        </View>

        {isSearchActive ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              placeholderTextColor="#fff"
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              autoFocus
            />
            <TouchableOpacity style={styles.clearIcon} onPress={handleSearchToggle}>
              <Icon name="times" style={styles.icon} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.iconContainer} onPress={handleSearchToggle}>
            <Icon name="search" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: '#FF7B00',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 1 : 8, // Adjust for iOS notch
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FF7B00',
  },
  logoContainer: {
    width: 45,  // Adjust the width to give more room for the logo
    height: 45, // Adjust the height accordingly
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',  // Change overflow to visible to avoid clipping
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',  // Keep the image proportionally scaled
  },
  iconContainer: {
    marginLeft: 'auto',
  },
  icon: {
    fontSize: 32,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
  },
  clearIcon: {
    marginLeft: 8,
  },
});

export default CustomHeader;
