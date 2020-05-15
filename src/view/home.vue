<template>
                <Content :style="{background: '#f8f9fa', minHeight: '1000px'}">

                    <div style="font-size:30px">一手资讯</div>
                    <List item-layout="vertical">
                        <ListItem v-for="item in News" :key="item.title">
                            <Card style="width:1000px;height:200px">
                                <ListItemMeta :title="item.ntitle" :description="item.ncontent"/>
                                <!-- {{ item.content }} -->
                                <!-- <template slot="action">
                                    <li>
                                        <Icon type="ios-star-outline" /> 123
                                    </li>
                                    <li>
                                        <Icon type="ios-thumbs-up-outline" /> 234
                                    </li>
                                    <li>
                                        <Icon type="ios-chatbubbles-outline" /> 345
                                    </li>
                                </template> -->
                                <template slot="extra">
                                    <br>
                                    <img style="width: 200px;height: 150px" :src=item.nimage>
                                </template>
                            </card>
                        </ListItem>
                    </List>

                    <div style="font-size:30px">精选房源</div>
                    <List item-layout="vertical">
                        <ListItem v-for="item in House" :key="item.title">
                            <router-link :to="{name:'house', params: {hId: item.hid}}">
                            <!-- <button  @click="toHouse(item.hid)">click</button> -->
                            <Card style="width:1000px;height:200px">
                                <ListItemMeta :avatar="item.aavatar" :title="item.hname" :description="item.hbreifinfo" />
                                面积：{{item.hsquare}} 平方米      价格:{{item.hprice}} 万     地址：{{item.haddress}}
                                <!-- <template slot="title">
                                    <li>
                                        <Icon type="ios-star-outline" /> 123
                                    </li>
                                    <li>
                                        <Icon type="ios-thumbs-up-outline" /> 234
                                    </li>
                                    <li>
                                        <Icon type="ios-chatbubbles-outline" /> 345
                                    </li>
                                </template> -->
                                <template slot="extra">
                                    <br><br>
                                    <img style="width: 230px;height: 130px" :src="item.himage">
                                </template>
                            </card>
                            </router-link>
                        </ListItem>
                    </List>

                    <div style="font-size:30px">论坛动向</div>
                    <List item-layout="vertical">
                        <ListItem v-for="item in Forum" :key="item.title">
                            <Card style="width:1000px;height:200px">
                                <ListItemMeta :title="item.ptitle" :description="item.pcontent" />
                                发布日期:{{ item.pdate }}
                                <!-- <template slot="action">
                                    <li>
                                        <Icon type="ios-star-outline" /> 123
                                    </li>
                                    <li>
                                        <Icon type="ios-thumbs-up-outline" /> 234
                                    </li>
                                    <li>
                                        <Icon type="ios-chatbubbles-outline" /> 345
                                    </li>
                                </template> -->
                            </card>
                        </ListItem>
                    </List>
                </Content>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      isCollapsed: false,
      url: '',
      House: [],
      News: [],
      Forum: [],
      id: '',
      info: {}
    }
  },
  created () {
    this.GetHouseBriefInfo()
    this.GetNewsBriefInfo()
    this.GetForumBriefInfo()
    // this.getUserFromCache()
    this.GetId()
  },
  computed: {
  },
  methods: {
    ...mapActions([
      // 'getUserFromCache'
    ]),
    GetId () {
      this.id = this.$store.state.user.userId
      this.info = this.$store.state.user
    },
    GetHouseBriefInfo () {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'house/home'
        })
        .then(response => {
          this.House = response.data.content
          console.log(response)
        })
    },
    GetNewsBriefInfo () {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'news/home'
        })
        .then(response => {
          this.News = response.data.content
          console.log(response)
        })
    },
    GetForumBriefInfo () {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'forum/home'
        })
        .then(response => {
          this.Forum = response.data.content
          console.log(response)
        })
    },
    toHouse (hId) {
      this.$router.push({
        path: '/house',
        query: {
          id: hId
        }
      })
    }
  }
}
</script>
