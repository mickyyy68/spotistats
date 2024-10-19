import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


interface TimeRangeSelectorProps {
  onSelectTimeRange: (timeRange: string) => void;
  selectedTimeRange: string;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onSelectTimeRange, selectedTimeRange }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, selectedTimeRange === 'short_term' && styles.activeButton]}
        onPress={() => onSelectTimeRange('short_term')}
      >
        <Text style={styles.buttonText}>Ultimo mese</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedTimeRange === 'medium_term' && styles.activeButton]}
        onPress={() => onSelectTimeRange('medium_term')}
      >
        <Text style={styles.buttonText}>Ultimi 6 mesi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedTimeRange === 'long_term' && styles.activeButton]}
        onPress={() => onSelectTimeRange('long_term')}
      >
        <Text style={styles.buttonText}>Ultimo anno</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#168d40',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TimeRangeSelector;
