<template>
  <Content>
   <List item-layout="vertical">
        <ListItem>
          <ListItemMeta title="经纪人信息"/>
        </ListItem>
    <Card>
      <p slot="title">{{agentDetail.aname}}</p>
      <ListItemMeta :avatar="agentDetail.aavatar" :title="agentDetail.acontact"/>
      <p>{{agentDetail.ainfo}}</p>
      <p>所属中介:{{mediumDetail.mname}}</p>
      <p>地址:{{mediumDetail.maddress}}</p>
      <p>联系方式:{{mediumDetail.mcontact}}</p>
    </Card>
    <ListItemMeta title="评分"/>
    <card>
        <p slot="title">全部评分</p>
          <ListItem v-for="item in ratings" :key="item.title">
                <ListItemMeta :title="item.acomment"/>
                Ta给出的评分: <Rate disabled v-model="item.arating"/>
                <p>发表于: {{item.adate}}</p>
          </ListItem>
          <Page
            :current="page.pageNumber+1"
            :total="page.totalElements"
            :page-size="page.pageSize"
            show-total
            @on-change="GetRatingsByAid"
          />
     </card>
      </List>
    <template>
      <Form :model="rating">
        <FormItem label="评分" prop="arating">
          <Rate v-model="rating.arating" />
        </FormItem>
        <FormItem  prop="acomment">
          <Input v-model="rating.acomment" type="textarea" :rows="4" placeholder="Enter something..." />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit()">发表评分</Button>
        </FormItem>
      </Form>
    </template>
  </Content>
</template>

<script>
export default {
  data () {
    return {
      mediumDetail: {},
      agentDetail: {},
      ratings: [],
      page: {
        pageNumber: '',
        totalElements: '',
        totalPages: '',
        pageSize: ''
      },
      rating: {
        uid: '',
        aid: this.$route.params.aId,
        arating: '',
        acomment: ''
      }
    }
  },
  created () {
    this.GetAgentDetailByAid()
    this.GetId()
    this.GetRatingsByAid(1)
  },
  computed: {},
  methods: {
    GetId () {
      this.rating.uid = this.$store.state.user.userId
    },
    GetRatingsByAid (page) {
      page = page - 1
      var that = this
      that
        .$axios({
          method: 'get',
          url: 'agent/rating/' + page,
          params: {
            aid: this.$route.params.aId
          }
        })
        .then(response => {
          console.log(response)
          this.ratings = response.data.content
          this.page.pageNumber = response.data.pageable.pageNumber
          this.page.totalPages = response.data.totalPages
          this.page.totalElements = response.data.totalElements
          this.page.pageSize = response.data.pageable.pageSize
        })
    },
    GetAgentDetailByAid () {
      var that = this
      that
        .$axios({
          method: 'get',
          url: 'agent/' + this.$route.params.aId
        })
        .then(response => {
          this.agentDetail = response.data
          console.log(response)
          // GetMediumDetailByMid(response.data.mid)
        })
    },
    GetMediumDetailByMid (mid) {
      var that = this
      that
        .$axios({
          method: 'get',
          url: 'medium/' + mid
        })
        .then(response => {
          this.mediumDetail = response.data
          console.log(response)
        })
    },
    postRating () {
      var that = this
      that
        .$axios({
          method: 'post',
          url: 'agent/rating',
          data: this.rating
        })
        .then(res => {
          console.log(res)
        })
    },
    handleSubmit () {
      this.postRating()
      this.GetRatingsByAid(1)
      this.$Message.success('发表成功!')
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
