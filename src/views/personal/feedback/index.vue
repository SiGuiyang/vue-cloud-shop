<template>
  <div id="feedback">
    <van-nav-bar title="意见反馈"
                 :fixed=true
                 :border=false
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
    <van-form @submit="onSubmit"
              style="margin-top:3rem">
      <van-field v-model="content"
                 name="content"
                 rows="2"
                 autosize
                 label="留言"
                 type="textarea"
                 maxlength="50"
                 placeholder="请填写留言"
                 show-word-limit
                 :rules="[{ required: true, message: '请填写留言' }]" />
      <van-field name="images"
                 label="上传图片">
        <template #input>
          <van-uploader v-model="images" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>

import { postFeedback } from '@/api/personal'
export default {
  data () {
    return {
      images: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
      content: ''
    }
  },
  methods: {
    // 返回到上个界面
    onClickLeft () {
      this.$router.go(-1)
    },
    onSubmit (values) {

      postFeedback({ content: values.content, images: values.images }).then(() => {
        this.$toast('非常感谢您的反馈，我方会积极吸收您的反馈')
        this.$router.go(-1)
      })
    },
  }
}
</script>

<style lang="less" scoped>
#feedback {
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