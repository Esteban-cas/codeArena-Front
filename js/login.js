const mensajeError = document.getElementsByClassName('error')[0]
const loginForm = document.getElementById('login-form')

if (loginForm) {
  if (typeof window === 'undefined') {
    console.error('Este archivo está siendo ejecutado fuera del navegador.')
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = e.target.querySelector('[name="email"]').value
    const password = e.target.querySelector('[name="password"]').value

    try {
      const res = await fetch('https://codearena-back.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const resJson = await res.json()

      if (!res.ok) {
        mensajeError.textContent = resJson.message || 'Error al iniciar sesión'
        mensajeError.classList.remove('escondido')
        return
      }

      // Guardar token y redirigir
      if (resJson.usuario && resJson.token) {
        const user = {
          ...resJson.usuario,
          token: resJson.token
        }
        localStorage.setItem('currentUser', JSON.stringify(user))
      }

      if (resJson.redirect) {
        window.location.href = resJson.redirect
      }
    } catch (error) {
      mensajeError.textContent = 'Error de red o del servidor'
      mensajeError.classList.remove('escondido')
    }
  })
}
