export default {
  cartLength (state) {
    let length = 0
    state.cart.forEach(cartItem => {
      cartItem.forEach(item => {
        length++
      })
    })
    return length
  }
}