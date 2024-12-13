// app/customHeader.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Platform, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSearch } from '../../providers/searchContext';

const CustomHeader: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [isSearchActive, setIsSearchActive] = React.useState(false);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setSearchQuery('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/gem-logo-2.png')} style={styles.logo} />
        {isSearchActive ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              placeholderTextColor="#fff"
              value={searchQuery}
              onChangeText={setSearchQuery}
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
    paddingBottom: 10,
    paddingHorizontal: 14,
    backgroundColor: '#FF7B00',
  },
  logo: {
    width: 50,  // Adjusted size for the logo
    height: 50, // Adjusted size for the logo
    resizeMode: 'contain',
    marginRight: 16,
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
