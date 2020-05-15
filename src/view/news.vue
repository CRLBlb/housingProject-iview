<template>
  <Content :style="{margin: '10px', background: '#f8f9fa', minHeight: '1000px'}">
    <List item-layout="vertical">
      <ListItem v-for="item in News" :key="item.title">
          <!-- <button  @click="toNews(item.hid)">click</button> -->
          <Card style="width:1000px;height:400px">
            <ListItemMeta
              :title="item.title"
              :description="item.content"
            />
            发布日期：{{item.publishDate}} 来源:{{item.publishDateStr}}
            <Button type="primary" @click="goPage(item.url)">链接</Button>
            <template slot="extra">
              <br />
              <br />
              <div v-for="pic in item.imageUrls" :key="pic.title">
               <img style="width: 230px;height: 130px" :src="pic" />
              </div>
            </template>
          </Card>
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
      News: [],
      page: {
        pageNumber: '',
        totalElements: 1000,
        totalPages: 100,
        pageSize: 10
      },
      token: ''
    }
  },
  created () {
    this.getExternalNews(0)
  },
  computed: {},
  methods: {
    getExternalNews (page) {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'news/external/' + page
        })
        .then(response => {
          console.log(response)
          this.News = response.data.data
          this.page.pageNumber = page
          console.log(response)
        })
    },
    pIndexChange (pageNum) {
      this.getExternalNews(pageNum - 1)
    },
    goPage (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
