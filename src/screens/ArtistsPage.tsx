import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
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
  const [numColumns, setNumColumns] = useState(2);

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

  const screenWidth = Dimensions.get('window').width;
  const padding = 16;
  const spacing = 8;
  const availableWidth = screenWidth - (padding * 2) - (spacing * (numColumns - 1));
  const cardWidth = availableWidth / numColumns;

  const renderArtistItem = ({ item, index }: { item: Artist; index: number }) => (
    <View style={{ width: cardWidth, marginBottom: spacing, paddingHorizontal: spacing / 2 }}>
      <ArtistCard 
        title={item.name} 
        imageUrl={item.imageUrl} 
        rank={index + 1}
        width={cardWidth - spacing}
      />
    </View>
  );

  const changeGridLayout = (columns: number) => {
    setNumColumns(columns);
  };

  // Componente personalizzato per l'icona della griglia
  const GridIcon = ({ columns, isSelected }: { columns: number, isSelected: boolean }) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 24, height: 24 }}>
      {[...Array(columns * columns)].map((_, index) => (
        <View
          key={index}
          style={{
            width: columns === 2 ? 10 : 5,
            height: columns === 2 ? 10 : 5,
            margin: columns === 2 ? 1 : 0.5,
            backgroundColor: isSelected ? 'white' : theme.colors.text,
          }}
        />
      ))}
    </View>
  );

  const renderGridButton = (columns: number) => (
    <TouchableOpacity
      style={[
        styles.gridButton,
        numColumns === columns ? styles.selectedGridButton : styles.unselectedGridButton
      ]}
      onPress={() => changeGridLayout(columns)}
    >
      <GridIcon columns={columns} isSelected={numColumns === columns} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I tuoi migliori artisti</Text>
      <TimeRangeSelector onSelectTimeRange={setTimeRange} selectedTimeRange={timeRange} />
      <View style={styles.gridButtons}>
        {renderGridButton(2)}
        {renderGridButton(4)}
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Caricamento...</Text>
      ) : (
        <FlatList
          data={topArtists}
          renderItem={renderArtistItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          key={`grid-${numColumns}`}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
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
  loadingText: {
    fontSize: theme.fontSizes.medium,
    textAlign: 'center',
    marginTop: 20,
    color: theme.colors.text,
  },
  gridButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  gridButton: {
    padding: 10,
    borderRadius: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGridButton: {
    backgroundColor: theme.colors.primary,
  },
  unselectedGridButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.text,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ArtistsPage;
