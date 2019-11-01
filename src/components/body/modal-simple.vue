<template>
  <Modal
    class="modal-simple"
    class-name="vertical-center-modal"
    width="500px"
    v-model="modalSimple"
    @on-ok="onOK"
  >
    <h3 slot="header">{{title}}</h3>
    <slot></slot>
  </Modal>
</template>

<script>
// Iview Components
import { Modal } from 'view-design'

export default {
  name: 'modal-simple',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      modalSimple: false
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    onOK() {
      this.$emit('on-ok')
    },
    show() {
      this.modalSimple = true
    },
    hide() {
      this.modalSimple = false
    }
  },
  beforedestroy() {},
  components: {
    Modal
  }
}
</script>

<style lang="stylus" scoped>
</style>
