<template>
  <Content :style="{margin: '50px', background: '#f8f9fa', minHeight: '1000px'}">
    <!-- <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}"> -->
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>详情</BreadcrumbItem>
    </Breadcrumb>
    <!-- <Card style="width:500px;height:400px"> -->
    <div style="font-size:30px">{{detail.hname}}</div>
    <Carousel>
      <Carousel-item>
        <div class="demo-carousel">
          <img class="demo-img" :src="detail.himage" />
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">
          <img
            class="demo-img"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587793015924&di=90d0aef63483108eb998f72acb29ec66&imgtype=0&src=http%3A%2F%2F4.img.home77.com%2FG1%2FM00%2F34%2FC3%2FCql_HFg39yiAcokUABe7NFNOqu8945.jpg"
          />
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">
          <img
            class="demo-img"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587793056063&di=aa251fc53384d6c7006eebba4786a3b5&imgtype=0&src=http%3A%2F%2Fimg3.cache.netease.com%2Fphoto%2F0207%2F2012-09-21%2F8BTT76VN3LBD0207.jpg"
          />
        </div>
      </Carousel-item>
    </Carousel>
    <!-- </Card> -->
    <template>
      <List item-layout="vertical">
        <ListItem>
          <ListItemMeta title="房屋简介" :description="detail.hinfo" />
        <Button type="primary" shape="circle" icon="ios-heart" @click="handleFavourite()">一键收藏</Button>
        </ListItem>
        <ListItem>
          <router-link :to="{name:'agent', params: {aId: detail.aid}}">
            <ListItemMeta title="经纪人信息" :avatar="detail.aavatar" :description="detail.aname" />
          </router-link>
        </ListItem>
        <ListItem>
          <router-link :to="{name:'estateDetail', params: {eid: detail.eid}}">
          <ListItemMeta title="小区信息" :description="detail.ename" />
          </router-link>
          <template slot="extra">
            <img style="width:200px;height:150px" :src="detail.eimage" />
          </template>
          <div style="font-size:15px">房屋均价：{{detail.eavgprice}}万</div>
          <br>
          <div style="font-size:15px">简介：{{detail.ebriefinfo}}</div>
        </ListItem>
        <ListItem>
          <ListItemMeta title="地理位置" />
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
              <bm-info-window :show=true>{{detail.ename}}</bm-info-window>
            </bm-marker>
            </baidu-map>
          </card>
        </ListItem>
        <listItem>
          <ListItemMeta title="讨论区" />
        <card>
          <p slot="title">翻翻看</p>
          <ListItem v-for="item in questions" :key="item.title">
            <ListItemMeta :title="item.uname" :avatar="item.uavatar" :description="item.qcontent" />
          </ListItem>
          <Page
            :current="page.pageNumber+1"
            :total="page.totalElements"
            :page-size="page.pageSize"
            show-total
            @on-change="GetQuestionsById"
          />
        </card>
        </listItem>
      <ListItem>
        <ListItemMeta title="发表下你的看法吧" />
    <Form ref='question' :model="question" :rules="ruleQuestion">
      <FormItem prop="qcontent">
        <Input v-model="question.qcontent" type="textarea" :rows="4"/>
      </FormItem>
      <FormItem>
        <Button type="primary" class="submit" size="large" @click="handleSubmit('question')">提交</Button>
      </FormItem>
    </Form>
    </ListItem>
      </List>
        </template>
  </Content>
</template>
<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      ruleQuestion: {
        qcontent: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      detail: {},
      questions: [],
      page: {
        pageNumber: '',
        totalElements: '',
        totalPages: '',
        pageSize: ''
      },
      question: {
        uid: '',
        hid: this.$route.params.hId,
        qcontent: ''
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
    this.GetHouseById()
    this.GetQuestionsById(1)
  },
  computed: {
    // ...mapState({
    //   uid: state => state.user.userId
    // })
  },
  methods: {
    GetId () {
      this.question.uid = this.$store.state.user.userId
    },
    GetHouseById () {
      var that = this
      that
        .$axios({
          method: 'get',
          url: 'house',
          params: {
            hId: this.$route.params.hId
          }
        })
        .then(response => {
          this.detail = response.data
          console.log(response)
          this.GetLocation(response.data.eid)
        })
    },
    GetQuestionsById (page) {
      page = page - 1
      var that = this
      that
        .$axios({
          method: 'get',
          url: 'house/question/' + page,
          params: {
            hId: this.$route.params.hId
          }
        })
        .then(response => {
          this.questions = response.data.content
          this.page.pageNumber = response.data.pageable.pageNumber
          this.page.totalPages = response.data.totalPages
          this.page.totalElements = response.data.totalElements
          this.page.pageSize = response.data.pageable.pageSize
          console.log(response)
        })
    },
    GetLocation (eid) {
      var that = this
      that
        .$axios({
          method: 'get',
          url: 'estate/coordinate/' + eid
        })
        .then(res => {
          this.center.lng = res.data.x
          this.center.lat = res.data.y
          console.log(res)
        })
    },
    postQuestion () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'house/question',
          data: this.question
        })
        .then(res => {
          console.log(res)
        })
    },
    setFavourite () {
      var fav = {
        uid: this.$store.state.user.userId,
        hid: this.$route.params.hId
      }
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'user/favourite',
          data: this.$qs.stringify(fav)
        })
        .then(res => {
          console.log(res)
        })
    },
    handleFavourite () {
      this.setFavourite()
      this.$Message.success('收藏成功!')
    },
    handler ({ BMap, map }) {},
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.postQuestion()
          this.GetQuestionsById(1)
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
