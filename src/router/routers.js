import Main from '@/components/main'
import agentMain from '@/agentComponents/main'
import AdminLogin from '@/view/Login/AdminLogin'
import AgentLogin from '@/view/Login/AgentLogin'
import UserLogin from '@/view/Login/UserLogin'
import LoginIndex from '@/view/Login/LoginIndex'
import AdminIndex from '@/view/Admin/AdminIndex'
import SearchUser from '@/view/Admin/AccountManagement/UserMgmt/SearchUser'
import SearchAgent from '@/view/Admin/AccountManagement/AgentMgmt/SearchAgent'
import MechanismAudit from '@/view/Admin/MechanismManagement/MechanismAudit'
import Messages from '@/view/Admin/MessageManagement/Messages'
import News from '@/view/Admin/MessageManagement/News'
import UserRegister from '@/view/Register/UserRegister'
import AgentRegister from '@/view/Register/AgentRegister'
import AddMechanism from '@/view/Admin/MechanismManagement/AddMechanism'
import UserIndex from '@/view/User/UserIndex'
import AgentIndex from '@/view/Agent/AgentIndex'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [

  {
    path: '/post',
    name: 'post',
    meta: {
      title: '测试',
      hideInMenu: true
    },
    component: () => import('@/view/postTest.vue')
  },

  {
    path: '/home',
    name: '导航',
    redirect: '/home',
    component: Main,
    meta: {
      icon: 'ios-navigate',
      title: '导航'
    },
    children: [
      {
        path: '/home',
        name: '主页',
        meta: {
          icon: 'logo-markdown',
          title: '主页'
        },
        component: () => import('@/view/home.vue')
      },
      {
        path: '/news',
        name: '新闻',
        meta: {
          icon: 'logo-markdown',
          title: '新闻'
        },
        component: () => import('@/view/news.vue')
      },
      {
        path: 'house',
        name: '房源大全',
        meta: {
          icon: 'logo-markdown',
          title: '房源大全'
        },
        component: () => import('@/view/browse.vue')
      },
      {
        path: 'forum',
        name: '论坛',
        meta: {
          icon: 'logo-markdown',
          title: '论坛'
        },
        component: () => import('@/view/forum.vue')
      },
      {
        path: '/house/:hId',
        name: 'house',
        meta: {
          title: '房源详情',
          hideInMenu: true
        },
        component: () => import('@/view/houseDetail.vue')
      },
      {
        path: '/forum/:pId',
        name: 'forumDetail',
        meta: {
          title: '帖子详情',
          hideInMenu: true
        },
        component: () => import('@/view/forumDetail.vue')
      },
      {
        path: '/agent/:aId',
        name: 'agent',
        meta: {
          title: '经纪人详情',
          hideInMenu: true
        },
        component: () => import('@/view/agentRating.vue')
      }
    ]
  },
  {
    path: '/search',
    name: '搜索',
    meta: {
      icon: 'ios-search',
      title: '搜索'
    },
    component: Main,
    children: [
      {
        path: '/search/house',
        name: '房源搜索',
        meta: {
          icon: 'ios-document',
          title: '房源搜索'
        },
        component: () => import('@/view/searchHouse.vue')
      },
      {
        path: '/search/estate',
        name: '小区搜索',
        meta: {
          icon: 'md-clipboard',
          title: '小区搜索'
        },
        component: () => import('@/view/searchEstate.vue')
      },
      {
        path: '/estate/:eid',
        name: 'estateDetail',
        meta: {
          title: '小区详情',
          hideInMenu: true
        },
        component: () => import('@/view/estateDetail.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/message.vue')
      },
      {
        path: 'group_page',
        name: 'group_page',
        meta: {
          icon: 'md-notifications',
          title: '系统消息'
        },
        component: () => import('@/view/groupNotice.vue')
      },
      {
        path: 'per_page',
        name: 'per_page',
        meta: {
          icon: 'md-notifications',
          title: '个人消息'
        },
        component: () => import('@/view/perNotice.vue')
      }
    ]
  },
  {
    path: '/adminindex',
    name: 'AdminIndex',
    component: AdminIndex,
    meta: {
      requireAdminAuth: true,
      hideInMenu: true
    },
    children: [ // 子路由
      // 客户
      { path: 'searchuser', component: SearchUser },

      // 中介人
      { path: 'searchagent', component: SearchAgent },

      // 审核
      { path: 'mechanismaudit', component: MechanismAudit },

      // 消息
      { path: 'messages', component: Messages },
      { path: 'news', component: News }
    ]
  },
  {
    path: '/agentindex',
    name: 'AgentIndex',
    component: AgentIndex,
    meta: {
      requireAgentAuth: true,
      hideInMenu: true
    },
    children: [ // 子路由
      // 客户
      { path: 'agent_message',
        name: 'agent_message',
        meta: {
          icon: 'md-notifications',
          title: '个人消息'
        },
        component: () => import('@/view/agentMsg.vue') },
      { path: 'agent_group',
        name: 'agent_group',
        meta: {
          icon: 'md-notifications',
          title: '系统消息'
        },
        component: () => import('@/view/agentGroupNotice.vue') },
      { path: 'agent_per',
        name: 'agent_per',
        meta: {
          icon: 'md-notifications',
          title: '个人消息'
        },
        component: () => import('@/view/agentPerNotice.vue') }
    ]
  },
  {
    path: '/',
    name: 'LoginIndex',
    component: LoginIndex,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/adminlogin',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/agentlogin',
    name: 'AgentLogin',
    component: AgentLogin,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/userlogin',
    name: 'UserLogin',
    component: UserLogin,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/userregister',
    name: 'UserRegister',
    component: UserRegister,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/agentregister',
    name: 'AgentRegister',
    component: AgentRegister,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/addmechanism',
    name: 'AddMechanism',
    component: AddMechanism,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
