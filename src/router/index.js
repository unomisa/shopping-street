import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart.vue')
const Category = () => import('views/category/Category.vue')

const Profile = () => import('views/profile/Profile.vue')
const Setting = () => import('views/profile/childComps/ProfileSetting')

const Detail = () => import('views/detail/Detail')
const Login = () => import('views/Login/Login')
const Indent = () => import('views/Indent/Indent')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/shopcart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    },
    children: [
      {
        path: 'setting',
        component: Setting,
        meta: {
          title: '设置'
        }
      }
    ]
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/indent',
    component: Indent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
