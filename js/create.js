const apiUrl = 'https://codearena-back.onrender.com/api/challenges/'
const evento = document.getElementById('createForm')

evento.addEventListener('submit', async (e) => {
  e.preventDefault()

  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const token = user.token

  // Capturar valores del formulario
  const title = document.getElementById('titulo').value
  const description = document.getElementById('descripcion').value
  const difficulty = document.getElementById('dificultad').value
  const category = document.getElementById('categoria').value
  const expectedOutput = document.getElementById('respuesta').value

  const payload = {
    title,
    description,
    difficulty,
    category,
    expectedOutput
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Error al crear el reto')
    }

    console.log('Challenge created successfully:', data)
    alert('Reto creado exitosamente')
    evento.reset() // Limpia el formulario
  } catch (err) {
    console.error('Error creating challenge:', err)
  }
})
