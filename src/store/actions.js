export default {
  async addToCart ({ state, commit }, goods) {
    // 在已有的购物车列表中查找是否有同一家的商品
    const enterList = state.cart.find(item => item[0].shopName === goods.shopName)

    // 如果有则添加至同一家的商品列表中
    if (enterList) {
      // 判断是否是同种商品
      const currentGoods = enterList.find(item => item.size === goods.size && item.style === goods.style)
      if (currentGoods) {
        // 同一家同一种,数量+1
        commit('addBuyCount', currentGoods)
      } else {
        // 同一家不同种,长度加一
        commit({
          type: 'addGoods',
          goodsList: enterList,
          goods: goods
        })
      }
    } else {
      // 不同家,直接添加新项
      commit({
        type: 'addGoods',
        goodsList: [],
        goods: goods
      })
    }
    return '添加至购物车成功 ~'
  },

  // 选择商家所有商品
  checkedShopAll ({ commit }, cartItem) {
    cartItem.forEach(item => {
      commit('checked', item)
    })
  },

  // 取消选中商家所有商品
  unCheckedShopAll ({ commit }, cartItem) {
    cartItem.forEach(item => {
      commit('unChecked', item)
    })
  },

  // 取消选中商家所有商品
  unCheckedAll ({ state, dispatch }) {
    state.cart.forEach(cartItem => {
      dispatch('unCheckedShopAll', cartItem)
    })
  },

  // 修改商品尺码/颜色信息
  async asyncGoodsInfoChange ({ commit }, payload) {
    commit('goodsInfoChange', payload)
    return '修改商品数据成功 ~'
  }
}