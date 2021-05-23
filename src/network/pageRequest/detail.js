import { request } from '../request'

export function getDetail (iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class GoodsBaseInfo {
  
  discountDesc='女神优选'

  constructor (itemInfo = {}, columns = [], promotions = {}) {
    // 优惠
    this.promotionsList = promotions.list

    // 商品标题
    this.title = itemInfo.title

    // 商品价格
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice

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
  constructor(tables,info,desc){
    this.tables=tables
    this.info=info
    this.desc=desc
  }
}

export class Rate{

  constructor(rateNumber,rateInfo){
    this.haveRate=rateNumber!==0

    this.user=rateInfo.user
    this.content=rateInfo.content
    this.created=rateInfo.created
    this.style=rateInfo.style

    'explain' in rateInfo && (this.explain=rateInfo.explain)
    'images' in rateInfo && (this.images=rateInfo.images)
  }
}