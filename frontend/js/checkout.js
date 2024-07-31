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
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                <p> 
                <span class="p-name">Nombre:</span>
                ${product.name}
                </p>
                <p>
                <span class="p-price">Precio:</span>
                ${product.price}
                </p>
                <p>
                 <span class="p-quantity">Cantidad:</span>
                 ${product.quantity}
                </p>
                </div>
            </div>
        `
    // total += parseFloat(product.price.replace(/[^\d]/g, '')) * product.quantity

    let num = product.price
    num = num.replace(/[^0-9.]/g, '') // Mantén los puntos decimales
    num = parseFloat(num)
    total += num * product.quantity
  }

  checkoutList.innerHTML = productMarkup
  totalPriceContainer.innerHTML = `$${total.toFixed(2)}`
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
    window.location.href = 'bill.html'
  }
})
