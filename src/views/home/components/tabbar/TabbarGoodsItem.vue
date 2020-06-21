<template>
  <div id="tabbarItem">
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
              animated:yes>
      <!-- 全部 -->
      <van-tab>
        <div slot="title">
          <span>全部</span>
        </div>
        <ProduceItem :product_lists="tabbar_all_product_list" />
      </van-tab>
      <!-- 晚餐 -->
      <van-tab>
        <div slot="title">
          <span>晚餐</span>
        </div>
        <ProduceItem :product_lists="flash_sale_product_list" />
      </van-tab>
      <!-- 人气 -->
      <van-tab>
        <div slot="title">
          <span>人气</span>
        </div>
        <ProduceItem :product_lists="tabbar_all_product_list" />
      </van-tab>
      <!-- 心选 -->
      <van-tab>
        <div slot="title">
          <span>心选</span>
        </div>
        <ProduceItem :product_lists="flash_sale_product_list" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/javascript">
import ProduceItem from './ProduceItem'
export default {
  props: {
    tabbar_all_product_list: Array,
    flash_sale_product_list: Array,
  },
  data () {
    return {
      active: 0
    }
  },
  components: {
    ProduceItem
  }
}
</script>

<style lang="less" scoped>
#tabbarItem {
  width: 100%;
}
</style>
