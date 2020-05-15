<template>
        <Content :style="{margin: '50px', background: '#f8f9fa', minHeight: '1000px'}">
          <template>
            <Form ref="searchInfo" :model="searchInfo" :rules="ruleSearch" :label-width="80">
              <FormItem label="名称" prop="houseName">
                <Input v-model="searchInfo.houseName" placeholder="Enter something..."/>
              </FormItem>
              <FormItem label="地点" prop="address">
                <Input v-model="searchInfo.address" placeholder="Enter something..."/>
              </FormItem>
              <FormItem label="价格范围" prop="priceRange">
                <RadioGroup v-model="searchInfo.priceRange">
                  <Radio label="p0">不限</Radio>
                  <Radio label="p1">0-50万</Radio>
                  <Radio label="p2">50-100万</Radio>
                  <Radio label="p3">100-250万</Radio>
                  <Radio label="p4">250-500万</Radio>
                  <Radio label="p5">500-750万</Radio>
                  <Radio label="p6">750-1000万</Radio>
                  <Radio label="p7">1000-1500万</Radio>
                  <Radio label="p8">1500万以上</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="平米数" prop="squareRange">
                <RadioGroup v-model="searchInfo.squareRange">
                  <Radio label="s0">不限</Radio>
                  <Radio label="s1">0-50平方米</Radio>
                  <Radio label="s2">50-75平方米</Radio>
                  <Radio label="s3">75-100平方米</Radio>
                  <Radio label="s4">100-150平方米</Radio>
                  <Radio label="s5">150-200平方米</Radio>
                  <Radio label="s6">200-250平方米</Radio>
                  <Radio label="s7">250平方米以上</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('searchInfo')">Submit</Button>
                <Button @click="handleReset('searchInfo')" style="margin-left: 8px">Reset</Button>
              </FormItem>
            </Form>
              <List item-layout="vertical">
                        <ListItem v-for="item in House" :key="item.title">
                            <router-link :to="{name:'house', params: {hId: item.hid}}">
                            <!-- <button  @click="toHouse(item.hid)">click</button> -->
                            <Card style="width:1000px;height:200px">
                                <ListItemMeta  :title="item.hname" :description="item.hbreifinfo" />
                                面积：{{item.hsquare}} 平方米      价格:{{item.hprice}} 万     地址：{{item.haddress}}
                                <template slot="extra">
                                    <br><br>
                                    <img style="width: 230px;height: 130px" :src="item.himage">
                                </template>
                            </card>
                            </router-link>
                        </ListItem>
                    </List>
              <Page :current="page.pageNumber+1" :total="page.totalElements" :page-size="page.pageSize" show-total @on-change="pIndexChange"/>
          </template>
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
      },
      isCollapsed: false,
      searchInfo: {
        houseName: '',
        address: '',
        priceRange: '',
        squareRange: ''
      },
      ruleSearch: {
        priceRange: [
          { required: true, message: 'The name cannot be empty', trigger: 'change' }
        ],
        squareRange: [
          { required: true, message: 'The name cannot be empty', trigger: 'change' }
        ]
      },
      searchParam: {
        houseName: '',
        district: '',
        minPrice: '',
        maxPrice: '',
        minSquare: '',
        maxSquare: ''
      }
    }
  },
  created () {

  },
  computed: {
  },
  methods: {
    GetSearchInfo (pageNum) {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'house/search',
          // URLSearchParams: name
          params: {
            name: this.searchParam.houseName,
            address: this.searchParam.district,
            minprice: this.searchParam.minPrice,
            maxprice: this.searchParam.maxPrice,
            minsquare: this.searchParam.minSquare,
            maxsquare: this.searchParam.maxSquare,
            page: pageNum
          }
        })
        .then(response => {
          console.log(response)
          this.House = response.data.content
          this.page.pageNumber = response.data.pageable.pageNumber
          this.page.totalPages = response.data.totalPages
          this.page.totalElements = response.data.totalElements
          this.page.pageSize = response.data.pageable.pageSize
        })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          this.translate()
          this.GetSearchInfo(0)
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    translate () {
      this.searchParam.houseName = this.searchInfo.houseName
      this.searchParam.district = this.searchInfo.address
      switch (this.searchInfo.priceRange) {
        case 'p0':
          this.searchParam.minPrice = 0
          this.searchParam.maxPrice = 99999
          break
        case 'p1':
          this.searchParam.minPrice = 0
          this.searchParam.maxPrice = 50
          break
        case 'p2':
          this.searchParam.minPrice = 50
          this.searchParam.maxPrice = 100
          break
        case 'p3':
          this.searchParam.minPrice = 100
          this.searchParam.maxPrice = 250
          break
        case 'p4':
          this.searchParam.minPrice = 250
          this.searchParam.maxPrice = 500
          break
        case 'p5':
          this.searchParam.minPrice = 500
          this.searchParam.maxPrice = 750
          break
        case 'p6':
          this.searchParam.minPrice = 750
          this.searchParam.maxPrice = 1000
          break
        case 'p7':
          this.searchParam.minPrice = 1000
          this.searchParam.maxPrice = 1500
          break
        case 'p8':
          this.searchParam.minPrice = 1500
          this.searchParam.maxPrice = 99999
          break
      }
      switch (this.searchInfo.squareRange) {
        case 's0':
          this.searchParam.minSquare = 0
          this.searchParam.maxSquare = 9999
          break
        case 's1':
          this.searchParam.minSquare = 0
          this.searchParam.maxSquare = 50
          break
        case 's2':
          this.searchParam.minSquare = 50
          this.searchParam.maxSquare = 75
          break
        case 's3':
          this.searchParam.minSquare = 75
          this.searchParam.maxSquare = 100
          break
        case 's4':
          this.searchParam.minSquare = 100
          this.searchParam.maxSquare = 150
          break
        case 's5':
          this.this.searchParam.minSquare = 150
          this.searchParam.maxSquare = 200
          break
        case 's6':
          this.searchParam.minSquare = 200
          this.searchParam.maxSquare = 250
          break
        case 's7':
          this.searchParam.minSquare = 250
          this.searchParam.maxSquare = 9999
          break
      }
    }
  }

}
</script>
