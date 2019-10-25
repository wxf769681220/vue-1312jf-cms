<template>
  <Modal class="upload-table" v-model="modalUploadTable" class-name="vertical-center-modal">
    <p slot="header">上传报名表</p>
    <input
      id="upload"
      type="file"
      @change="importfxx()"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    >
    <!-- <Upload
      action="//jsonplaceholder.typicode.com/posts/"
      :format="['xlsx', 'pdf']"
      :on-error="onError"
      :on-success="onSuccess"
    >
      <div>
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>点击选取需要上传文件</p>
      </div>
    </Upload>-->
  </Modal>
</template>

<script>
// import { Modal, Upload, Icon } from 'view-design'
import { Modal } from 'view-design'

export default {
  name: 'upload-table',
  props: {},
  data() {
    return {
      modalUploadTable: false
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    importfxx() {
      this.getDataFile()
    },
    getDataFile(file) {
      let _this = this
      let inputDOM = this.$refs.inputer
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0]
      var f = this.file
      var reader = new FileReader()

      reader.readAsBinaryString(f)
      reader.onload = function(e) {
        console.log(e)
      }
    },
    onSuccess(response, file, fileList) {
      console.log(file)
    },
    onError() {},
    show() {
      this.modalUploadTable = true
    },
    hide() {
      this.modalUploadTable = false
    }
  },
  components: {
    Modal
  },
  beforedestroy() {}
}
</script>

<style lang="stylus" scoped>
</style>
