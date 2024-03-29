function sendAuthenticatedRequest(url, options) {
  // Zugriffstoken aus dem lokalen Speicher holen
  const accessToken = localStorage.getItem('accessToken');

  // Wenn kein Token vorhanden ist, Log-Ausgabe und stoppen Sie hier
  if (!accessToken) {
    console.error('Kein Zugriffstoken vorhanden');
    return;
  }

  // Standard-Header und Autorisierungsheader setzen
  const headers = {
    ...options.headers,
    'Authorization': 'Bearer ' + accessToken
  };

  // Überprüfen, ob der Autorisierungsheader erfolgreich hinzugefügt wurde
  if (headers['Authorization']) {
    console.log('Authorization Header wurde erfolgreich hinzugefügt: ', headers['Authorization']);
  } else {
    console.error('Fehler beim Hinzufügen des Authorization Headers');
  }

  console.log('Sending request:', { url, options, headers });

  // Anforderung senden
  return fetch(url, { ...options, headers })
    .then(response => {
      if (response.ok) {
        console.log('Request succeeded:', { url, options, headers });
        return response.json();
      } else {
        console.error('Request failed:', { url, options, headers });
        throw new Error('Error: ' + response.status);
      }
    })
    .catch(error => {
      console.error('Request error:', { url, options, headers, error });
    });
}

document.getElementById('logoutButton').addEventListener('click', function() {
  // Fetch options for a DELETE request
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: refreshToken // replace 'refreshToken' with the actual refresh token
    })
  };

  // Make the DELETE request
  fetch('/logout', options)
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      // If the logout is successful, redirect to home page
      window.location.href = '/';
    })
    .catch(error => {
      console.log('Error:', error);
    });
});