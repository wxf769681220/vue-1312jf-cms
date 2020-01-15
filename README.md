开发文档
=========================================

#### 开发环境

1. node ^10
2. vue-cli3 脚手架
3. ES6 语法

## 技术栈

#### vue/vue路由/vue状态管理
vue^2.0 + vue-router^3.0 + vuex^3.0

#### 代码检测工具
ESLint

#### 数据通信
axios^0.16.1

#### UI框架
iview^4.0

#### 表单验证
vee-validate^3.0

#### CSS预处理器
stylus、less

#### 相关链接

1. vue 官方文档： https://cn.vuejs.org/
2. vue-router 官方文档: https://router.vuejs.org/zh/
3. vuex 官方文档：https://vuex.vuejs.org/zh/
4. ESLint 官方文档：https://eslint.org/
5. axios github地址：https://github.com/axios/axios
6. iview^4.0 官方文档：https://www.iviewui.com/docs/introduce
7. vee-validate github地址：https://github.com/logaretm/vee-validate
8. stylus 官方文档：https://stylus.bootcss.com/

### 系统功能模块
* 登录模块  
* 比赛管理  
   -- 创建比赛  
   -- 获取比赛列表  
   -- 比赛报名  
   -- 比赛签到
   -- 手机端报名审核  
   -- excel报名表导入  
   -- excel下载  
   -- 新增数据  
   -- 修改数据  
   -- 删除数据  
   -- 换座  
   -- 桌位按选手号排序  
   -- 成绩排名按地区/单位排序
   -- excel下载  
* 定时器

## 工程目录

-- dist // 编译后静态文件  
-- node_modules // 依赖包  
-- src  // 项目核心文件  
&ensp;&ensp;-- api ·································································································· 数据通信  
&ensp;&ensp;&ensp;&ensp;-- index ·············· 入口文件  
&ensp;&ensp;&ensp;&ensp;-- config ············· 配置文件  
&ensp;&ensp;&ensp;&ensp;-- axios ·············· 配置文件  
&ensp;&ensp;-- common ························································································· 资源管理  
&ensp;&ensp;&ensp;&ensp;-- img ·············· 图片管理  
&ensp;&ensp;&ensp;&ensp;-- js ··············· 脚本管理  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- uploadExcel ·············· Excel导入与数据获取  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- bus.js ·············· 中央事件总线vue-bus插件封装  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- jsonp.js  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- lib.js ·············· 常用函数  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- prefix.js  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- utils.js ············ 项目中所使用的函数  
&ensp;&ensp;&ensp;&ensp;-- less ·············· iview  
&ensp;&ensp;&ensp;&ensp;-- stylus ·············· css管理  
&ensp;&ensp;-- components ·········································································· 组件管理  
&ensp;&ensp;&ensp;&ensp;-- base ············ 基础组件  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- print-view.vue ············ 打印  
&ensp;&ensp;&ensp;&ensp;-- body ············ 放置在body下的组件  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- enroll-add.vue ············ 新增数据  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- enroll-modify.vue ········· 修改数据  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- tables-score.vue ·········· 当前桌  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- upload-table.vue ·········· excel上传  
&ensp;&ensp;&ensp;&ensp;-- module ···········功能组件  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- enroll-table.vue ·········· 报名表  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- jfcard-table.vue ·········· 积分编排卡  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- match-card.vue  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- match-info.vue ············ 本场比赛基本信息  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- match-toolbars.vue ········ 工具栏按钮组（本场比赛）  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- player-table.vue ·········  选手表  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- record-table.vue ·········· 比赛记录表  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- rounds-score.vue ·········· 本轮成绩  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- score-entering.vue ·········成绩录入  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- rounds-score.vue ·········· 本轮成绩  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- score-setting.vue ········· 设置当前桌成绩  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- score-table.vue ··········· 成绩公告  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- signature-table.vue ······· 奖励签收表  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- tables-card.vue ··········· 当前桌次  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- tables-list.vue ··········· 本轮桌次  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- toolbars-table.vue ········ 工具栏按钮组（表）  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- verify-table.vue ·········· 报名审核表  
&ensp;&ensp;&ensp;&ensp;--- current-round.vue ············ 本场比赛当前轮  
&ensp;&ensp;&ensp;&ensp;--- home.vue ············· 首页  
&ensp;&ensp;&ensp;&ensp;--- login.vue ············ 登录页  
&ensp;&ensp;&ensp;&ensp;--- map.vue ·············· 仪表盘  
&ensp;&ensp;&ensp;&ensp;--- match-create.vue ····· 创建比赛  
&ensp;&ensp;&ensp;&ensp;--- match-enroll.vue ····· 比赛报名  
&ensp;&ensp;&ensp;&ensp;--- match-entry.vue ······ 比赛开始  
&ensp;&ensp;&ensp;&ensp;--- match-lst.vue ········ 比赛列表  
&ensp;&ensp;&ensp;&ensp;--- timer.vue ············ 计时器  
-- .browserslistrc  
-- .editorconfig  
-- .eslintrc // eslit配置文件  
-- .gitignore  
-- babel.config  
-- package-lock.json  
-- package.json // 项目基本信息  
-- postcss.config  
-- README.md  
-- vue.config // webpack配置文件  

## 数据通信方式

1. 父子关系组件，父组件可以使用 props 把数据传给子组件
2. 父子关系组件，子组件可以使用 $emit 触发父组件的自定义事件
3. 非父子关系组件，当前组件可以使用中央事件总线 $bus.$emit 的方式向外派发自定义事件，目标组件使用 $bus.$on 监听自定义的事件
4. 通过带参路由获取数据 （this.$route.query / params）
5. 通过调用api接口获取数据

## 资源配置

#### webpack 配置文件 vue.config.js

`使用 vue-cli3.0 脚手架创建 vue 项目需要手动创建 vue.config.js 文件，其相关配置如下：`  

1. iview 相关配置
2. 针对 moment 插件语言包优化
3. 通过 config.resolve.alias 配置别名（如：访问 src/api 时，可以直接访问 api）

#### ESLint 配置文件 .eslintrc.js

`项目使用 eslint 做代码检查工具，如需要关闭某条规则只需将此规则值为 0 即可。`  

#### package.json

`使用 npm 下载三方库的时都会在package.json 中生成 devDependencies 或者 dependencies`
`devDependencies：开发环境使用`
`dependencies：生产环境使用`

#### 项目入口文件 main.js

1. 引入默认配置 （vue/app/router/store）
2. 引入自定义全局css样式表：import 'common/stylus/index.styl'
3. 引入excel相关操作文件 import 'common/js/uploadExcel/Blob' / import 'common/js/uploadExcel/Export2Excel'
4. 引入 iview 相关配置
5. 引入自定义插件vue-bus： import bus from 'common/js/bus'

#### vue-router 路由配置

1. index.js ·········· 入口文件
2. config.js ········· 配置文件

#### vuex 状态管理配置

1. index.js ·········· 入口文件
2. action.js ········· 异步操作数据
3. mutations.js ······ 操作数据
4. state.js ·········· 存值
5. getters.js ········ 取值


`项目使用 vuex 默认提供的语法糖：`  
存值时使用：  
...mapMutations({  
&ensp;&ensp;setToken: 'SET_TOKEN'  
})  
this.setToken(token)  

取值时在 computed 计算属性中使用：  
computed: {  
&ensp;&ensp;...mapGetters([  
&ensp;&ensp;&ensp;&ensp;'token'  
&ensp;&ensp;])  
}  

#### iview^4.0 配置

1. 项目使用 iview^4.0 版本, 借助插件 babel-plugin-import 实现按需加载组件，减少文件体积。
2. 在 main.js 中引入 全局样式文件 custom.less, 对相关组件进行配置
3. 如实现按需引入还需要在 babel.config 中配置
4. 组件内通过 import { Butto } from 'view-design' 调用相关组件

#### 


















