import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { View, Text, StatusBar } from 'react-native';
import Dashboard from './src/screens/Dashboard';
import { authenticateSpotify } from './src/services/authService';
import { theme } from './src/styles/theme';

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

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
      text: theme.colors.text,
      primary: theme.colors.primary,
      card: theme.colors.card,
    },
  };

  if (authError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.text }}>{authError}</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.text }}>Autenticazione in corso...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <NavigationContainer theme={MyTheme}>
        <Dashboard />
      </NavigationContainer>
    </>
  );
};

export default App;
