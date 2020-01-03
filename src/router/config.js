const Login = () => import('components/login')

const Home = () => import('components/home') // 首页
const VMap = () => import('components/map') // 仪表盘
const Timer = () => import('components/timer') // 计时器
const MatchCreate = () => import('components/match-create') // 创建比赛
const MatchList = () => import('components/match-list') // 比赛列表
const MatchEnroll = () => import('components/match-enroll') // 比赛报名
const MatchEntry = () => import('components/match-entry') // 进入比赛
const CurrentRound = () => import('components/current-round') // 当前轮次

// 测试页
const Page1 = () => import('components/page1')

// 测试页
const Test = () => import('components/base/test')
const PrintView = () => import('components/base/print-view')

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
        path: 'timer',
        component: Timer
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
        path: 'match-entry/:id/',
        component: MatchEntry,
        children: [
          {
            path: ':round',
            component: CurrentRound
          }
        ]
      }
    ]
  },
  {
    path: '/page1',
    component: Page1
  },
  {
    path: '/test',
    component: Test
  },
  {
    path: '/printView',
    component: PrintView
  }
]

export default routes
