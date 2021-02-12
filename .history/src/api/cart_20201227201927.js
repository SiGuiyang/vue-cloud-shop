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

/**
 * 购物车列表
 * @param {*} data 
 */
export function postCartPage (data) {
  return service({
    url: `/app/user/${data.page}/page`,
    method: 'post',
    data
  })
}