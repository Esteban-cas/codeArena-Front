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
        <div class="container">
            <div class="terminal_toolbar">
                <div class="butt">
                <button class="btn btn-color"></button>
                <button class="btn"></button>
                <button class="btn"></button>
                </div>
                <p class="user">codeArena reto: ${el.difficulty}</p>
                <div class="add_tab">+</div>
            </div>
            <div class="terminal_body">
                <div class="terminal_prompt">
                    <span class="terminal_user"> Reto:</span>
                    <span class="terminal_location"> ${el.title}</span><br>
                    <span class="terminal_user"> Descripción:</span>
                    <span class="terminal_location"> ${el.description}</span><br>
                    <span class="terminal_user"> Categoría:</span>
                    <span class="terminal_location"> ${el.category}</span><br><br>
                </div>
                <div class="terminal_output">
                    <pre class="output_text">Welcome to Terminal</pre>
                </div>
                <div class="terminal_input">
                    <input placeholder="Type your answer..." class="input_text" type="text" data-id="${el._id}" />
                    <button class="submit-btn">Enviar</button>
                    <p class="feedback escondido"></p>
                </div>
            </div>
        </div>
        `
      container.insertAdjacentHTML('beforeend', card)
    })

    setTimeout(() => {
      document.querySelectorAll('.submit-btn').forEach((btn, index) => {
        btn.addEventListener('click', async () => {
          const input = btn.previousElementSibling
          const challengeId = input.getAttribute('data-id')
          const submittedAnswer = input.value.trim()
          const feedback = btn.nextElementSibling

          const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
          const token = user.token

          if (!submittedAnswer || !token) {
            feedback.textContent = 'Debe ingresar una respuesta válida y estar logueado.'
            feedback.classList.remove('escondido')
            return
          }

          try {
            const response = await fetch('https://codearena-back.onrender.com/api/submissions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ challengeId, submittedAnswer })
            })

            const result = await response.json()

            if (!response.ok) {
              feedback.textContent = result.message || 'Error al enviar la respuesta'
              feedback.style.color = 'red'
            } else {
              feedback.textContent = result.result
              feedback.style.color = result.isCorrect ? 'lightgreen' : 'orange'
            }

            feedback.classList.remove('escondido')
          } catch (err) {
            feedback.textContent = 'Error de conexión.'
            feedback.style.color = 'red'
            feedback.classList.remove('escondido')
          }
        })
      })
    }, 100)
  })

  .catch(err => {
    console.error('Error fetching the data', err)

    container.innerHTML = `
         <p style="color:red;">Something went wrong, try again later </p> 
        `
  })
