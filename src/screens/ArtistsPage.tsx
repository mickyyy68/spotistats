import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getTopArtists } from '../api/spotifyApi';
import ArtistCard from '../components/ArtistCard';
import TimeRangeSelector from '../components/TimeRangeSelector';
import { theme } from '../styles/theme';

interface Artist {
    id: string;
    name: string;
    imageUrl: string | null;
}

interface ArtistsPageProps {
    timeRange: string;
    setTimeRange: (timeRange: string) => void;
}

const ArtistsPage: React.FC<ArtistsPageProps> = ({ timeRange, setTimeRange }) => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopArtists(timeRange);
  }, [timeRange]);

  const fetchTopArtists = async (selectedTimeRange: string) => {
    setLoading(true);
    try {
      const artists = await getTopArtists(selectedTimeRange);
      setTopArtists(artists);
    } catch (error) {
      console.error('Errore nel recupero degli artisti:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderArtistItem = ({ item, index }: { item: Artist; index: number }) => (
    <ArtistCard title={item.name} imageUrl={item.imageUrl} rank={index + 1} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I tuoi migliori artisti</Text>
      <TimeRangeSelector onSelectTimeRange={setTimeRange} selectedTimeRange={timeRange} />
      {loading ? (
        <Text style={styles.loadingText}>Caricamento...</Text>
      ) : (
        <FlatList
          data={topArtists}
          renderItem={renderArtistItem}
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
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: theme.colors.text,
  },
  row: {
    justifyContent: 'space-between',
  },
  loadingText: {
    fontSize: theme.fontSizes.medium,
    textAlign: 'center',
    marginTop: 20,
    color: theme.colors.text,
  },
});

export default ArtistsPage;
