
<template>
  <div id="myAddress">
    <!--导航栏-->
    <van-nav-bar title="添加地址"
                 left-arrow
                 :fixed=true
                 :border=true
                 @click-left="onClickLeft"></van-nav-bar>
    <!-- 没有数据的占位图 -->
    <div class="noDataPlaceHold"
         v-show="address.length<1">
      <img src="@/images/order/noAddress.png"
           alt="">
      <span class="desc">还没有添加过地址呢,添加一个吧😄</span>
    </div>
    <!-- 联系人 -->
    <van-address-list v-model="chosenAddressId"
                      :list="address"
                      @add="onAdd"
                      @edit="onEdit"
                      @select="onBackAddress"
                      style="margin-top: 3rem"
                      add-button-text="添加地址">
    </van-address-list>
    <!-- 路由出口 -->
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="text/javascript">

import { postAddress } from '@/api/personal'
// 引入发布订阅
import { CHOOSE_USER_ADDRESS } from '@/util/pubsub_type.js'
import PubSub from 'pubsub-js'

export default {
  data () {
    return {
      chosenAddressId: 0,
      address: []
    }
  },
  mounted () {
  },
  created () {
    this.postAddressPage()
  },
  methods: {
    postAddressPage () {

      postAddress({ page: 1 }).then(response => {
        this.address = response.data
      })

    },
    onClickLeft () {
      this.$router.back();
    },
    onAdd () {
      this.$router.push({ path: '/dashboard/mine/addAddress' });
    },
    onEdit (item) {
      this.$router.push({ path: '/dashboard/mine/editAddress', query: { content: item } });
    },
    onBackAddress (item) {
      // 发布通知到订单界面修改值
      PubSub.publish(CHOOSE_USER_ADDRESS, item);
      // 返回到上一个界面
      this.$router.back();
    }
  }
}
</script>

<style lang="less" scoped>
#myAddress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 200;
  .noDataPlaceHold {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 40%;
      height: 20%;
    }
    .desc {
      color: grey;
      font-size: 0.6rem;
    }
  }
  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }
  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  .van-address-list__add {
    bottom: 1rem;
  }
  .van-button--large {
    left: 15%;
    width: 70%;
    border-radius: 2rem;
    background-color: #45c763;
    border: none;
  }
}
</style>
