<template>
  <div id="wrapper">
    <van-grid :column-num="5"
              :border="false">
      <van-grid-item v-for="(nav,index) in nav_list"
                     :key="nav.id"
                     :icon="nav.icon"
                     :text="nav.name"
                     @click="gotoCategory(index)" />
    </van-grid>
  </div>
</template>

<script type="text/javascript">

export default {
  props: {
    nav_list: Array
  },
  data () {
    return {

    }
  },
  methods: {
    gotoCategory (index) {
      this.$router.push({ name: 'category', params: { currentIndex: index } })
    }
  }
}
</script>
