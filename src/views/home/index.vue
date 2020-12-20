<template>
  <div id="home">
    <!-- 骨架屏幕  数据未加载时显示占位-->
    <Skeleton v-show="isShowLoading" />
    <div v-if="!isShowLoading">
      <!-- 头部地理位置和搜索框 -->
      <div class="head">
        <Header></Header>
        <!-- 轮播图 -->
        <Sowing :sowing_list="sowing_list" />
      </div>
      <!-- Nav -->
      <Nav :nav_list="nav_list" />
      <!-- 限时抢购 -->
      <!-- <FlashBuy :flash_sale_product_list="flash_sale_product_list" /> -->
      <!-- 最底部 -->
      <van-divider>我是有底线的</van-divider>
    </div>
  </div>
</template>

<script>
import { getBanners, postSpus } from '@/api/home.js'

// 引入Vuex
import { mapMutations, mapState } from 'vuex'

// 引入页面组件
import Header from './header/Header'
import Sowing from './sowing/Sowing'
import Nav from './nav/Nav'
// import FlashBuy from './flash/FlashBuy'
import Skeleton from './skeleton'
export default {
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    // 0.数据初始化
    this._initData()
  },
  mounted () { },
  data () {
    return {
      sowing_list: [], // 首页轮播图数据
      isShowLoading: true, // 是否加载动画
      nav_list: [],
      flash_sale_product_list: [], // 限时抢购
      tabbar_all_product_list: [],
      specialZone: {}, // 特色专区数据
      home_ad: '' // 首页广告
    }
  },
  components: {
    Header,
    Sowing,
    Nav,
    // FlashBuy,
    // TabbarGoodsItem,
    // Loading,
    Skeleton
  },
  methods: {
    // Vuex中的方法
    ...mapMutations(['ADD_GOODS', 'ADD_TO_CART']),
    // 数据初始化
    async _initData () {
      // 给轮播组件 sowing_list赋值
      getBanners({}).then(response => {
        this.sowing_list = response.data
      })
      postSpus().then(response => {
        // navList 赋值
        this.nav_list = response.data
      })

      this.isShowLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
#home {
  background-color: "#f5f5f5";
  padding-bottom: 3rem;
  .head {
    margin-top: -3rem;
    width: 100%;
    background-image: url("http://518taole.7-orange.cn/backImage.png");
  }
}
.van-divider {
  background-color: #f5f5f5;
  margin: 0;
}
</style>
