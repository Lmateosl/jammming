let clientId = '2d0112d6329048f1b93f006a4909ac1d';
let tokenAcces;
const clientSecret = '69a6a6a11313431b9ae6e4ec8b6e4c90';
const redirectUri = 'http://localhost:3000/';

export async function get(song) {
    try {
      const tokenEndpoint = 'https://accounts.spotify.com/api/token';
      const token = btoa(`${clientId}:${clientSecret}`);
  
      const tokenResponse = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${token}`
        },
        body: 'grant_type=client_credentials'
      });
  
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
  
      const searchEndpoint = 'https://api.spotify.com/v1/search';
      const query = song;
      const searchType = 'track';
  
      const searchResponse = await fetch(`${searchEndpoint}?q=${query}&type=${searchType}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      const searchData = await searchResponse.json();
      return searchData;
    } catch (error) {
      console.error('Error:', error);
    }
}

export async function post(listName, canciones, code) {
  try {
    const authToken = await fetchAccessToken(code);
    clientId = await fetchUserId();
    const response = await fetch(`https://api.spotify.com/v1/users/${clientId}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: listName,
        description: 'Jammming List',
        public: false
      })
    });

    const data = await response.json();
    const playlistId = data.id;

    const listCreated = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenAcces}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: canciones
      })
    });

    const finalResponse = await listCreated.json();
    return finalResponse;

  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchAccessToken(code) {
  const token = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + token
    },
    body: new URLSearchParams({
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': redirectUri
    })
  });

  if (response.ok) {
    const data = await response.json();
    tokenAcces = data.access_token; // Aquí actualizamos la variable tokenAcces con el nuevo token
    return data.access_token;
  } else {
    // Manejo de errores si la respuesta no es exitosa
    const errorData = await response.json();
    throw new Error(`API responded with status ${response.status}: ${errorData.error_description}`);
  }
}

async function fetchUserId() {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${tokenAcces}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data.id; // Retorna el ID de usuario de Spotify
  } else {
    // Manejo de errores si la respuesta no es exitosa
    const errorData = await response.json();
    throw new Error(`API responded with status ${response.status}: ${errorData.error_description}`);
  }
}

export function auth() {
  const scope = 'playlist-modify-private playlist-modify-public';
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;
}
