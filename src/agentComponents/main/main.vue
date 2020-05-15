<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="msgUnreadCount" :group-unread-count="groupUnreadCount" :per-unread-count="perUnreadCount" :user-avatar="userAvatar"/>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <keep-alive>
              <router-view/>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import './main.less'
export default {
  name: 'agentMain',
  components: {
    SideMenu,
    HeaderBar,
    Fullscreen,
    User,
    ABackTop
  },
  data () {
    return {
      collapsed: false,
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters([
    ]),
    userAvatar () {
      return this.$store.state.agent1.avatarImgPath
    },
    menuList () {
      return this.$store.getters.menuList
    },
    msgUnreadCount () {
      return this.$store.state.agent1.messageUnreadCount
    },
    groupUnreadCount () {
      return this.$store.state.agent1.groupUnreadCount
    },
    perUnreadCount () {
      return this.$store.state.agent1.perUnreadCount
    }
  },
  methods: {
    ...mapMutations([
    ]),
    ...mapActions([
      'agenthandleLogin',
      'agentgetUnreadMessageCount',
      'agentgetUnreadGroupNoticeCount',
      'agentgetUnreadPerNoticeCount'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    const { name, params, query, meta } = this.$route
    // 如果当前打开页面不在标签栏中，跳到homeName页
    // 获取未读消息条数
    this.agenthandleLogin()
    this.agentgetUnreadMessageCount()
    this.agentgetUnreadGroupNoticeCount()
    this.agentgetUnreadPerNoticeCount()
  }
}
</script>
