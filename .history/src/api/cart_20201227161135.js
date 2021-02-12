import service from '@/util/request'

export function postCartCreate (data) {
  return service({
    url: '/cart/app/cart/create',
    method: 'post',
    data
  })
}