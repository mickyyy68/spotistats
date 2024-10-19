import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import Dashboard from './src/screens/Dashboard';
import { authenticateSpotify } from './src/services/authService';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const performAuth = async () => {
      try {
        await authenticateSpotify();
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Errore durante l\'autenticazione:', error);
        setAuthError('Errore durante l\'autenticazione. Riprova più tardi.');
      }
    };

    performAuth();
  }, []);

  if (authError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{authError}</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Autenticazione in corso...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Dashboard />
    </NavigationContainer>
  );
};

export default App;
