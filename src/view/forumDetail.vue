
<template>
  <Content :style="{margin: '10px', background: '#f8f9fa', minHeight: '1000px'}">
      <List item-layout="vertical">
        <ListItem>
          <ListItemMeta title="主题帖"/>
    </ListItem>
    <Card>
      <p slot="title">{{postView.ptitle}}</p>
          <ListItemMeta :avatar="postView.uavatar" :title="postView.uname"/>
      <p>{{postView.pcontent}}</p>
    </Card>
        <ListItem>
          <ListItemMeta title="全部回复"/>
        </ListItem>
        <ListItem v-for="item in agentReplyView" :key="item.title">
    <Card>
      <p slot="title">认证经纪人</p>
          <ListItemMeta :avatar="item.avatar" :title="item.name" :description="item.rcontent" />
          {{item.rdate}}
    </Card>
        </ListItem>
        <ListItem v-for="item in userReplyView" :key="item.title">
        <Card>
          <ListItemMeta :avatar="item.avatar" :title="item.name" :description="item.rdate" />
          {{item.rcontent}}
        </Card>
        </ListItem>
        <ListItem>
          <ListItemMeta title="快来发表回复吧"/>
        </ListItem>
    <Form ref="replyPost" :rules="ruleReply" :model="reply">
      <FormItem prop="rcontent">
        <Input v-model="reply.rcontent" type="textarea" :rows="4" placeholder="Enter something..."/>
      </FormItem>
      <FormItem>
        <Button type="primary" class="submit" @click="handleSubmit('replyPost')">发表回复</Button>
      </FormItem>
    </Form>
      </List>
  </Content>
</template>
<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      ruleReply: {
        rcontent: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      postView: {},
      agentReplyView: [],
      userReplyView: [],
      reply: {
        pid: this.$route.params.pId,
        id: '',
        rcontent: ''
      }
    }
  },
  created () {
    this.GetId()
    this.GetPostView()
    this.GetAgentReplyView()
    this.GetUserReplyView()
  },
  computed: {
  },
  methods: {
    GetId () {
      this.reply.id = this.$store.state.user.userId
    },
    GetPostView () {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'forum/post',
          params: {
            pId: this.$route.params.pId
          }
        })
        .then(response => {
          this.postView = response.data
          console.log(response)
        })
    },
    GetAgentReplyView () {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'forum/reply/agent',
          params: {
            pId: this.$route.params.pId
          }
        })
        .then(response => {
          this.agentReplyView = response.data
          console.log(response)
        })
    },
    GetUserReplyView () {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'forum/reply/user',
          params: {
            pId: this.$route.params.pId
          }
        })
        .then(response => {
          this.userReplyView = response.data
          console.log(response)
        })
    },
    postUserReply () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'forum/user/reply',
          data: this.reply
        })
        .then(res => {
          console.log(res)
        })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.postUserReply()
          this.GetAgentReplyView()
          this.GetUserReplyView()
          this.$Message.success('发表成功!')
          // this.handleReset(name)
        } else {
          this.$Message.error('遇到了错误!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}
.demo-img{
  width: 100%
}
.submit {
  float: right;
}
</style>
