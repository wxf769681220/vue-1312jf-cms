<template>
  <div class="home" v-if="token">
    <Layout>
      <!-- 左侧边栏 -->
      <Sider
        class="sider"
        ref="sider"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        @on-collapse="collapsed"
      >
        <!-- logo -->
        <div class="logo">
          <img
            class="block mr-1"
            src="~common/img/logo.png"
            width="50"
            height="50"
            :style="logoStyle"
          >
        </div>
        <!-- 导航菜单 -->
        <Menu
          class="menu"
          width="auto"
          theme="light"
          active-name="仪表盘"
          :accordion="true"
          :class="menuitemClasses"
          @on-open-change="menuOpenChange"
        >
          <!-- 不含子菜单项 -->
          <MenuItem v-for="item in menu1" :key="item.name" :name="item.name" :to="{path: item.url}">
            <Icon :type="item.icon"></Icon>
            <span>{{item.name}}</span>
          </MenuItem>

          <!-- 含子菜单项 -->
          <Submenu v-for="item in menu2" :key="item.name" :name="item.name">
            <template slot="title">
              <Icon :type="item.icon"/>
              <span>{{item.name}}</span>
            </template>
            <div v-show="!isSider">
              <MenuItem
                v-for="child in item.children"
                :key="child.name"
                :name="child.name"
                :to="{path: child.url}"
              >{{child.name}}</MenuItem>
            </div>
          </Submenu>
        </Menu>
      </Sider>
      <!-- 右侧内容区域 -->
      <Layout class="layout-inside" :style="{'padding-left': layoutSiderLeft}">
        <!-- 顶部固定导航区块-->
        <Header class="layout-header-bar" :style="{padding: 0}">
          <Icon @click.native="collapsedSider" :class="rotateIcon" type="md-menu" size="24"></Icon>
          <v-menu :data="pageMenu" :hasIcon="false"></v-menu>
          <div class="user-info">
            <span @click="onQuit">安全退出</span>
            <div class="cirle-box">
              <img src="~common/img/avata.jpg" alt="用户头像">
            </div>
            <span class="fs">{{user.mobile}}</span>
          </div>
        </Header>
        <!-- 子路由渲染出口 -->
        <Content class="view">
          <router-view></router-view>
          <!-- <div class="page">
            <div class="list-group">
              <div class="list-group-item" v-for="item in list" :key="item">{{item}}</div>
            </div>
          </div>-->
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import VMenu from 'components/module/v-menu'
import {
  Layout,
  Header,
  Sider,
  Icon,
  Content,
  Menu,
  MenuItem,
  Submenu
} from 'view-design'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'home',
  props: {},
  data() {
    return {
      isCollapsed: false,
      isSider: false,
      pageMenu: [
        {
          name: '首页',
          url: '/home'
        },
        {
          name: 'page1',
          url: '/page1'
        },
        {
          name: 'page2',
          url: '/page2'
        },
        {
          name: 'page3',
          url: '/page3'
        },
        {
          name: 'page4',
          url: '/page4'
        }
      ],
      menu1: [
        {
          name: '仪表盘',
          url: '/home/map',
          icon: 'ios-navigate'
        },
        {
          name: 'Option 1',
          url: '/option1',
          icon: 'ios-navigate'
        },
        {
          name: 'Option 2',
          url: '/option2',
          icon: 'ios-search'
        },
        {
          name: '计时器',
          url: '/option3',
          icon: 'ios-settings'
        }
      ],
      menu2: [
        {
          name: '赛事管理',
          url: '/option1',
          icon: 'ios-paper',
          children: [
            {
              name: '创建比赛',
              url: '/home/match-create',
              icon: 'ios-paper',
              children: []
            },
            {
              name: '比赛列表',
              url: '/home/match-list',
              icon: 'ios-paper',
              children: []
            }
          ]
        },
        {
          name: '用户管理',
          url: '/option2',
          icon: 'ios-paper',
          children: [
            {
              name: '新增用户',
              url: '/test',
              icon: 'ios-paper',
              children: []
            },
            {
              name: '活跃用户',
              url: '/test',
              icon: 'ios-paper',
              children: []
            },
            {
              name: '流失用户',
              url: '/test',
              icon: 'ios-paper',
              children: []
            },
            {
              name: '用户留存',
              url: '/test',
              icon: 'ios-paper',
              children: []
            }
          ]
        },
        {
          name: '统计分析',
          url: '/option3',
          icon: 'ios-paper',
          children: [
            {
              name: '活跃分析',
              url: '/test',
              icon: 'ios-paper',
              children: []
            },
            {
              name: '时段分析',
              url: '/test',
              icon: 'ios-paper',
              children: []
            }
          ]
        }
      ],
      user: {
        mobile: ''
      }
    }
  },
  computed: {
    ...mapGetters(['token', 'mobile']),
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
    layoutSiderLeft() {
      return this.isSider ? '78px' : '200px'
    },
    logoStyle() {
      return this.isSider
        ? { width: '30px', height: '30px' }
        : { width: '50px', height: '50px' }
    }
  },
  watch: {
    '$store.token'() {
      console.log('ok123')
    }
  },
  mounted() {},
  created() {
    // 检测登录状态
    this.loggedin()
  },
  methods: {
    collapsed(value) {
      // console.log(value)
      this.isSider = value
    },
    collapsedSider() {
      this.$refs.sider.toggleCollapse()
    },
    menuOpenChange(value) {
      // console.log(value)
    },
    loggedin() {
      if (this.token) {
        this.user.mobile = this.mobile
      } else {
        this.$Message.warning({
          content: '系统检测到您还未登录!',
          top: 50,
          duration: 3
        })
        this.$router.push({
          path: '/login'
        })
      }
    },
    ...mapMutations(['SET_QUIT']),
    onQuit() {
      console.log(this.$store.state.token)
      this.SET_QUIT()
      if (!this.$store.state.token) {
        this.$router.push('/login')
      }
    }
  },
  beforedestroy() {},
  components: {
    Layout,
    Header,
    Sider,
    Icon,
    Content,
    Menu,
    MenuItem,
    Submenu,
    VMenu
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.home
  position: relative
  overflow: hidden
  .sider
    position: fixed
    height: 100vh
    top: 0
    left: 0
    z-index: 2
    -ms-overflow-style: none
    overflow: -moz-scrollbars-none
    overflow: auto
    &::-webkit-scrollbar
      width: 0 !important
    .logo
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      height: 64px
      line-height: 64px
      text-align: center
      color: $text-color
      background-color: $white
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1)
    .menu
      >>>.ivu-menu
        background-color: #000
  .layout-inside
    padding-left: 200px
    transition: all 0.2s ease-in-out
    .layout-header-bar
      position: fixed
      top: 0
      z-index: 1
      display: flex
      align-items: center
      padding: 0
      width: 100%
      background-color: $white
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1)
      .menu-icon
        margin: 0 20px
        transition: all 0.3s
      .rotate-icon
        transform: rotate(-90deg)
      .user-info
        position: fixed
        top: 0
        right: 20px
        display: flex
        align-items: center
        .cirle-box
          position: relative
          margin-right: 8px
          width: 34px
          height: 34px
          border-radius: 50%
          overflow: hidden
          img
            position: absolute
            top: 0
            display: block
            width: 100%
            height: 100%
        .fs
          font-size: $font-size-large
          font-weight: 600
          color: $warning-color
    .view
      padding-top: 64px
      min-height: 100vh
      .page
        margin: 20px
        background-color: $white
        .list-group-item
          line-height: 60px
.layout-logo-left
  width: 90%
  height: 30px
  background: #5b6270
  border-radius: 3px
  margin: 15px auto
.menu-icon
  transition: all 0.3s
.rotate-icon
  transform: rotate(-90deg)
.menu-item span
  display: inline-block
  overflow: hidden
  width: 69px
  text-overflow: ellipsis
  white-space: nowrap
  vertical-align: bottom
  transition: width 0.2s ease 0.2s
.menu-item i
  transform: translateX(0px)
  transition: font-size 0.2s ease, transform 0.2s ease
  vertical-align: middle
  font-size: 16px
.collapsed-menu span
  width: 0px
  transition: width 0.2s ease
.collapsed-menu i
  transform: translateX(5px)
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s
  vertical-align: middle
  font-size: 22px
</style>
