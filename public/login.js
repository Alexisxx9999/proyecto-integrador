document
  .getElementById('login-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        contraseña: password, // Asegúrate de usar el mismo campo que en tu estrategia local
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token); // Almacena el token en el almacenamiento local
      alert('Login successful!');
      // Redirige a la página protegida o realiza alguna otra acción
      window.location.href = 'dashboard.html'; // Ejemplo de redirección a una página protegida
    } else {
      alert('Login failed. Please check your credentials and try again.');
    }
  });
