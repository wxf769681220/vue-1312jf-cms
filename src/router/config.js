const Login = () => import('components/login')

const Home = () => import('components/home')
const VMap = () => import('components/map')
const MatchList = () => import('components/match-list')
const MatchCreate = () => import('components/match-create')

const Page1 = () => import('components/page1')
const Page2 = () => import('components/page2')
const Page3 = () => import('components/page3')
const Page4 = () => import('components/page4')
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
        path: 'match-list',
        component: MatchList
      },
      {
        path: 'match-create',
        component: MatchCreate
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
