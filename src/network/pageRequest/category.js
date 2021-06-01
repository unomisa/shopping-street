import { request } from 'network/request'

export function getCategory () {
  return request({
    url: '/category'
  })
}