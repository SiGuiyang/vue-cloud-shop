
<template>
  <div class="cart">
    <!-- 购物车头部 -->
    <!--头部区域-->
    <header class="
       titleWrapper">
      <h4><strong>购物车</strong></h4>
      <div class="clearCart"
           :style="selectedGoodsCount==0?'color:grey':'color:#45c763'"
           @click="clearCart"
           v-show="isShowEmptyCart">删除</div>
    </header>
    <!-- 购物车没有商品 -->
    <div class="cartWrapper">
      <!-- 购物车为空 -->
      <div class="emptyCart"
           v-show="!isShowEmptyCart">
        <img src="@/images/cart/empty.png"
             alt="">
        <div class="title">购物车空空滴～</div>
        <router-link to="/dashboard/home"
                     class="goHome">去逛逛</router-link>
      </div>
      <!-- 购物车有数据 -->
      <div class="contentWrapper"
           v-show="isShowEmptyCart">
        <div class="contentWrapperList"
             v-for="goods in shopCart"
             :key="goods.id">
          <section>
            <div class="shopCartListCon">
              <div class="left">
                <a href="javaScript:;"
                   class="cartCheckBox"
                   :checked="goods.checked"
                   @click.stop="single(goods.skuId)"></a>
              </div>
              <div class="center">
                <img :src="goods.skuImage">
              </div>
              <div class="right">
                <a>{{goods.skuName}}</a>
                <div class="bottomContent">
                  <p class="shopPrice"> {{goods.skuAmount | moneyFormat}}</p>
                  <div class="shopDeal">
                    <span @click="reduceGoods(goods.id,goods.num)">-</span>
                    <input type="number"
                           disabled
                           v-model="goods.num">
                    <span @click="addGoods(goods.skuId,goods.skuName,goods.skuImage,goods.skuAmount)">+</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <!-- 提交订单 -->
        <van-submit-bar :price="totalPrice"
                        :button-text="submitBarText"
                        @submit="onSubmit"
                        :disabled="!(selectedGoodNum>0)"
                        v-show="isShowEmptyCart">
          <van-checkbox v-model="isCheckedAll"
                        checked-color='#45c763'>全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>

<script>
// 引入Vuex
import { mapMutations, mapState, mapGetters } from 'vuex'
export default {
  mounted () {
    // 初始化数据
  },
  data () {
    return {
      youLike_product_lists: [],
      isShowLoading: false,
      isEmptyCart: false,
    }
  },
  computed: {
    // 0.结算数量
    submitBarText () {
      const count = this.selectedGoodNum;
      return '结算' + (count ? `(${count})` : '');
    },
    // 1.是否显示空购物车样式
    isShowEmptyCart () {
      let isshow = false;
      if (this.totalCount > 0) {
        isshow = true;
      }
      return isshow;
    },
    // 2.延展出store里的shopCart的数据
    ...mapState(['shopCart', 'userInfo']),
    ...mapGetters({
      selectedGoodNum: 'SELECTED_GOODS_COUNT',
      totalPrice: 'SELECTED_GOODS_PRICE'
    }),
    // 3.计算shopCart的数量
    totalCount () {
      return Object.keys(this.shopCart).length;
    },
    // 4.计算shopCart中选中商品的数量
    selectedGoodsCount () {
      let selectedGoodsCount = 0;
      console.log(this.shopCart)
      Object.values(this.shopCart).forEach((goods) => {
        if (goods.checked) {
          selectedGoodsCount++;
        }
      });
      return selectedGoodsCount;
    },
    // 5.是否全部选中
    isCheckedAll: {
      get () {
        let tag = this.totalCount > 0;
        let shopCart = this.shopCart;
        Object.values(shopCart).forEach(goods => {
          if (!goods.checked) {
            tag = false;
          }
        });
        return tag;
      },
      set (value) {
        let isCheckedAll = !value;
        this.ALL_SELECT_GOODS({ isCheckedAll });
      }
    }
  },
  methods: {
    // 0.延展mutations中的方法
    ...mapMutations(['ADD_GOODS', 'REDUCE_GOODS', 'SINGLE_SELECT_GOODS', 'ALL_SELECT_GOODS', 'DELETE_SELECT_GOODS', 'ADD_TO_CART']),
    // 1.右上角删除
    clearCart () {
      if (this.selectedGoodsCount > 0) {
        this.$dialog.confirm({
          title: '温馨提示：',
          message: '确定要删除选中商品吗?'
        }).then(() => {
          // on confirm 确认删除
          this.DELETE_SELECT_GOODS();
        }).catch(() => {
          // on cancel
        });
      }
    },
    // 3.减少商品数量
    reduceGoods (goodsID, goodsNum) {
      if (goodsNum > 1) {
        // 3.1 通过goodsID减少商品
        this.REDUCE_GOODS({
          goodsID
        });
      } else if (goodsNum === 1) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '确定删除该商品吗?'
        }).then(() => {
          // on confirm 确认删除
          this.REDUCE_GOODS({ goodsID });
        }).catch(() => {
          // on cancel
        });
      }
    },
    // 4.增加商品数量 保证传递数据和 mutations 一致
    addGoods (goodsID, goodsName, goodsSmallImage, goodsPrice) {
      this.ADD_GOODS({
        goodsID,
        goodsName,
        goodsSmallImage,
        goodsPrice
      });
    },
    // 5.单个商品的选中和非选中
    single (goodsID) {
      this.SINGLE_SELECT_GOODS({ goodsID });
    },
    // 6.去结算
    onSubmit () {
      // 6.1 当选中商品数量大于0跳转
      if (this.selectedGoodNum > 0) {
        // 跳转到订单界面
        this.$router.push('/order');
      } else {
        this.$toast({
          message: '请选择需要结算的商品',
          duration: 1000
        });
      }
    },
  },
}
</script>
<style lang="less" scoped>
.cart {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .titleWrapper {
    width: 100%;
    height: 2.6rem;
    background: #fff;
    -webkit-background-size: 0.1rem 4.4rem;
    background-size: 0.1rem 4.4rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .titleWrapper .clearCart {
    position: absolute;
    right: 0.3rem;
    font-size: 0.8rem;
  }
  .disableClearCart {
    color: grey;
  }
  .cartWrapper {
    width: 100%;
    height: 100rem;
    margin-top: 2.6rem;
    @media screen and (min-width: 300px) and(max-width: 374px) {
      .van-submit-bar {
        bottom: 3.3rem;
      }
    }
    @media screen and (min-width: 375px) and(max-width: 420px) {
      .van-submit-bar {
        bottom: 2.7rem;
      }
    }
    @media screen and (min-width: 420px) and(max-width: 1024px) {
      .van-submit-bar {
        bottom: 1.4rem;
      }
    }
    .emptyCart {
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        padding-top: 2rem;
        width: 50%;
        height: 8rem;
        margin: 0 auto;
      }
      .title {
        text-align: center;
        padding: 0.5rem;
      }
      .goHome {
        margin-top: 2rem;
        color: white;
        background-color: #45c763;
        text-align: center;
        margin: 0 auto;
        padding: 0.5rem;
        width: 5rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: 1rem;
      }
    }
    .contentWrapper {
      padding-top: 0.5rem;
      section {
        background-color: #ffffff;
        .shopCartListCon {
          display: flex;
          height: 6rem;
          border-bottom: 0.01rem solid #e0e0e0;
          margin-bottom: 0.7rem;
          padding: 0.5rem 0;
          justify-content: center;
          align-items: center;
          .left {
            flex: 1;
            display: flex;
            a {
              display: inline-block;
              margin-top: 0.8rem;
              margin-left: 0.5rem;
            }
            .cartCheckBox {
              background: url("./../../images/cart/shop-icon.png") no-repeat;
              background-size: 2.5rem 5rem;
              width: 1rem;
              height: 1rem;
            }
            .cartCheckBox[checked] {
              background-position: -1.2rem 0;
            }
          }
          .center {
            flex: 3;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .right {
            flex: 6;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            position: relative;
            a {
              height: 2.2rem;
              line-height: 1.2rem;
              overflow: hidden;
              margin-bottom: 0.3rem;
              font-size: 0.8rem;
              color: #000;
            }
          }
        }
        .bottomContent {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .shopPrice {
            font-size: 0.8rem;
          }
          .shopDeal span {
            display: inline-block;
            width: 1rem;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
            float: left;
          }
          .shopDeal input {
            float: left;
            width: 2rem;
            height: 1.2rem;
            text-align: center;
            margin: 0 0.2rem;
            font-size: 0.8rem;
            background-color: #f5f5f5;
            border: 0;
          }
        }
      }
    }
  }
  .van-checkbox {
    margin-left: 0.5rem;
  }
}
</style>
