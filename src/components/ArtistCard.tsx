import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

// Ottiene la larghezza dello schermo e calcola la larghezza della card
const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 30; // 2 card per riga con un po' di margine

interface CardProps {
  title: string;
  imageUrl: string | null;
  rank: number;
}

const ArtistCard: React.FC<CardProps> = ({ title, imageUrl, rank }) => {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>{rank}</Text>
      </View>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>{title[0]}</Text>
        </View>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.cardTitle} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: cardWidth, // Immagine quadrata
  },
  titleContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  placeholderImage: {
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  rankContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  rankText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ArtistCard;
