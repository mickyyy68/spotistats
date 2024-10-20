import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { getTopAlbums } from '../api/spotifyApi';
import AlbumCard from '../components/AlbumCard';
import TimeRangeSelector from '../components/TimeRangeSelector';
import { theme } from '../styles/theme';

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
  const [numColumns, setNumColumns] = useState(2);

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

  const screenWidth = Dimensions.get('window').width;
  const padding = 16; // Riduciamo il padding
  const spacing = 8; // Riduciamo lo spazio tra le colonne
  const availableWidth = screenWidth - (padding * 2) - (spacing * (numColumns - 1));
  const cardWidth = availableWidth / numColumns;

  const renderAlbumItem = ({ item, index }: { item: Album; index: number }) => (
    <View style={{ width: cardWidth, marginBottom: spacing, paddingHorizontal: spacing / 2 }}>
      <AlbumCard 
        title={item.name} 
        artist={item.artist} 
        imageUrl={item.imageUrl} 
        rank={index + 1}
        width={cardWidth - spacing}
      />
    </View>
  );

  const changeGridLayout = (columns: number) => {
    setNumColumns(columns);
  };

  const renderGridButton = (columns: number, label: string) => (
    <TouchableOpacity
      style={[
        styles.gridButton,
        numColumns === columns ? styles.selectedGridButton : styles.unselectedGridButton
      ]}
      onPress={() => changeGridLayout(columns)}
    >
      <Text style={[
        styles.gridButtonText,
        numColumns === columns ? styles.selectedGridButtonText : styles.unselectedGridButtonText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I tuoi migliori album</Text>
      <TimeRangeSelector onSelectTimeRange={setTimeRange} selectedTimeRange={timeRange} />
      <View style={styles.gridButtons}>
        {renderGridButton(2, '2 per riga')}
        {renderGridButton(4, '4 per riga')}
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Caricamento...</Text>
      ) : (
        <FlatList
          data={topAlbums}
          renderItem={renderAlbumItem}
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
  row: {
    justifyContent: 'space-between',
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
    width: '45%',
    alignItems: 'center',
  },
  selectedGridButton: {
    backgroundColor: theme.colors.primary,
  },
  unselectedGridButton: {
    backgroundColor: 'black',
  },
  gridButtonText: {
    fontSize: theme.fontSizes.small,
  },
  selectedGridButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  unselectedGridButtonText: {
    color: 'white',
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default AlbumsPage;
