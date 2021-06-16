import { request } from '../request'

/**
 * * 网络请求方法
 */

// 详情数据请求
export function getDetail (iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 推荐商品请求
export function getRecommend(){
  return request({
    url: '/recommend',
  })
}

/**
 * * 信息类
 */

export class GoodsBaseInfo {

  discountDesc='女神优选'

  constructor (itemInfo = {}, columns = [], promotions = {}) {
    // 优惠
    this.promotionsList = promotions.list

    // 商品标题
    this.title = itemInfo.title

    // 商品价格
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.highPrice

    if(itemInfo.discountDesc!==''){
      this.discountDesc = itemInfo.discountDesc
    }

    // 关于栏
    this.aboutColumns = columns
  
  }
}

export class ShopInfo{

  constructor(shopInfo){
    this.logo=shopInfo.shopLogo
    this.name=shopInfo.name
    
    this.fans=shopInfo.cFans
    this.sells=shopInfo.cSells
    this.score=shopInfo.score
    this.goodsCount=shopInfo.cGoods
  }
}

export class Show{

  constructor(imageList=[],desc=''){
    this.imageList=imageList
    this.desc=desc
  }
}

export class Params{
  constructor({tables=[],info=[],desc=''}){
   if(tables.length!==0){this.tables=tables}
   if(info.length!==0){this.info=info}
   if(desc.length!==0) {this.desc=desc}
  }
}


// 评论信息
export class Rate{

  constructor(rateInfo){
    this.user=rateInfo.user
    this.content=rateInfo.content
    this.created=rateInfo.created
    this.style=rateInfo.style

    'explain' in rateInfo && (this.explain=rateInfo.explain)
    'images' in rateInfo && (this.images=rateInfo.images)
  }
}

// 尺码信息
export class SkuInfo{
  
  constructor(skuInfo){
    this.defaultPrice=skuInfo.defaultPrice // 默认显示价格
    this.defaultImg=skuInfo.skus[0].img // 默认显示图片
    this.totalStock=skuInfo.totalStock // 库存总数
    this.sizeList=skuInfo.props[1].list // 尺码
    this.colorList=skuInfo.props[0].list // 颜色/类型
    this.skus=skuInfo.skus // 库存详情
  }
}

// 加入的购物车信息
export class Cart{
  constructor(info){
    this.iid=info.iid
    this.isChecked=false
    this.shopName=info.shopName
    this.title=info.title
    this.img=info.currentInfo.img
    this.price=info.currentInfo.nowPrice
    this.style=info.currentInfo.style
    this.size=info.currentInfo.size
    this.buyCount=info.currentInfo.buyCount
  }
}