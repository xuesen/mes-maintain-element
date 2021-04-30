<template>
<div>
  <ii-upload
    accept="jpg,png,jpeg"
    :file-metadata="file_metadata"
    :before-upload="before_upload"
    :file-list.sync="file_list"
    :list-type="list_type"
    :limit="2"
    :multiple="false"
    :support-picture-paste="true">
  </ii-upload>
  <ii-button type="primary" @click="download">下载</ii-button>
  <div>{{JSON.stringify(file_list)}}</div>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_upload_code"></ii-code-view>
</div>
</template>

<script>
import Codes from '../example-code/index.js'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      file_list: [{name: '222.jpg', storageId: '5ee07092ff7c6205dc63294e'}],
      file_metadata: {appName: 'test', module: 'demo-pic-upload'},
      list_type: 'picture-card', // text/picture/picture-card
      ii_upload_code: Codes('./ii-upload.code')
    }
  },
  methods: {
    before_upload (file) {
      console.log(file)
      return true
    },
    download () {
      this.$ii_download(this.file_list[0])
    }
  },
  mounted () {
  }
}
</script>
