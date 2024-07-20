// URL del backend
const USERS_URL = 'http://localhost:5000/api/users'
const PROVINCES_URL = 'http://localhost:5000/api/provinces' // Asegúrate de ajustar esta URL

// Elementos del formulario
const emailInput = document.querySelector('#email')
const nameInput = document.querySelector('#name')
const addressInput = document.querySelector('#address')
const phoneInput = document.querySelector('#phone')
const deliveryAddressInput = document.querySelector('#delivery-address')
const provinceSelect = document.querySelector('#province')
const additionalPhoneInput = document.querySelector('#additional-phone')
const additionalNameInput = document.querySelector('#additional-name')

// Rellena el formulario con la información del usuario
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
emailInput.value = userInfo.email

// Obtiene las provincias del backend y las añade al select
axios
  .get(PROVINCES_URL)
  .then((response) => {
    const provinces = response.data
    for (let province of provinces) {
      const option = document.createElement('option')
      option.value = province.id
      option.textContent = province.name
      provinceSelect.appendChild(option)
    }
  })
  .catch((error) => console.error(error))

// Añade un event listener al formulario para manejar el envío
document
  .querySelector('#billing-form')
  .addEventListener('submit', function (e) {
    e.preventDefault()
    // Aquí puedes manejar el envío del formulario
  })
