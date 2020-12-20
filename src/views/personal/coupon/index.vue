<template>
  <div id="couponList">
    <van-nav-bar title="我的优惠券"
                 :fixed=true
                 :border=false
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
    <!--优惠券列表-->
    <van-coupon-list :coupons="coupons"
                     style="margin-top:3rem"
                     input-placeholder="请填写邀请码"
                     @exchange="onExchange" />

  </div>

</template>

<script>

import { postCoupons } from '@/api/personal'
export default {
  data () {
    return {
      coupons: []
    }
  },
  created () {
    this._initData()
  },
  methods: {
    _initData () {
      postCoupons().then(response => {
        this.coupons = response.data
      })
    },
    // 返回到上个界面
    onClickLeft () {
      this.$router.go(-1);
    },

    onExchange (code) {
      // 兑换优惠券
      if (code == '520it') {
        this.coupons.push(this.coupons[0]);
      }
    }
  }
}
</script>

<style lang="less" scoped>
#couponList {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
  .van-nav-bar__title {
    color: black;
  }
  .van-icon {
    color: #dedede;
  }
}
</style>
