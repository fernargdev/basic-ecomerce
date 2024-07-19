const USERS_URL = 'http://localhost:5000/api/users'

const loginForm = document.querySelector('#login-form')
const registerForm = document.querySelector('#register-form')
const loginEmail = document.querySelector('#login-email')
const loginPassword = document.querySelector('#login-password')
const registerUsername = document.querySelector('#register-username')
const registerEmail = document.querySelector('#register-email')
const registerPassword = document.querySelector('#register-password')

async function handleLogin(e) {
  e.preventDefault()
  try {
    const email = loginEmail.value
    const password = loginPassword.value
    console.log(email)
    console.log(password)

    const response = await axios.post(`${USERS_URL}/login`, {
      email,
      password,
    })

    localStorage.setItem('userInfo', JSON.stringify(response.data))
    // window.location.href = 'store.html'
    console.log('Login satisfactorio')
  } catch (error) {
    console.error('Error en el Login:')
    console.error(error)
  }
}

async function handleRegister(e) {
  e.preventDefault()
  try {
    const username = registerUsername.value
    const email = registerEmail.value
    const password = registerPassword.value
    console.log(username)
    console.log(email)
    console.log(password)

    const response = await axios.post(`${USERS_URL}/register`, {
      //   username: registerUsername.value,
      //   email: registerEmail.value,
      //   password: registerPassword.value,
      username,
      email,
      password,
    })

    localStorage.setItem('userInfo', JSON.stringify(response.data))
    // window.location.href = 'store.html'
    console.log('Registro satisfactorio')
  } catch (error) {
    console.error('Error en el Registro:')
    console.error(error)
  }
}

loginForm.addEventListener('submit', handleLogin)
registerForm.addEventListener('submit', handleRegister)
