const Login = () => import('components/login')

const Home = () => import('components/home') // 首页
const VMap = () => import('components/map') // 仪表盘
const MatchCreate = () => import('components/match-create') // 创建比赛
const MatchList = () => import('components/match-list') // 比赛列表
const MatchEnroll = () => import('components/match-enroll') // 比赛报名
const MatchEntry = () => import('components/match-entry') // 进入比赛

// 待开发页预留位
const Page1 = () => import('components/page1')
const Page2 = () => import('components/page2')
const Page3 = () => import('components/page3')
const Page4 = () => import('components/page4')

// 测试页
const Test = () => import('components/base/test')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home/',
    component: Home,
    children: [
      {
        path: 'map',
        component: VMap
      },
      {
        path: 'match-create',
        component: MatchCreate
      },
      {
        path: 'match-list',
        component: MatchList
      },
      {
        path: 'match-enroll/:id',
        component: MatchEnroll
      },
      {
        path: 'match-entry/:id',
        component: MatchEntry
      }
    ]
  },
  {
    path: '/page1',
    component: Page1
  },
  {
    path: '/page2',
    component: Page2
  },
  {
    path: '/page3',
    component: Page3
  },
  {
    path: '/page4',
    component: Page4
  },
  {
    path: '/test',
    component: Test
  }
]

export default routes
