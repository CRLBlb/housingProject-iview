<template>
  <Content :style="{margin: '50px', background: '#f8f9fa', minHeight: '1000px'}">
    <Form ref="searchParam" :model="searchParam" :rules="ruleSearch" :label-width="80">
      <FormItem label="名称" prop="estateName">
        <Input v-model="searchParam.estateName" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="地点" prop="address">
        <Input v-model="searchParam.address" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('searchParam')">Submit</Button>
        <Button @click="handleReset('searchParam')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
    <template>
      <List item-layout="vertical">
        <ListItem v-for="item in estates" :key="item.title">
          <router-link :to="{name:'estateDetail', params: {eid: item.eid}}">
            <!-- <button  @click="toHouse(item.hid)">click</button> -->
            <Card style="width:1000px;height:200px">
              <ListItemMeta :title="item.ename" :description="item.ebriefinfo" />
              价格:{{item.eavgprice}} 万 地址：{{item.eaddress}}
              <template slot="extra">
                <br />
                <br />
                <img style="width: 230px;height: 130px" :src="item.eimage" />
              </template>
            </Card>
          </router-link>
        </ListItem>
      </List>
    </template>
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
  data () {
    return {
      estates: {},
      page: {
        pageNumber: '',
        totalElements: '',
        totalPages: '',
        pageSize: ''
      },
      searchParam: {
        estateName: '',
        address: ''
      }
    }
  },
  created () {},
  computed: {},
  methods: {
    GetSearchParam (pageNum) {
      var that = this
      that
        .$axios({
          methods: 'get',
          url: 'estate/search/' + pageNum,
          params: {
            name: this.searchParam.estateName,
            address: this.searchParam.address
          }
        })
        .then(response => {
          console.log(response)
          this.estates = response.data.content
          this.page.pageNumber = response.data.pageable.pageNumber
          this.page.totalPages = response.data.totalPages
          this.page.totalElements = response.data.totalElements
          this.page.pageSize = response.data.pageable.pageSize
        })
    },
    handleSubmit (name) {
      this.GetSearchParam(0)
      this.$Message.success('Success!')
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
