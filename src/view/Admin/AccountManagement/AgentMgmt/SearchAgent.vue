<template>
    <Card title="经纪人管理">
        <div >
            <Input v-model="search"
                   suffix="ios-search"
                   placeholder="请输入查询的经纪人编号"
                   style="width: auto" :search=true @on-search="handleSearch"/>
        </div>

        <div style="margin-top: 10px;">

            <Table ref="agentTable" :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="aid"> <!--aid中介人编号-->
                    <Input type="text"  v-if="editIndex === index" />
                    <span v-else>{{ row.aid }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="mid"> <!--mid机构编号-->
                    <Input type="text" v-model="editMid"  v-if="editIndex === index" />
                    <span v-else>{{ row.mid }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="aname"> <!--aname-->
                    <Input type="text" v-model="editAname" v-if="editIndex === index" />
                    <span v-else>{{ row.aname }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="apassword"> <!--apassword-->
                    <Input type="text" v-model="editApassword" v-if="editIndex === index"/>
                    <span v-else>{{ row.apassword }}</span>
                </template>

<!--                <template slot-scope="{ row, index }" slot="ugender">  &lt;!&ndash;sex&ndash;&gt;-->
<!--                    <Input type="text" v-model="editUgender" v-if="editIndex === index" ></Input>-->
<!--                    <span v-else>{{ row.ugender }}</span>-->
<!--                </template>-->

                <template slot-scope="{ row, index }" slot="acontact">  <!--acontact phoneNumber-->
                    <Input type="text" v-model="editAcontact" v-if="editIndex === index" />
                    <span v-else>{{ row.acontact}}</span>
                </template>

                <template slot-scope="{ row, index }" slot="averifystatus">

                    <Input type="text" v-model="editAverifystatus" v-if="editIndex === index" />
                    <span v-else>{{ row.averifystatus }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="action">
                    <div v-if="editIndex === index">
                        <Button @click="handleSave(index)">保存</Button>
                        <Button @click="editIndex = -1">取消</Button>
                    </div>

                    <div v-else>
                        <Button  @click="handleEdit(row, index)" >更新</Button>
                        <Button  @click="handleDelete(row, index)" >删除</Button>
                    </div>
                </template>
            </Table>
        </div>
    </Card>

</template>
<script>

export default {

  name: 'SearchAgent',
  data () {
    return {
      search: '', // 搜索栏的默认值为空
      columns: [

        {
          title: '经纪人编号',
          slot: 'aid',
          sortable: true
        },

        {
          title: '中介机构编号',
          slot: 'mid',
          sortable: true
        },

        {
          title: '经纪人用户名',
          slot: 'aname',
          sortable: true
        },

        {
          title: '经纪人密码',
          slot: 'apassword'
        },

        {
          title: '经纪人电话',
          slot: 'acontact'
        },

        {
          title: '经纪人审核状态',
          slot: 'averifystatus'
        },

        {
          title: '操作',
          slot: 'action'

        }
      ],
      data: [

      ],
      editIndex: -1, // 当前聚焦的输入框的行数 ？
      // editAid: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁  ？
      editMid: '', // 第二列输入框 机构编号
      editAname: '', // 第二列输入框 用户名
      editApassword: '', // 密码
      editAcontact: '', // 电话
      editAverifystatus: '' // 经纪人审核状态

      // gender ={
      //     1: 'male'
      //     0: 'female'
      // }
      // this.gender[x]
    }
  },
  methods: {
    // row – A JavaScript value, usually an object or array, to be converted.
    // index – A function that transforms the result

    handleDelete (row, index) { // 删除某个经纪人
      this.data.splice(index, 1) // 删除显示那一行数据 index=0为第一行 数组开始下标
      console.log('AID:' + row.aid) // 获取AID字段的值
      console.log(JSON.parse(JSON.stringify(row))) // JSON.stringify解决显示[object,object]的问题
      console.log('index:' + index)
      // console.log("data:"+this.data.length)
      // console.log("data:"+JSON.stringify(this.data))

      this.$axios
        .get('api/adminindex/deleteagent/' + row.aid, { // 前端发送post请求
        })
        .then(response => {
          this.data = response.data // 传递后端数据到前端
          this.handleSearch() // 删除完后刷新表格
        })
      // 错误处理
        .catch(error => {
          console.log(error)
          console.log('STH WRONG WITH IT LIUBO')
        })
    },
    handleSearch () { // 查找客户
      // let current = this.current
      // let pageSize = this.pageSize
      let search = this.search
      // let orderKey = this.key
      // let orderByValue = this.order
      let _this = this
      // console.log(this.$store.state) //控制台打印日志
      if (search === '') {
        console.log('search all !')

        console.log('length:' + this.data.length) // 获取长度
        // console.log(JSON.parse(JSON.stringify(row))) //JSON.stringify解决显示[object,object]的问题
        // console.log("index:"+index)
      } else {
        console.log('search one !')

        // console.log("UID:"+ row.uid) //获取customerId字段的值
        // console.log(JSON.parse(JSON.stringify(row))) //JSON.stringify解决显示[object,object]的问题
        // console.log("index:"+index)
      }
      this.$axios
        .get('api/adminindex/searchagent/' + search, { // 前端发送post请求？
        })
        .then(response => {
          // .then(response => {
          //         this.detail = response.data
          //         console.log(response)
          //         this.GetLocation(response.data.eid)
          //     })
          // _this.total = response.total;
          _this.data = response.data // 传递后端数据到前端
          JSON.stringify(response.data)

          // this.changePage(current)//更新当前页码的数据
          console.log(response) // 控制台打印响应的数据
        })
      // 错误处理
        .catch(error => {
          console.log(error)
          console.log('STH WRONG WITH IT LIUBO')
        })
    },
    handleEdit (row, index) {
      // this.editAid = row.aid;
      this.editMid = row.mid
      this.editAname = row.aname
      this.editApassword = row.apassword
      this.editAcontact = row.acontact
      if (row.averifystatus === 1) {
        this.editAverifystatus = '通过'
      } else {
        this.editAverifystatus = '未通过'
      }
      // this.editAverifystatus = row.averifystatus;
      this.editIndex = index
      console.log('we are :' + row.averifystatus)
      console.log('your are :' + this.editAverifystatus)
    },
    handleSave (index) {
      let _this = this
      this.$axios
        .post('api/adminindex/updateagent', { // 前端发送post请求

          aid: this.editIndex + 1,
          mid: this.editMid,
          aname: this.editAname,
          apassword: this.editApassword,
          acontact: this.editAcontact,
          averifystatus: this.editAverifystatus

        })
        .then(response => {
          // this.data[index].uid = this.editAid;
          this.data[index].mid = this.editMid
          this.data[index].aname = this.editAname
          this.data[index].apassword = this.editApassword
          this.data[index].acontact = this.editAcontact
          if (this.editAverifystatus === 1) {
            this.data[index].averifystatus = '通过'
          } else {
            this.data[index].averifystatus = '未通过'
          }
          this.editIndex = -1
          console.log(response)

          this.handleSearch() // 删除完后刷新表格
        })
      // 错误处理
        .catch(error => {
          console.log(error)
          console.log('STH WRONG WITH IT LIUBO')
        })
    }
  },
  mounted () {
    // 初始化完成组件的时候执行以下的逻辑
    this.handleSearch()
    this.tableHeight = window.innerHeight - this.$refs.agentTable.$el.offsetTop - 270
  }
}
</script>

<style scoped>

</style>
