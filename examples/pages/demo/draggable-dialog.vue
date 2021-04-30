<template>
<div>
    <ii-button type="primary" @click="open_draggable_dialog">打开窗口</ii-button>
    <div>更多属性参考elementui的dialog</div>
    <ii-draggable-dialog top="20" :visible="show" title="mydialog" size="size1" @close="handle_close" @closed="close_diag">
      blank
      <span slot="footer" class="dialog-footer">
      <ii-button type="text" @click="handle_cancel()">{{$t('button.cancel')}}</ii-button>
      <ii-button type="primary" @click="handle_save()">{{$t('button.save')}}</ii-button>
      </span>
    </ii-draggable-dialog>
    <ii-divider content-position="left">代码</ii-divider>
    <ii-code-view :code="open_draggable_dialog_code"></ii-code-view>
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
      show: false,
      open_draggable_dialog_code: Codes('./open-draggable-dialog.code')
    }
  },
  methods: {
    open_draggable_dialog () {
      this.show = true
    },
    handle_save () {
      this.show = false
    },
    handle_cancel () {
      this.show = false
    },
    handle_close () {
      this.show = false
    },
    close_diag () {
      console.log('dialog close')
    }
  },
  mounted () {
  }
}
</script>
