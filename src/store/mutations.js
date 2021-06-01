export default {

  // 根据负载的数组判断商品所在店家是否已在购物车，如果是则加到所在店中盒子中，若不是单独增加
  addGoods (state, payload) {
    payload.goodsList.push(payload.goods)
    payload.goodsList.length === 1 && state.cart.push(payload.goodsList)
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