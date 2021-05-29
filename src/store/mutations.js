export default {

  // 根据负载的数组判断商品所在店家是否已在购物车，如果是则加到所在店中盒子中，若不是单独增加
  addGoods (state, payload) {
    payload.goodsList.push(payload.goods)
    payload.goodsList.length === 1 && state.cart.push(payload.goodsList)
    // console.log('添加后为:', state.cart)
  },

  // 数量增加
  addNumber (state, payload) {
    payload.currentGoods.buyCount++
  },

  // 添加商品至待结算数组
  addReadyToSettle (state, item) {
    state.readyToSettle.push(item)
  },

  // 删除在待结算数组中的商品
  removeReadyToSettle (state, item) {
    const list = state.readyToSettle
    list.splice(list.indexOf(item), 1)
  },

  // 清空待结算中的商品
  clearReadyToSettle (state) {
    state.readyToSettle = []
  },

  // 购买数量增加
  addBuyCount (state, item) {
    item.buyCount++
  },

  // 购买数量减少
  subBuyCount (state, item) {
    item.buyCount--
  }
}