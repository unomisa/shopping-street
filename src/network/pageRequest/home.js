import { request } from 'network/request'

export function getHomeMultidata () {
  return request({
    url: '/home/multidata'
  })
}

// 页信息请求
export function getHomeGoods (item) {
  return request({
    url: '/home/data',
    params: {
      type: item.type,
      page: item.page
    }
  })
}
