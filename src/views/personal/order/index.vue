<template>
  <div id="myOrder">
    <van-nav-bar title="我的订单"
                 :border=false
                 :fixed="true"
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
    <van-tabs v-model="active"
              animated
              swipeable
              sticky
              :border="false"
              :offset-top="47"
              ref="tabs"
              type="line"
              color="#28BE57"
              title-active-color="#28BE57"
              animated:yes
              @click="onClickTab">
      <!-- 全部 -->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[0]}}</span>
        </div>
        <OrderType :orderTypeDataArray="typeArray" />
      </van-tab>
      <!-- 待支付 -->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[1]}}</span>
        </div>
        <OrderType :orderTypeDataArray="typeArray" />
      </van-tab>
      <!-- 待收货 -->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[2]}}</span>
        </div>
        <OrderType :orderTypeDataArray="typeArray" />
      </van-tab>
      <!-- 待评价-->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[3]}}</span>
        </div>
        <OrderType :orderTypeDataArray="typeArray" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import OrderType from './orderType'
import { postOrders } from '@/api/personal'
export default {
  data () {
    return {
      typeArray: [],
      // 路由传递过来的数据 active
      active: this.$route.query.active,
      itemsTitle: ['全部', '待支付', '待收货', '待评价'],
    }
  },
  components: {
    OrderType
  },
  methods: {
    onClickLeft () {
      this.$router.back();
    },
    onClickTab (name) {
      this.$toast(name)

      postOrders({ page: 1, order: name }).then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="less" scoped>
#myOrder {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: #f5f5f5;
  .van-icon {
    color: #dedede;
  }
}
</style>
