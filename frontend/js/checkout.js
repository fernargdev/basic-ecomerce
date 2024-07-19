function isUserAuthenticated() {
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  return userInfo !== null
}

document.addEventListener('DOMContentLoaded', function (e) {
  const checkoutList = document.querySelector('#checkout-list')
  const totalPriceContainer = document.querySelector('#total-price')
  const lsContent = JSON.parse(localStorage.getItem('products')) || []
  let productMarkup = ''
  let total = 0

  for (let product of lsContent) {
    productMarkup += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" width="120">
                <p>${product.name}</p>
                <p>${product.price}</p>
                <p>${product.quantity}</p>
            </div>
        `
    total += parseFloat(product.price.replace(/[^\d]/g, '')) * product.quantity
  }

  checkoutList.innerHTML = productMarkup
  totalPriceContainer.innerHTML = `Total: $${total.toFixed(2)}`
})

document.querySelector('#pay-now-btn').addEventListener('click', function (e) {
  if (!isUserAuthenticated()) {
    if (
      window.confirm(
        'Debes iniciar sesión para pagar su orden. Desea autenticarse'
      )
    ) {
      window.location.href = 'auth.html'
    }
  } else {
    alert('Autenticado')
  }
})
