// URL del backend
const STORE_API = 'http://localhost:5000/api/store'
// TODO:
// const PAYMENT_API = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

// Elementos del formulario
const paymentInput = document.querySelector('#payment')
const emailInput = document.querySelector('#email')
const nameInput = document.querySelector('#name')
const addressInput = document.querySelector('#address')
const phoneInput = document.querySelector('#phone')
const deliveryAddressInput = document.querySelector('#delivery-address')
const provinceSelect = document.querySelector('#province')
const additionalPhoneInput = document.querySelector('#additional-phone')
const additionalNameInput = document.querySelector('#additional-name')

// nombre de la tienda de la URL
// const storeName = window.location.search.split('=')[1]
const storeName = 'store-1'

const getStoreProvince = async () => {
  try {
    const res = await axios.get(`${STORE_API}/${storeName}`)
    const province = res.data.province
    return province
  } catch (error) {
    console.error(error)
  }
}

function calculateTotal() {
  const products = JSON.parse(localStorage.getItem('products')) || []
  let total = 0

  for (let product of products) {
    total += parseFloat(product.price.replace(/[^\d]/g, '')) * product.quantity
  }

  return total.toFixed(2)
}

const fillFields = async () => {
  // payment
  const total = calculateTotal()
  console.log(total)
  paymentInput.value = total

  // email
  const userInfoEmail = JSON.parse(localStorage.getItem('userInfo')).email
  console.log(userInfoEmail)
  emailInput.value = userInfoEmail

  // province
  const province = await getStoreProvince()
  console.log(province)
  provinceSelect.value = province
}

async function handlePayment(e) {
  e.preventDefault()

  const paymentData = {
    email: emailInput.value,
    name: nameInput.value,
    address: addressInput.value,
    phone: phoneInput.value,
    deliveryAddress: deliveryAddressInput.value,
    province: provinceSelect.value,
    additionalPhone: additionalPhoneInput.value,
    additionalName: additionalNameInput.value,
  }

  try {
    // await axios.post(PAYMENT_API, paymentData)
    console.log(paymentData)
    alert('Pago realizado con éxito')
    // redirigir al usuario a otra página
  } catch (error) {
    console.error(error)
    alert('Error al realizar el pago')
  }
}

document.addEventListener('DOMContentLoaded', fillFields)
document
  .querySelector('#billing-form')
  .addEventListener('submit', handlePayment)
