<template>
  <Content :style="{background: '#f8f9fa', minHeight: '1000px'}">
    <List item-layout="vertical">
      <ListItem v-for="item in PostView" :key="item.title">
        <router-link :to="{name:'forumDetail', params: {pId: item.pid}}">
          <!-- <button  @click="toHouse(item.hid)">click</button> -->
          <Card style="width:1000px;height:200px">
            <ListItemMeta :avatar="item.uavatar" :title="item.ptitle" :description="item.uname" />
            发布日期: {{item.pdate}}
          </Card>
        </router-link>
      </ListItem>
    <Page
      :current="page.pageNumber+1"
      :total="page.totalElements"
      :page-size="page.pageSize"
      show-total
      @on-change="pIndexChange"
    />
      <ListItem>
          <ListItemMeta title="快来发帖吧"/>
        </ListItem>
    <Form ref="post" :rules="rulePost" :model="post">
      标题
      <FormItem prop="ptitle">
        <Input v-model="post.ptitle" placeholder="Enter something..."/>
      </FormItem>
      内容
      <FormItem prop="pcontent">
        <Input v-model="post.pcontent" type="textarea" :rows="4" placeholder="Enter something..."/>
      </FormItem>
      <FormItem>
        <Button type="primary" class="submit" @click="handleSubmit('post')">发表</Button>
      </FormItem>
    </Form>
    {{post}}
    </List>
  </Content>
</template>
<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      rulePost: {
        ptitle: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        pcontent: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      post: {
        uid: '',
        ptitle: '',
        pcontent: ''
      },
      PostView: [],
      page: {
        pageNumber: '',
        totalElements: '',
        totalPages: '',
        pageSize: ''
      }
    }
  },
  created () {
    this.GetId()
    this.GetPostView(0)
  },
  computed: {},
  methods: {
    GetId () {
      this.post.uid = this.$store.state.user.userId
    },
    GetPostView (page) {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'forum/' + page
        })
        .then(response => {
          this.PostView = response.data.content
          this.page.pageNumber = response.data.pageable.pageNumber
          this.page.totalPages = response.data.totalPages
          this.page.totalElements = response.data.totalElements
          this.page.pageSize = response.data.pageable.pageSize
          console.log(response)
        })
    },
    pIndexChange (pageNum) {
      this.GetPostView(pageNum - 1)
    },
    postPost () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'forum/post',
          data: this.post
        })
        .then(res => {
          console.log(res)
        })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.postPost()
          this.GetPostView(0)
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
.submit {
  float: right;
}
</style>
