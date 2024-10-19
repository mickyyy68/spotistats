import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 30;

interface CardProps {
  title: string;
  artist: string;
  imageUrl: string | null;
  rank: number;
}

const AlbumCard: React.FC<CardProps> = ({ title, artist, imageUrl, rank }) => {
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
        <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
        <Text style={styles.artistName} numberOfLines={1} ellipsizeMode="tail">{artist}</Text>
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
    height: cardWidth,
  },
  titleContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  artistName: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 4,
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

export default AlbumCard;
