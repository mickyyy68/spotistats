import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getTopAlbums } from '../api/spotifyApi';
import AlbumCard from '../components/AlbumCard';
import TimeRangeSelector from '../components/TimeRangeSelector';

interface Album {
    id: string;
    name: string;
    imageUrl: string | null;
    artist: string;
}

interface AlbumsPageProps {
    timeRange: string;
    setTimeRange: (timeRange: string) => void;
}

const AlbumsPage: React.FC<AlbumsPageProps> = ({ timeRange, setTimeRange }) => {
  const [topAlbums, setTopAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopAlbums(timeRange);
  }, [timeRange]);

  const fetchTopAlbums = async (selectedTimeRange: string) => {
    setLoading(true);
    try {
      const albums = await getTopAlbums(selectedTimeRange);
      setTopAlbums(albums);
    } catch (error) {
      console.error('Errore nel recupero degli album:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderAlbumItem = ({ item, index }: { item: Album; index: number }) => (
    <AlbumCard title={item.name} artist={item.artist} imageUrl={item.imageUrl} rank={index + 1} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I tuoi migliori album</Text>
      <TimeRangeSelector onSelectTimeRange={setTimeRange} selectedTimeRange={timeRange} />
      {loading ? (
        <Text style={styles.loadingText}>Caricamento...</Text>
      ) : (
        <FlatList
          data={topAlbums}
          renderItem={renderAlbumItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AlbumsPage;
