export default {

  // 根据负载的数组判断商品所在店家是否已在购物车，如果是则加到所在店中盒子中，若不是单独增加
  addGoods (state, payload) {
    payload.goodsList.push(payload.goods)
    payload.goodsList.length === 1 && state.cart.push(payload.goodsList)
  },

  // 删除商品
  deleteGoods (state) {
    const cart = state.cart
    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < cart[i].length; j++) {
        if (cart[i][j].isChecked === true) {
          cart[i].splice(j, 1)
          j-- // 这里的减是因为如果只删除的话，数组长度将会响应减少导致后续元素可能无法遍历到
        }
      }
      // 若某个店铺商品为空则删除
      cart[i].length === 0 && state.cart.splice(state.cart.indexOf(cart[i]), 1) && i--
    }
  },

  // 购买数量增加
  addBuyCount (state, item) {
    item.buyCount++
  },

  // 购买数量减少
  subBuyCount (state, item) {
    item.buyCount--
  },

  // 更改是否选中状态
  changeIsChecked (state, item) {
    item.isChecked = !item.isChecked
  },

  // 选中商品
  checked (state, item) {
    item.isChecked = true
  },

  // 取消选中商品
  unChecked (state, item) {
    item.isChecked = false
  },

  // 修改商品信息
  goodsInfoChange (state, payload) {
    payload.oldGoods.size = payload.newGoods.size
    payload.oldGoods.style = payload.newGoods.style
    payload.oldGoods.img = payload.newGoods.img
  }

}