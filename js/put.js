export function renderEditForm (challengeData, form) {
  const newHandler = async (e) => {
    e.preventDefault()
    console.log('[DEBUG] Se ejecutó el submit del formulario')

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const token = user.token

    const updatedChallenge = {
      title: form.querySelector('[name="title"]').value,
      description: form.querySelector('[name="description"]').value,
      difficulty: form.querySelector('[name="difficulty"]').value,
      category: form.querySelector('[name="category"]').value,
      expectedOutput: form.querySelector('[name="answer"]').value
    }

    try {
      const res = await fetch(`https://codearena-back.onrender.com/api/challenges/${challengeData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedChallenge)
      })

      const data = await res.json()
      console.log('Challenge updated successfully:', data)

      // ✅ Mostrar mensaje de éxito después del PUT
      let status = form.querySelector('.update-status')
      if (!status) {
        status = document.createElement('span')
        status.className = 'update-status'
        form.querySelector('.terminal_input').appendChild(status)
      }

      status.textContent = 'Actualizado ✅'
      status.style.color = 'lightgreen'

      setTimeout(() => {
        status.textContent = ''
      }, 2500)
    } catch (err) {
      console.error('Error updating challenge:', err)
    }
  }

  // Eliminar y volver a aplicar el event listener de submit
  form.removeEventListener('submit', form._submitHandler)
  form._submitHandler = newHandler
  form.addEventListener('submit', newHandler)
}
