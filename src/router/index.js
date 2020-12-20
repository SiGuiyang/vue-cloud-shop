import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // 解决路由跳转页面没有置顶
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  // !!注意: 二级路由不需要加 '/'
  routes:
    [
      {
        path: '/',
        redirect: '/dashboard',
        // 是否数据缓存
        meta: {
          keepAlive: true
        },
      }, {
        // 根页面 
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/index'),
        children:
          [
            {
              path: '/dashboard',
              redirect: '/dashboard/home',
              // 是否数据缓存
              meta: {
                keepAlive: true
              },
            }, {
              // 主页
              path: 'home',
              name: 'home',
              component: () => import('@/views/home/index'),
              // 是否数据缓存
              meta: {
                keepAlive: true
              }
            }, {
              // 分类
              path: 'category',
              name: 'category',
              component: () => import('@/views/classification/index'),
              // 是否数据缓存
              meta: {
                keepAlive: true
              },
            }, {
              // 购物车
              path: 'cart',
              name: 'cart',
              component: () => import('@/views/cart/index'),
              meta: {
                keepAlive: true
              }
            }, {
              // 我的
              path: 'mine',
              name: 'mine',
              component: () => import('@/views/personal/index'),
              children: [
                {
                  // 用户中心
                  path: 'center',
                  name: 'Center',
                  component: () => import('@/views/personal/center/index')
                },
                {
                  // 订单
                  path: 'order',
                  name: 'Order',
                  component: () => import('@/views/personal/order/index')
                },
                {
                  // 优惠券
                  path: 'coupon',
                  name: 'Coupon',
                  component: () => import('@/views/personal/coupon/index')
                },
                {
                  // 我的地址
                  path: 'address',
                  name: 'Address',
                  component: () => import('@/views/personal/address/index')
                },
                {
                  // 我的地址
                  path: 'addAddress',
                  name: 'AddAddress',
                  component: () => import('@/views/personal/address/add')
                },
                {
                  // 我的地址
                  path: 'editAddress',
                  name: 'EditAddress',
                  component: () => import('@/views/personal/address/edit')
                },
                {
                  // 意见反馈
                  path: 'feedback',
                  name: 'Feedback',
                  component: () => import('@/views/personal/feedback/index')
                }
              ]
            }
          ]
      },
      {
        // 登录
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index')
      }
    ]
})

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router