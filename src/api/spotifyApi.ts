// Importa la libreria axios per effettuare richieste HTTP
import axios from 'axios';

// URL di base per l'API di Spotify
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

// Crea un'istanza di axios configurata con l'URL di base di Spotify
const spotifyApi = axios.create({
  baseURL: SPOTIFY_API_BASE_URL,
});

// Funzione per impostare il token di accesso nell'header delle richieste
export const setAccessToken = (token: string) => {
  spotifyApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Funzione per ottenere i migliori artisti dell'utente
export const getTopArtists = async (timeRange: string) => {
  try {
    // Effettua una richiesta GET all'endpoint dei migliori artisti
    const response = await spotifyApi.get('/me/top/artists', {
      params: {
        time_range: timeRange, // Intervallo di tempo per la classifica
        limit: 20, // Numero massimo di artisti da recuperare
      },
    });
    // Mappa i dati degli artisti in un formato più semplice
    return response.data.items.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      imageUrl: artist.images && artist.images.length > 0 ? artist.images[0].url : null
    }));
  } catch (error) {
    // Gestisce e registra eventuali errori
    console.error('Errore nel recupero dei migliori artisti:', error);
    throw error;
  }
};

// Definizione dell'interfaccia per l'album
interface Album {
  id: string;
  name: string;
  imageUrl: string | null;
  artist: string;
}

// Funzione per ottenere i migliori album dell'utente
export const getTopAlbums = async (timeRange: string): Promise<Album[]> => {
  try {
    const response = await spotifyApi.get('/me/top/tracks', {
      params: {
        time_range: timeRange,
        limit: 20
      }
    });
    const albums = response.data.items.map((track: any) => ({
      id: track.album.id,
      name: track.album.name,
      imageUrl: track.album.images[0]?.url || null,
      artist: track.artists[0].name
    }));
    return albums;
  } catch (error) {
    console.error('Errore nel recupero degli album top:', error);
    throw error;
  }
};

// Esporta l'istanza configurata di axios per l'uso in altre parti dell'applicazione
export default spotifyApi;
