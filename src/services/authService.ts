import * as AppAuth from 'react-native-app-auth';
import { setAccessToken } from '../api/spotifyApi';

const spotifyAuthConfig: AppAuth.AuthConfiguration = {
  clientId: 'b559e3b86e204da68ad7adcf03863ced',
  redirectUrl: 'com.spotistats:/oauth',
  scopes: ['user-top-read'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

export const authenticateSpotify = async () => {
  console.log('Tentativo di autenticazione con Spotify');
  try {
    const result = await AppAuth.authorize(spotifyAuthConfig);
    console.log('Risultato autenticazione:', result);
    setAccessToken(result.accessToken);
    return result.accessToken;
  } catch (error) {
    console.error('Errore dettagliato durante l\'autenticazione con Spotify:', JSON.stringify(error, null, 2));
    throw error;
  }
};

export const authenticate = async () => {
  // Implementa qui la logica di autenticazione con Spotify
  // Questo è solo un esempio, dovrai implementare la vera logica di autenticazione
  const fakeToken = 'fake_token_for_testing';
  setAccessToken(fakeToken);
  
  // Simula un ritardo nell'autenticazione
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Se l'autenticazione fallisce, lancia un errore
  // throw new Error('Autenticazione fallita');
};
