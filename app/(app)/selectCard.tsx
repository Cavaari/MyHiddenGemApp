import React from 'react';
import { Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

const SelectCard = () => {
    const { title, description, imageUrl } = useGlobalSearchParams();
    const validImageUrl = typeof imageUrl === 'string' ? imageUrl : undefined;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {validImageUrl ? (
                <Image source={{ uri: validImageUrl }} style={styles.image} />
            ) : (
                <Text style={styles.error}>Image not available</Text>
            )}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
    },
    error: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default SelectCard;
