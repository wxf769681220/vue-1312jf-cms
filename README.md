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

#### CSS预处理器
stylus

#### 相关链接

1. vue 官方文档： https://cn.vuejs.org/
2. vue-router 官方文档: https://router.vuejs.org/zh/
3. vuex 官方文档：https://vuex.vuejs.org/zh/
4. ESLint 官方文档：https://eslint.org/
5. axios github地址：https://github.com/axios/axios
6. iview^4.0 官方文档：https://www.iviewui.com/docs/introduce
7. stylus 官方文档：https://stylus.bootcss.com/

## 工程目录

-- dist // 编译后静态文件  
-- node_modules // 依赖包  
-- src  
&ensp;&ensp;-- api ······················································ 数据通信  
&ensp;&ensp;&ensp;&ensp;-- index ·············· 入口文件  
&ensp;&ensp;&ensp;&ensp;-- config ············· 配置文件  
&ensp;&ensp;&ensp;&ensp;-- axios ·············· 配置文件  
&ensp;&ensp;-- common ··················································· 资源管理  
&ensp;&ensp;&ensp;&ensp;-- img ·············· 图片管理  
&ensp;&ensp;&ensp;&ensp;-- js ·············· 脚本管理  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- uploadExcel ·············· Excel上传与下载  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- bus.js ·············· 中央事件总线vue-bus插件封装  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- jsonp.js  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- lib.js ·············· 常用函数  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- prefix.js  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-- utils.js ············ 项目中所使用的函数  
&ensp;&ensp;&ensp;&ensp;-- less ·············· iview  
&ensp;&ensp;&ensp;&ensp;-- stylus ·············· css管理  
&ensp;&ensp;-- components ··············································· 组件管理  
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







