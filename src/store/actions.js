export default {
  addToCart ({ state, commit }, goods) {
    // 在已有的购物车列表中查找是否有同一家的商品
    const enterList = state.cart.find(item => item[0].shopName === goods.shopName)

    // 如果有则添加至同一家的商品列表中
    if (enterList) {
      // 判断是否是同种商品
      const currentGoods = enterList.find(item => item.size === goods.size && item.style === goods.style)
      if (currentGoods) {
        // 同一家同一种,数量+1
        commit({
          type: 'addNumber',
          currentGoods: currentGoods
        })
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
  }
}