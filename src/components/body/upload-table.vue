<template>
  <Modal
    class="upload-table"
    v-model="modalUploadTable"
    class-name="vertical-center-modal"
    :loading="true"
    ok-text="上传"
    @on-ok="upload"
  >
    <p slot="header">上传报名表</p>
    <input
      id="upload"
      type="file"
      @change="uplaodExcel($event)"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    >

    <!-- 报名报模板下载-->
    <div class="mt-3">
      <span>报名表模板下载：</span>
      <span class="text-primary" v-if="matchType === 0" @click="download('单人')">单人赛报名表</span>
      <span class="text-primary" v-if="matchType === 2" @click="download('双人')">双人赛报名表</span>
      <span class="text-primary" v-if="matchType === 1" @click="download('团体')">团体赛报名表</span>
    </div>
  </Modal>
</template>

<script>
// Iview Components
import { Modal } from 'view-design'
// Script
import { getExcelData } from 'common/js/uploadExcel/exportData'

export default {
  name: 'upload-table',
  props: {
    matchId: {
      type: Number,
      defalut: 0
    },
    matchType: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      modalUploadTable: false,
      excelData: [],
      fileName: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    // console.log(this.matchType)
  },
  methods: {
    uplaodExcel(e) {
      getExcelData(e, this.matchId, this.matchType).then(res => {
        console.log('获取excel表信息：', res)
        this.excelData = res.data
        this.fileName = res.fileName
      })
    },
    upload() {
      this.$emit('upload-ok', this.excelData, this.fileName)
      this.hide()
    },
    download(type) {
      // window.open(`./source/${type}赛报名表.xlsx`)
    },
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
