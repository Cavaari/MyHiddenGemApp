import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomHeader = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    setSearchQuery(''); // Clear the input when toggling
  };

  return (
    <View style={styles.header}>
      <Image source={require('../../assets/images/gem-logo.png')} style={styles.logo} />
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
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF7B00',
  },
  logo: {
    width: 40,
    height: 40,
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
