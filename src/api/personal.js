import service from '@/util/request'

// 登录验证码
export function postLoginSMSCode (data) {
  return service({
    url: '/user/app/send/code/sms',
    method: 'post',
    data
  })
}

/**
 * 登录
 * @param {} data 
 */
export function postLogin (data) {
  const params = {
    phone: data.phone,
    smsCode: data.smsCode,
    grant_type: 'sms'
  }
  return service({
    auth: {
      username: 'shop',
      password: 'shop'
    },
    url: '/oauth/token',
    method: 'post',
    params: params
  })
}

// 用户信息
export function postUserInfo () {
  return service({
    url: '/user/app/profile',
    method: 'post'
  })
}

/**
 * 订单气泡数
 */
export function postOrderQuantity () {
  return service({
    url: '/order/app/quantity',
    method: 'post'
  })
}

/**
 * 订单列表
 * page 页码
 * order 类型
 * @param {*} data 
 */
export function postOrders (data) {
  return service({
    url: `/order/app/${data.page}/${data.order}`,
    method: 'post',
    data
  })
}
// 用户优惠券
export function postCoupons () {
  return service({
    url: '/activity/app/user/coupons',
    method: 'post'
  })
}

// 地址列表
export function postAddress (data) {
  return service({
    url: `/user/app/address/${data.page}`,
    method: 'post'
  })
}

// 地址保存
export function postAddressCreate (data) {
  return service({
    url: '/user/app/address/create',
    method: 'post',
    data
  })
}

// 地址修改
export function postAddressModify (data) {
  return service({
    url: '/user/app/address/modify',
    method: 'post',
    data
  })
}

// 意见反馈
export function postFeedback (data) {
  return service({
    url: '/user/app/feedback/create',
    method: 'post',
    data
  })
}