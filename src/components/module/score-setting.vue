<template>
  <RadioGroup class="score-setting" v-model="score" type="button" :size="size">
    <Radio :label="index" v-for="(item,index) in data" :key="item">{{item}}</Radio>
  </RadioGroup>
</template>

<script>
// Iview Components
import { RadioGroup, Radio } from 'view-design'

export default {
  name: 'score-setting',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    size: {
      type: String,
      default: 'default'
    },
    finalScore: {
      type: Number,
      default: 404
    }
  },
  data() {
    return {
      score: 0
    }
  },
  watch: {
    score(val) {
      this.$emit('score', val)
    },
    finalScore(val) {
      if (val === 404) {
        this._initData()
      } else {
        this.score = val
      }
    }
  },
  methods: {
    setScore() {
      this.score = this.finalScore
    },
    _initData() {
      this.score = 0
    }
  },
  components: {
    RadioGroup,
    Radio
  }
}
</script>
