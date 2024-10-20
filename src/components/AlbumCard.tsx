import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface AlbumCardProps {
  title: string;
  artist: string;
  imageUrl: string | null;
  rank: number;
  width: number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ title, artist, imageUrl, rank, width }) => {
  return (
    <View style={[styles.container, { width }]}>
      <Image source={{ uri: imageUrl || undefined }} style={[styles.image, { width: width - 10, height: width - 10 }]} />
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
      <Text numberOfLines={1} style={styles.artist}>{artist}</Text>
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>{rank}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 4,
    marginBottom: 5,
  },
  title: {
    fontSize: theme.fontSizes.small,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
  },
  artist: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  rankContainer: {
    position: 'absolute',
    top: 2,
    left: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.small,
  },
});

export default AlbumCard;
