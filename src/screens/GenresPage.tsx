import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import Svg, { G, Path, Text as SVGText } from 'react-native-svg';
import { getTopGenres } from '../api/spotifyApi';
import TimeRangeSelector from '../components/TimeRangeSelector';
import { theme } from '../styles/theme';

interface GenresPageProps {
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
}

const GenresPage: React.FC<GenresPageProps> = ({ timeRange, setTimeRange }) => {
  const [topGenres, setTopGenres] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopGenres(timeRange);
  }, [timeRange]);

  const fetchTopGenres = async (selectedTimeRange: string) => {
    setLoading(true);
    try {
      const genres = await getTopGenres(selectedTimeRange);
      setTopGenres(genres[selectedTimeRange]);
    } catch (error) {
      console.error('Errore nel recupero dei generi:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalCount = topGenres.reduce((sum, genre) => sum + genre.count, 0);

  const pieData = topGenres.map((genre, index) => ({
    value: genre.count,
    color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
    name: genre.name,
    percentage: ((genre.count / totalCount) * 100).toFixed(1),
  }));

  const screenWidth = Dimensions.get('window').width;
  const size = screenWidth - 40;
  const radius = size / 2;

  const PieChart = () => {
    let total = 0;
    const slices = pieData.map((slice, index) => {
      const sliceAngle = (slice.value / totalCount) * 2 * Math.PI;
      const startAngle = total;
      total += sliceAngle;

      const x1 = radius * Math.cos(startAngle);
      const y1 = radius * Math.sin(startAngle);
      const x2 = radius * Math.cos(startAngle + sliceAngle);
      const y2 = radius * Math.sin(startAngle + sliceAngle);

      const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

      const pathData = [
        `M ${radius} ${radius}`,
        `L ${radius + x1} ${radius + y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${radius + x2} ${radius + y2}`,
        'Z'
      ].join(' ');

      const labelAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.6;
      const labelX = radius + labelRadius * Math.cos(labelAngle);
      const labelY = radius + labelRadius * Math.sin(labelAngle);

      return (
        <G key={index}>
          <Path d={pathData} fill={slice.color} />
          <SVGText
            x={labelX}
            y={labelY}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={10}
            fontWeight="bold"
          >
            {slice.percentage}%
          </SVGText>
          <SVGText
            x={labelX}
            y={labelY + 15}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={8}
          >
            {slice.name}
          </SVGText>
        </G>
      );
    });

    return (
      <Svg height={size} width={size}>
        {slices}
      </Svg>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>I tuoi generi preferiti</Text>
        <TimeRangeSelector onSelectTimeRange={setTimeRange} selectedTimeRange={timeRange} />
        {loading ? (
          <Text style={styles.loadingText}>Caricamento...</Text>
        ) : (
          <>
            <View style={styles.chartContainer}>
              <PieChart />
            </View>
            <View style={styles.legendContainer}>
              {pieData.map((data, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: data.color }]} />
                  <Text style={styles.legendText}>{`${data.name} (${data.percentage}%)`}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
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
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  legendContainer: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  legendText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.small,
  },
});

export default GenresPage;
