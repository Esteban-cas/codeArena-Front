import { renderEditForm } from './put.js'
const apiUrl = 'https://codearena-back.onrender.com/api/challenges/'
const container = document.getElementById('objetivos')

fetch(apiUrl)
  .then(data => {
    if (!data.ok) {
      throw new Error('Network response was not ok')
    }

    return data.json()
  })
  .then(res => {
    console.log('Challenges fetched successfully:', res)

    res.challenges.forEach(el => {
      const card = `
         <div class="container" data-id="${el._id}">
            <div class="terminal_toolbar">
              <div class="butt">
                <button class="btn btn-color"></button>
                <button class="btn"></button>
                <button class="btn"></button>
              </div>
              <p class="user">codeArena reto: ${el.difficulty}</p>
              <div class="add_tab">+</div>
            </div>
            <form class="terminal_form">
              <div class="terminal_body">

              <div class="terminal_prompt">
                  <label class="terminal_user"> Reto: <input type="text" name="title" id="titulo" value="${el.title}"></label><br>

                  <label class="terminal_user"> Descripción: <input type="text" name="description" id="descripcion" value="${el.description}"></label><br>

                  <label class="terminal_user"> Dificultad: <input type="text" name="difficulty" id="dificultad" value="${el.difficulty}"></label><br>

                  <label class="terminal_user"> Categoría: <input type="text" name="category" id="categoria" value="${el.category}"></label><br>

                  <label class="terminal_user"> Respuesta: <input type="text" name="answer" id="respuesta" value="${el.expectedOutput}"></label><br>                
                  </div>

                  <div class="terminal_output">
                      <pre class="output_text">Welcome to Terminal</pre>
                  </div>
                  <div class="terminal_input">
                      <button class="delete-btn" type="button">Delete</button>
                      <button class="submit-btn" type="submit">Update</button>
                  </div>
              </div>
            </form>
          </div>
        `
      container.insertAdjacentHTML('beforeend', card)

      const currentForm = container.querySelector('.container:last-child .terminal_form')
      renderEditForm(el, currentForm)
    })
  })
  .catch(err => {
    console.error('Error fetching the data', err)

    container.innerHTML = `
         <p style="color:red;">Something went wrong, try again later </p> 
        `
  })

container.addEventListener('click', async (e) => {
  const deleteBtn = e.target.closest('.delete-btn')
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const token = user.token

  if (deleteBtn) {
    const challengeCard = deleteBtn.closest('.container')
    const challengeId = challengeCard.getAttribute('data-id')

    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este reto? Esta acción no se puede deshacer.')
    if (!confirmed) return

    try {
      const res = await fetch(`${apiUrl}${challengeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      } else {
      // Puedes poner una animación de "Eliminado ✅" o simplemente:
        challengeCard.remove()
      }
    } catch (error) {
      console.error('Error deleting challenge:', error)
    }
  }
})
