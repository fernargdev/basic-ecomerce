const USERS_URL = 'http://localhost:5000/api/users'

// login
const loginForm = document.querySelector('#login-form')
const loginEmail = document.querySelector('#login-email')
const loginPassword = document.querySelector('#login-password')

// register
const registerForm = document.querySelector('#register-form')
const registerUsername = document.querySelector('#register-username')
const registerEmail = document.querySelector('#register-email')
const registerPassword = document.querySelector('#register-password')

// logout
const logoutBtn = document.querySelector('#logout-btn')

async function handleLogout() {
  try {
    await axios.get(`${USERS_URL}/logout`)
    localStorage.removeItem('userInfo')
    //   window.location.href = 'login.html'; // Redirige al usuario a la página de inicio de sesión
    console.log('Logout satisfactorio')
  } catch (error) {
    console.error('Error en el Logout:')
    console.error(error)
  }
}

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
    console.log('Login satisfactorio')
    window.location.href = 'store.html'
  } catch (error) {
    console.error(`Error en el Login: ${error.response.data.message}`)
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
    console.log('Registro satisfactorio')
    window.location.href = 'store.html'
  } catch (error) {
    console.error('Error en el Registro:')
    console.error(error)
  }
}

loginForm.addEventListener('submit', handleLogin)
registerForm.addEventListener('submit', handleRegister)
logoutBtn.addEventListener('click', handleLogout)
