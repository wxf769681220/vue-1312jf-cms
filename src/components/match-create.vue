<template>
  <div class="match-create">
    <ValidationObserver class="form" ref="observer" tag="form" v-slot="{ valid }">
      <!-- 用户名 -->
      <validation-provider
        class="form-group"
        name="matchName"
        tag="div"
        rules="required"
        v-slot="{ errors }"
      >
        <div class="input-group">
          <div class="input-wrap">
            <input class="input-control" type="text" placeholder="比赛名称" v-model="matchInfo.name">
          </div>
        </div>
      </validation-provider>

      <!-- 登录按钮 -->
      <Button
        class="btn-create"
        type="success"
        :long="true"
        :disabled="!valid"
        @click="onBtnCreate"
      >
        <span>创建</span>
      </Button>
    </ValidationObserver>
  </div>
</template>

<script>
import { Button } from 'view-design'
// ES6+ Add a rule.
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import ZHCN from 'vee-validate/dist/locale/zh_CN'

export default {
  name: 'match-create',
  props: {},
  data() {
    return {
      matchInfo: {
        name: ''
      }
    }
  },
  computed: {
    // ...mapGetters([''])
  },
  watch: {},
  mounted() {},
  created() {
    // this.getMatchList()
    this.checkInput()
  },
  methods: {
    // getMatchList() {
    //   getMatch({ page: 1, pagecount: 12 }, this.token).then(res => {
    //     console.log(res)
    //     if (res.code === 200) {
    //       this.matchList = res.matches
    //     }
    //   })
    // }
    onBtnCreate() {},
    checkInput() {
      extend('required', {
        ...required,
        message: ZHCN.messages['required']
      })
    }
  },
  beforedestroy() {},
  components: {
    ValidationObserver,
    ValidationProvider,
    Button
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-create
  margin: 20px
  background-color: $white
  .form
    display: block
    padding: 20px 15px
    width: 352px
    height: auto
    background-color: $white
    border: 1px solid $border-color
    h2
      letter-spacing: 0.2em
    .form-group
      margin-bottom: 15px
    .input-group
      display: flex
      align-items: center
    .input-wrap
      position: relative
      display: flex
      flex: 0 0 320px
      width: 320px
      &.wid
        margin-right: 10px
        flex: 0 0 auto
        width: auto
      .input-control
        padding: 6px 34px 6px 12px
        flex: 1 1 auto
        width: auto
        min-height: 40px
        line-height: 24px
        &.invalid
          border: 1px solid red
          box-shadow: none
      .icon-validate-wrap
        position: absolute
        top: 11px
        right: 8px
    .error-tip
      flex: 1 1 auto
      margin-left: 10px
      color: $error-color
  .btn-create
    display: block
    width: 320px
    height: 40px
    font-size: $font-size-large
    font-weight: 600
    letter-spacing: 0.2em
</style>
