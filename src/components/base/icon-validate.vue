<template>
  <Icon
    class="icon-validate"
    type="md-checkmark-circle"
    v-show="!errors.length"
    :class="{'success': !errors.length}"
    :size="size"
  />
</template>

<script>
import { Icon } from 'view-design'

export default {
  name: 'icon-validate',
  props: {
    errors: {
      type: Array,
      default() {
        return []
      }
    },
    size: {
      type: Number,
      default: 14
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.icon-validate
  &.success
    color: $success-color
</style>
