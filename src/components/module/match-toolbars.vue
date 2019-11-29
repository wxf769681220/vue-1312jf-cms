<template>
  <div class="match-toolbars">
    <ButtonGroup class="btn-group" :size="buttonSize">
      <Button type="primary" v-show="isEnrollTable" :size="buttonSize" @click="onEnrollTable">报名表</Button>
      <Button type="warning" v-show="isPlayerTable" :size="buttonSize" @click="onPlayerTable">选手表</Button>
      <Button type="error" v-show="isJFCard" :size="buttonSize" @click="onJFCard">积分编排卡</Button>
      <Button type="info" v-show="isScoreBulletin" :size="buttonSize" @click="onScoreBulletin">成绩公告</Button>
      <Button type="success" v-show="isAwardTable" :size="buttonSize" @click="onAwardTable">奖励签收表</Button>
    </ButtonGroup>
  </div>
</template>

<script>
// Iview Components
import { Button, ButtonGroup } from 'view-design'

export default {
  name: 'match-toolbars',
  props: {
    isEnrollTable: {
      type: Boolean,
      default: true
    },
    isPlayerTable: {
      type: Boolean,
      default: true
    },
    isJFCard: {
      type: Boolean,
      default: true
    },
    isScoreBulletin: {
      type: Boolean,
      default: true
    },
    isAwardTable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      buttonSize: 'large'
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    onEnrollTable() {
      this.$emit('onEnrollTable')
    },
    onPlayerTable() {
      this.$emit('onPlayerTable')
    },
    onJFCard() {
      this.$emit('onJFCard')
    },
    onScoreBulletin() {
      this.$emit('onScoreBulletin')
    },
    onAwardTable() {
      this.$emit('onAwardTable')
    }
  },
  beforedestroy() {},
  components: {
    Button,
    ButtonGroup
  }
}
</script>

<style lang="stylus" scoped>
</style>
