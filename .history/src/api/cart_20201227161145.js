import service from '@/util/request'

/**
 * 添加购物车
 * @param {*} data 
 */
export function postCartCreate (data) {
  return service({
    url: '/cart/app/cart/create',
    method: 'post',
    data
  })
}