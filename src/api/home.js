import service from '@/util/request'

// 首页banner
export function getBanners (data) {
  return service({
    url: '/activity/app/user/banners',
    method: 'get',
    data
  })
}
// 获取首页spus
export function postSpus () {
  return service({
    url: '/goods/app/spus',
    method: 'post'
  })
}

// 分类根据spu主键查询
export function postClassification (data) {
  return service({
    url: `/goods/app/classification/${data.spuId}`,
    method: 'post'
  })
}