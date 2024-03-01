export async function get(song) {
    try {
      const clientId = '2d0112d6329048f1b93f006a4909ac1d';
      const clientSecret = '69a6a6a11313431b9ae6e4ec8b6e4c90';
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
  