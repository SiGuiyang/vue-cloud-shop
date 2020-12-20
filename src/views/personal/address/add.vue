<template>
  <div id="addAddress">
    <van-nav-bar title="添加地址"
                 left-arrow
                 :fixed=true
                 :border=true
                 @click-left="onClickLeft"></van-nav-bar>
    <van-address-edit :area-list="areaList"
                      show-postal
                      show-set-default
                      show-search-result
                      save-button-text="保存并使用"
                      :search-result="searchResult"
                      :area-columns-placeholder="['请选择', '请选择', '请选择']"
                      @save="onSave"
                      @change-detail="onChangeDetail"
                      style="margin-top:3rem" />
  </div>
</template>

<script>

import { postAddressCreate } from '@/api/personal'
import areaList from '@/util/area.js'
export default {
  data () {
    return {
      areaList: areaList,
      searchResult: []
    }
  },
  methods: {
    // 1.返回上级界面
    onClickLeft () {
      console.log(this.areaList)
      this.$router.go(-1);
    },
    // 2. 保存
    onSave (content) {
      console.log(content)

      const params = {

      }

      postAddressCreate(params).then(() => {
        this.$router.back();
      })
    },
    onDelete () {
      this.$toast('delete');
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
}
</script>
<style lang="less" scoped>
#addAddress {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 99999;
  .van-address-edit {
    .van-button {
      background-color: #45c763;
    }
  }
}
</style>
