// Importazione delle dipendenze necessarie
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import ArtistsPage from './ArtistsPage';
import AlbumsPage from './AlbumsPage';
import { theme } from '../styles/theme';
import GenresPage from './GenresPage';

const Tab = createBottomTabNavigator();

const IconComponent = ({ name, color }: { name: string; color: string }) => {
  return <Text style={{ color, fontSize: 24 }}>{name === 'person' ? '👤' : name === 'disc' ? '💿' : '🎧'}</Text>;
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('medium_term');

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = route.name === 'Artisti' ? 'person' : route.name == 'Album' ? 'disc' : 'music';
          return <IconComponent name={iconName} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.card,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
      })}
    >
      <Tab.Screen name="Artisti">
        {() => <ArtistsPage timeRange={timeRange} setTimeRange={setTimeRange} />}
      </Tab.Screen>
      <Tab.Screen name="Album">
        {() => <AlbumsPage timeRange={timeRange} setTimeRange={setTimeRange} />}
      </Tab.Screen>
      <Tab.Screen name="Generi">
        {() => <GenresPage timeRange={timeRange} setTimeRange={setTimeRange} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Dashboard;
