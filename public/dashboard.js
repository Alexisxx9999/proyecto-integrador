document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You are not authenticated. Redirecting to login page.');
    window.location.href = 'login.html'; // Redirige a la página de inicio de sesión si no hay token
  }

  // Si es necesario, puedes realizar una solicitud al servidor para verificar la validez del token
  fetch('http://localhost:3000/api/v1/gastos', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Token is not valid');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Access granted:', data);
      // Aquí puedes mostrar los datos protegidos en el dashboard
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Invalid token. Redirecting to login page.');
      window.location.href = 'login.html';
    });
});
