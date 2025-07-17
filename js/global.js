window.onload = async () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const token = user.token

  const res = await fetch('https://codearena-back.onrender.com/api/submissions', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()
  const submissions = data.submissions

  const aciertos = submissions.filter(el => el.isCorrect === true)
  const errores = submissions.filter(el => el.isCorrect === false)

  document.getElementById('totalAciertos').textContent = aciertos.length
  document.getElementById('totalErrores').textContent = errores.length
}
