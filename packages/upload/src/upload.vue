<template>
  <ii-upload-org
    ref="upload"
    :multiple="initOptions ? initOptions.multiple : multiple"
    :limit="limit"
    :data="initOptions ? initOptions.file_metadata : fileMetadata"
    :accept="initOptions ? initOptions.accept : accept"
    :action="upload_action"
    :auto-upload="autoUpload"
    :list-type="initOptions ? initOptions.list_type : listType"
    :file-list="file_list"
    :before-upload="initOptions ? initOptions.before_upload : beforeUpload"
    :on-remove="remove_file"
    :on-success="upload_success"
    :on-error="upload_error"
    :disabled="disabled || (limit && limit === file_list.length)">
    <slot v-if="$slots.trigger" name="trigger" slot="trigger"></slot>
    <ii-button :disabled="disabled || (limit && limit === file_list.length)" v-if="!$slots.trigger && (initOptions ? initOptions.list_type : listType) !== 'picture-card'" slot="trigger" size="small" type="primary">{{$t("button.upload")}}</ii-button>
    <ii-button :disabled="disabled || (limit && limit === file_list.length)" v-if="!$slots.trigger && (initOptions ? initOptions.list_type : listType) === 'picture-card'" slot="trigger" size="small"><ii-svg-icon width="32" height="32" name="btnicon/add"></ii-svg-icon></ii-button>
  </ii-upload-org>
</template>
<style lang="css" scoped>
</style>
<script>
import _ from 'lodash'
export default {
  name: 'IiUpload',
  props: {
    autoUpload: {
      type: Boolean,
      default: true
    },
    action: String,
    initOptions: Object,
    limit: Number,
    accept: String,
    fileMetadata: Object,
    multiple: Boolean,
    listType: String,
    fileList: Array,
    beforeUpload: Function,
    disabled: Boolean
  },
  data () {
    return {
      upload_action: this.action || './storageservice/api/asset',
      file_list: [],
      self_updating: false
    }
  },
  methods: {
    upload() {
      this.$refs.upload.submit();
    },
    upload_success (response, file, file_list) {
      if (response.result !== 'ok') {
        this.$ii_message('error', 'upload error. ' + response.errMsg)
      } else {
        file.storageId = response.data
        this.file_list = file_list // _.map(file_list, (file_item) => { return {name: file_item.name, storageId: file_item.storageId, url: file_item.url, status: file_item.status} })
        this.self_updating = true
        this.$emit('update:fileList', _.map(file_list, (file_item) => { return {name: file_item.name, storageId: file_item.storageId, url: file_item.url, status: file_item.status} }))
      }
    },
    upload_error (err) {
      this.$ii_message('error', 'upload error. ' + err.message)
    },
    init_file_list (files) {
      if (!files || files.length === 0) {
        this.file_list = []
        return
      }
      this.file_list = _.map(files, (file_item) => {
        return {
          name: file_item.name,
          storageId: file_item.storageId,
          status: file_item.status,
          url: './storageservice/api/asset/' + file_item.storageId
        }
      })
    },
    remove_file (file, file_list) {
      // this.$axios('./storageservice/api/asset/' + file.storageId, 'delete', {})
      this.file_list = file_list // _.map(file_list, (file_item) => { return {name: file_item.name, storageId: file_item.storageId, url: file_item.url, status: file_item.status} })
      this.self_updating = true
      this.$emit('update:fileList', _.map(file_list, (file_item) => { return {name: file_item.name, storageId: file_item.storageId, url: file_item.url, status: file_item.status} }))
    }
  },
  mounted () {
    this.init_file_list(this.fileList)
  },
  watch: {
    'fileList' (val) {
      if (this.self_updating) {
        this.self_updating = false
        return
      }
      this.init_file_list(val)
    }
  }
}
</script>
