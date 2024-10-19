// Importazione delle dipendenze necessarie
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ArtistsPage from './ArtistsPage';
import AlbumsPage from './AlbumsPage';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('medium_term');

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Artisti') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Album') {
            iconName = focused ? 'disc' : 'disc-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Artisti">
        {() => <ArtistsPage timeRange={timeRange} setTimeRange={setTimeRange} />}
      </Tab.Screen>
      <Tab.Screen name="Album">
        {() => <AlbumsPage timeRange={timeRange} setTimeRange={setTimeRange} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Dashboard;
