<template>
  <Content :style="{margin: '10px', background: '#f8f9fa', minHeight: '1000px'}">
    <List item-layout="vertical">
      <ListItem v-for="item in House" :key="item.title">
        <router-link :to="{name:'house', params: {hId: item.hid}}">
          <!-- <button  @click="toHouse(item.hid)">click</button> -->
          <Card style="width:1000px;height:200px">
            <ListItemMeta
              :avatar="item.aavatar"
              :title="item.hname"
              :description="item.hbreifinfo"
            />
            面积：{{item.hsquare}} 平方米 价格:{{item.hprice}} 万 地址：{{item.haddress}}
            <template slot="extra">
              <br />
              <br />
              <img style="width: 230px;height: 130px" :src="item.himage" />
            </template>
          </Card>
        </router-link>
      </ListItem>
    </List>
    <Page
      :current="page.pageNumber+1"
      :total="page.totalElements"
      :page-size="page.pageSize"
      show-total
      @on-change="pIndexChange"
    />
  </Content>
</template>
<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      House: [],
      page: {
        pageNumber: '',
        totalElements: '',
        totalPages: '',
        pageSize: ''
      }
    }
  },
  created () {
    this.GetHouseBriefInfo(0)
  },
  computed: {},
  methods: {
    GetHouseBriefInfo (page) {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'house/' + page
        })
        .then(response => {
          this.House = response.data.content
          this.page.pageNumber = response.data.pageable.pageNumber
          this.page.totalPages = response.data.totalPages
          this.page.totalElements = response.data.totalElements
          this.page.pageSize = response.data.pageable.pageSize
          console.log(response)
        })
    },
    pIndexChange (pageNum) {
      this.GetHouseBriefInfo(pageNum - 1)
    }
  }
}
</script>
