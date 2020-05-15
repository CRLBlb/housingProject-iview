<template>
    <Card title="客户管理">
        <div >
            <Input v-model="search"
                   suffix="ios-search"
                   placeholder="请输入查询的客户编号"
                   style="width: auto" :search=true @on-search="handleSearch"/>
        </div>

        <div style="margin-top: 10px;">

            <Table ref="userTable" :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="uid"> <!--customerId-->
                        <Input type="text"  v-if="editIndex === index" />
                    <span v-else>{{ row.uid }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="uname"> <!--username-->
                        <Input type="text" v-model="editUname" v-if="editIndex === index" />
                    <span v-else>{{ row.uname }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="upassword"> <!--password-->
                        <Input type="text" v-model="editUpassword" v-if="editIndex === index"/>
                    <span v-else>{{ row.upassword }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="ugender">  <!--sex-->
                        <Input type="text" v-model="editUgender" v-if="editIndex === index" ></Input>
                    <span v-else>{{ row.ugender }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="ucontact">  <!--phoneNumber-->
                        <Input type="text" v-model="editUcontact" v-if="editIndex === index" />
                    <span v-else>{{ row.ucontact}}</span>
                </template>

                <template slot-scope="{ row, index }" slot="udistrict">

                        <Input type="text" v-model="editUdistrict" v-if="editIndex === index" />
                    <span v-else>{{ row.udistrict }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="action">
                    <div v-if="editIndex === index">
                        <Button @click="handleSave(index)">保存</Button>
                        <Button @click="editIndex = -1">取消</Button>
                    </div>

                    <div v-else>
                        <Button  @click="handleEdit(row, index)" >更改</Button>
                        <Button  @click="handleDelete(row, index)" >删除</Button>
                    </div>
                </template>
            </Table>
        </div>
    </Card>

</template>
<script>

export default {

  name: 'SearchUser',
  data () {
    return {
      search: '', // 搜索栏的默认值为空
      columns: [

        {
          title: '客户编号',
          slot: 'uid',
          sortable: true
        },

        {
          title: '客户用户名',
          slot: 'uname',
          sortable: true
        },

        {
          title: '客户密码',
          slot: 'upassword'
        },

        {
          title: '客户性别',
          slot: 'ugender'
        },

        {
          title: '客户电话',
          slot: 'ucontact'
        },

        {
          title: '客户地址',
          slot: 'udistrict'
        },

        {
          title: '操作',
          slot: 'action'

        }
      ],
      data: [

      ],
      editIndex: -1, // 当前聚焦的输入框的行数 ？
      // editUid: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁  ？
      editUname: '', // 第二列输入框 用户名
      editUpassword: '', // 密码
      editUgender: '', // 性别
      editUcontact: '', // 电话
      editUdistict: '' // 地址
    }
  },
  methods: {
    // row – A JavaScript value, usually an object or array, to be converted.
    // index – A function that transforms the result

    handleDelete (row, index) { // 删除某个客户
      this.data.splice(index, 1) // 删除显示那一行数据 index=0为第一行 数组开始下标
      console.log('UID:' + row.uid) // 获取customerId字段的值
      console.log(JSON.parse(JSON.stringify(row))) // JSON.stringify解决显示[object,object]的问题
      console.log('index:' + index)
      // console.log("data:"+this.data.length)
      // console.log("data:"+JSON.stringify(this.data))

      let _this = this
      this.$axios
        .get('api/adminindex/deleteuser/' + row.uid, { // 前端发送post请求
          // 'params':{
          //     username:'Sam'
          // }
        })
        .then(response => {
          // _this.total = response.total;
          _this.data = response.data // 传递后端数据到前端
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

        console.log('UID:' + this.data.length) // 获取customerId字段的值
        // console.log(JSON.parse(JSON.stringify(row))) //JSON.stringify解决显示[object,object]的问题
        // console.log("index:"+index)
      } else {
        console.log('search one !')

        // console.log("UID:"+ row.uid) //获取customerId字段的值
        // console.log(JSON.parse(JSON.stringify(row))) //JSON.stringify解决显示[object,object]的问题
        // console.log("index:"+index)
      }
      this.$axios
        .get('api/adminindex/searchuser/' + search, { // 前端发送post请求？
        })
        .then(response => {
          // _this.total = response.total;
          _this.data = response.data // 传递后端数据到前端

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
      // this.editUid = row.uid;
      this.editUname = row.uname
      this.editUpassword = row.upassword
      if (row.ugender === 1) {
        this.editUgender = '男' // 1
      } else {
        this.editUgender = '女' // 0
      }
      this.editUcontact = row.ucontact
      this.editUdistrict = row.udistrict
      this.editIndex = index
    },
    handleSave (index) {
      let _this = this
      this.$axios
        .post('api/adminindex/updateuser', { // 前端发送post请求

          uid: this.editIndex + 1,
          uname: this.editUname,
          upassword: this.editUpassword,
          ugender: this.editUgender,
          ucontact: this.editUcontact,
          udistrict: this.editUdistrict
          // uavatar: this.editUavatar,
        })
        .then(response => {
          // this.data[index].uid = this.editUid;
          this.data[index].uname = this.editUname
          this.data[index].upassword = this.editUpassword
          this.data[index].ucontact = this.editUcontact
          this.data[index].udistrict = this.editUdistrict
          if (this.editUgender === 1) {
            this.data[index].ugender = '男'
          } else {
            this.data[index].ugender = '女'
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
    this.tableHeight = window.innerHeight - this.$refs.userTable.$el.offsetTop - 270
  }
}
</script>

<style scoped>

</style>
