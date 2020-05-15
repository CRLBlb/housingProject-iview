<template>
  <Content :style="{margin: '50px', background: '#f8f9fa', minHeight: '1000px'}">
    <!-- <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}"> -->
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>详情</BreadcrumbItem>
    </Breadcrumb>
    <!-- <Card style="width:500px;height:400px"> -->
    <div style="font-size:30px">{{estateDetail.ename}}</div>
    <br>
    <img class="demo-img" :src="estateDetail.eimage" />
    <template>
      <List item-layout="vertical">
        <br>
        <div style="font-size:30px">均价:{{estateDetail.eavgprice}}万</div>
        <ListItem>
          <ListItemMeta title="房屋简介" :description="estateDetail.einfo" />
        </ListItem>
        <ListItem>
          <ListItemMeta title="地址" :description="estateDetail.eaddress" />
          <card>
            <p slot="title">地图</p>
            <baidu-map
            :center="center"
            :zoom="zoom"
            :dragging="true"
            class="map"
            @ready="handler"
            >
            <bm-marker :position="{lng:center.lng, lat: center.lat}" :dragging="true">
              <bm-info-window :show=true>{{estateDetail.ename}}</bm-info-window>
            </bm-marker>
            </baidu-map>
          </card>
        </ListItem>
        <ListItem>
          <ListItemMeta title="评论区"/>
          <card>
          <p slot="title">全部评论</p>
          <ListItem v-for="item in comments" :key="item.title">
                <ListItemMeta :title="item.uname" :avatar="item.uavatar" :description="item.ccontent"/>
                Ta给出的评分: <Rate disabled v-model="item.crating" class="rate"/>
                <p class="date">发表于: {{item.cdate}}</p>
          </ListItem>
          <Page
            :current="page.pageNumber+1"
            :total="page.totalElements"
            :page-size="page.pageSize"
            show-total
            @on-change="GetCommentsByEid"
          />
            </card>
        </ListItem>
        <ListItem>
          <ListItemMeta title="评论区等你填满"/>
    <Form ref="postComment" :rules="ruleComment" :model="comment">
      <FormItem label="你的打分: " prop="crating">
          <Rate v-model="comment.crating" />
      </FormItem>
      <FormItem prop="ccontent">
        <Input v-model="comment.ccontent" type="textarea" :rows="4" placeholder="Enter something..."/>
      </FormItem>
      <FormItem>
        <Button type="primary" class="submit" @click="handleSubmit('postComment')">发表</Button>
      </FormItem>
    </Form>
    </ListItem>
      </List>
    </template>
  </Content>
</template>
<script>
export default {
  data () {
    return {
      ruleComment: {
        // crating: [
        //   { required: true, message: '内容不能为空', trigger: 'blur' }
        // ],
        ccontent: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      estateDetail: {},
      comments: [],
      page: {
        pageNumber: '',
        totalElements: '',
        totalPages: '',
        pageSize: ''
      },
      comment: {
        eid: this.$route.params.eid,
        uid: '',
        ccontent: '',
        crating: ''
      },
      baidumapSwitch: false,
      center: {
        lng: '',
        lat: ''
      },
      zoom: 16
    }
  },
  created () {
    this.GetId()
    this.GetLocation()
    this.GetEstateDetailByEid()
    this.GetCommentsByEid(1)
  },
  computed: {},
  methods: {
    GetId () {
      this.comment.uid = this.$store.state.user.userId
    },
    GetCommentsByEid (page) {
      page = page - 1
      var that = this
      that
        .$axios({
          method: 'get',
          url: 'comments/estate/' + page,
          params: {
            eid: this.$route.params.eid
          }
        })
        .then(response => {
          this.comments = response.data.content
          this.page.pageNumber = response.data.pageable.pageNumber
          this.page.totalPages = response.data.totalPages
          this.page.totalElements = response.data.totalElements
          this.page.pageSize = response.data.pageable.pageSize
          console.log(response)
        })
    },
    GetLocation () {
      var that = this
      that
        .$axios({
          method: 'get',
          url: 'estate/coordinate/' + this.$route.params.eid
        })
        .then(res => {
          this.center.lng = res.data.x
          this.center.lat = res.data.y
          console.log(res)
        })
    },
    GetEstateDetailByEid () {
      var that = this
      that
        .$axios({
          method: 'get',
          url: 'estate/' + this.$route.params.eid
        })
        .then(response => {
          this.estateDetail = response.data
          console.log(response)
        })
    },
    postComment () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'comments/post',
          data: this.comment
        })
        .then(res => {
          console.log(res)
        })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.postComment()
          this.GetCommentsByEid(1)
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
.date {
  float: right;
}
</style>
