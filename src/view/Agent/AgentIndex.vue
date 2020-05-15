<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
          <router-link v-bind:to="'/agentindex'">
            <MenuItem name="1-1">
              <Icon type="ios-navigate"></Icon>
              <span>首页</span>
            </MenuItem>
          </router-link>
        </Menu>
      </Sider>

      <Layout>
        <Header :style="{padding: 0}" class="layout-header">
          <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
            <agent
              :message-unread-count="msgUnreadCount"
              :group-unread-count="groupUnreadCount"
              :per-unread-count="perUnreadCount"
              :user-avatar="userAvatar"
            />
          </header-bar>
        </Header>
        <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
        <Content :style="{margin: '100px', background: '#f8f9fa', minHeight: '1000px'}">
          <Form :model="post" label-position="left" :rules="dataRules" :label-width="100">
            <FormItem label="eid" prop="eid">
                <Input v-model="post.eid" type="number"></Input>
            </FormItem>
            <FormItem label="aid" prop="aid">
                <Input v-model="post.aid" type="number"></Input>
            </FormItem>
            <FormItem label="hname" prop="hname">
                <Input v-model="post.hname"></Input>
            </FormItem>
            <FormItem label="hprice" prop="hprice">
                <Input v-model="post.hprice" type="number"></Input>
            </FormItem>
            <FormItem label="haddress" prop="haddress">
                <Input v-model="post.haddress"></Input>
            </FormItem>
            <FormItem label="hsquare" prop="hsquare">
                <Input v-model="post.hsquare" type="number"></Input>
            </FormItem>
            <FormItem label="himage" prop="himage">
                <Input v-model="post.himage"></Input>
            </FormItem>
            <FormItem label="hinfo" prop="hinfo">
                <Input v-model="post.hinfo"></Input>
            </FormItem>
            <FormItem label="hbriefinfo" prop="hbriefinfo">
                <Input v-model="post.hbriefinfo"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="PostHouse()">Submit</Button>
              </FormItem>
            <FormItem>
                <Button type="primary" @click="updateHouse()">test</Button>
              </FormItem>
        </Form>
        {{post}}
        <Form :model="update" label-position="left" :rules="dataRules" :label-width="100">
            <FormItem label="hid" prop="hid">
                <Input v-model="update.hid" type="number"></Input>
            </FormItem>
            <FormItem label="hname" prop="hname">
                <Input v-model="update.hname"></Input>
            </FormItem>
            <FormItem label="hprice" prop="hprice">
                <Input v-model="update.hprice" type="number"></Input>
            </FormItem>
            <FormItem label="haddress" prop="haddress">
                <Input v-model="update.haddress"></Input>
            </FormItem>
            <FormItem label="hsquare" prop="hsquare">
                <Input v-model="update.hsquare" type="number"></Input>
            </FormItem>
            <FormItem label="himage" prop="himage">
                <Input v-model="update.himage"></Input>
            </FormItem>
            <FormItem label="hinfo" prop="hinfo">
                <Input v-model="update.hinfo"></Input>
            </FormItem>
            <FormItem label="hbriefinfo" prop="hbriefinfo">
                <Input v-model="update.hbriefinfo"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="updateHouse()">test</Button>
              </FormItem>
        </Form>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import HeaderBar from '@/components/main/components/header-bar'
import Agent from '@/components/main/components/agent'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AgentIndex',
  components: {
    HeaderBar,
    Agent
  },
  data () {
    return {
      collapsed: false,
      update: {
        hid: 0,
        hname: '',
        hprice: 0,
        haddress: '',
        hsquare: 0,
        himage: '',
        hinfo: '',
        hbriefinfo: ''
      },
      post: {
        eid: 0,
        aid: 0,
        hname: '',
        hprice: 0,
        haddress: '',
        hsquare: 0,
        himage: '',
        hinfo: '',
        hbriefinfo: ''
      },
      dataRules: {
        eid: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'number', message: '', trigger: 'blur' }
        ],
        aid: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'number', message: '', trigger: 'blur' }
        ],
        hname: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'string', message: '', trigger: 'blur' }
        ],
        hprice: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'number', message: '', trigger: 'blur' }
        ],
        haddress: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'string', message: '', trigger: 'blur' }
        ],
        hsquare: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'number', message: '', trigger: 'blur' }
        ],
        himage: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'string', message: '', trigger: 'blur' }
        ],
        hinfo: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'string', message: '', trigger: 'blur' }
        ],
        hbriefinfo: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
          { type: 'string', message: '', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([]),
    userAvatar () {
      return this.$store.state.agent.avatarImgPath
    },
    msgUnreadCount () {
      return this.$store.state.agent.messageUnreadCount
    },
    groupUnreadCount () {
      return this.$store.state.agent.groupUnreadCount
    },
    perUnreadCount () {
      return this.$store.state.agent.perUnreadCount
    }
  },
  methods: {
    ...mapActions([
      'getAgentFromCache',
      'agentgetUnreadMessageCount',
      'agentgetUnreadGroupNoticeCount',
      'agentgetUnreadPerNoticeCount'
    ]),
    agentlogout () {
      console.log(this.$store.state.user.uname) // 控制台打印日志
      window.localStorage.clear() // 清除所有缓存
      this.$router.replace({ path: '/agentlogin' })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    PostHouse () {
      var postData = this.$qs.stringify({
        eid: this.post.eid,
        aid: this.post.aid,
        hname: this.post.hname,
        hprice: this.post.hprice,
        haddress: this.post.haddress,
        hsquare: this.post.hsquare,
        himage: this.post.himage,
        hinfo: this.post.hinfo,
        hbriefinfo: this.post.hbriefinfo
      })
      var that = this
      that
        .$axios({
          method: 'put',
          url: 'house/post',
          data: postData
        })
        .then(res => {
          this.house = res.data.content
          console.log(res)
        })
    },
    updateHouse () {
      var post = this.$qs.stringify(this.update)
      var that = this
      that
        .$axios({
          method: 'put',
          url: 'house/update',
          data: post
        })
        .then(res => {
          console.log(res)
        })
    }
  },
  mounted () {
    this.getAgentFromCache()
    this.agentgetUnreadMessageCount()
    this.agentgetUnreadGroupNoticeCount()
    this.agentgetUnreadPerNoticeCount()
  }
}
</script>

<style scoped>
  .main-layout-con{
    height: 100%;
    overflow: hidden;
  }
  .main-content-con{
    height: ~"calc(100% - 60px)";
    overflow: hidden;
  }
  .tag-nav-wrapper{
    padding: 0;
    height:40px;
    background:#F0F0F0;
  }
  .content-wrapper{
    padding: 18px;
    height: ~"calc(100% - 80px)";
    overflow: auto;
  }
.user_avatar {
  float: right;
}
</style>
