<template>
  <div>
    <p v-text="page.totalPages"></p>
    <div v-for="item in NewsBriefInfo" :key="item.id">
      <p v-text="item.ndate"></p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      test: [],
      list: [],
      page: [],
      items: [],
      NewsBriefInfo: [],
      classes: {
        // hid,
        // hname,
        // haddress,
        // hsquare,
        // hprice,
        // hbriefinfo,
        // himage,
        // hinfo,
        // aid,
        // aname,
        // aavatar,
        // eid,
        // ename,
        // eavgprice,
        // eimage,
        // ebriefinfo
      }
    }
  },
  created () {
    this.GetHouseById()
    this.GetHouseBriefInfo()
    this.HouseGetHouseBriefInfo()
    this.GetNewsBriefInfo()
  },
  mounted () {
  },
  methods: {
    GetHouseById () {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'house',
          params: {
            hId: 1
          }
        })
        .then(response => {
          this.test = response.data
          console.log(response)
          this.classes = response.data
          console.log(response)
        })
    },
    GetHouseBriefInfo () {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'home/house'
        })
        .then(response => {
          this.list = response.data
          console.log(response)
        })
    },
    HouseGetHouseBriefInfo () {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'house/1'
        })
        .then(response => {
          this.page = response.data
          this.items = response.data.content
          console.log(response)
        })
    },
    GetNewsBriefInfo () {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'home/news'
        })
        .then(response => {
          this.NewsBriefInfo = response.data.content
          console.log(response)
        })
    }
  }
}

</script>
