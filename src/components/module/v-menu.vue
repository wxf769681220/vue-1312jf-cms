<template>
  <ul class="nav v-menu">
    <li v-for="item in data" :key="item.name">
      <router-link :to="{path: item.url}">
        <Icon class="mr-1" :type="ios-navigate" v-if="hasIcon"></Icon>
        <span>{{item.name}}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
// Iview Components
import { Icon } from 'view-design'

export default {
  name: 'v-menu',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    hasIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {},
  beforedestroy() {},
  components: {
    Icon
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.v-menu
  a
    display: block
    padding: 0 20px
    height: 100%
    color: $text-color
    &:hover
      color: $link-color
      border-bottom: 2px solid $link-color
    &.active
      color: $link-color
      border-bottom: 2px solid $link-color
</style>
