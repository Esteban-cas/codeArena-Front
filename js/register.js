const mensajeError = document.querySelector('.error')
const mensajeExito = document.querySelector('.success')

document.getElementById('register-form').addEventListener('submit', async e => {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value
  try {
    const res = await fetch('https://codearena-back.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    if (!res.ok) {
      mensajeError.textContent = data.message || 'Error al crear cuenta. Revisa que hayas agregado un correo valido o que la contraseña tenga más de 8 caracteres.'
      mensajeError.classList.remove('escondido')
      mensajeExito.classList.add('escondido')
      return
    }

    mensajeExito.textContent = data.message || 'Registro exitoso'
    mensajeExito.classList.remove('escondido')
    mensajeError.classList.add('escondido')
    if (data.redirect) setTimeout(() => location.href = data.redirect, 2000)
  } catch (error) {
    mensajeError.textContent = 'Error de red o del servidor'
    mensajeError.classList.remove('escondido')
    mensajeExito.classList.add('escondido')
  }
})
