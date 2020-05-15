<template>
    <Card title="中介机构管理">
        <div >
            <Input v-model="search"
                   suffix="ios-search"
                   placeholder="请输入机构编号"
                   style="width: auto" :search=true @on-search="handleSearch"/>
        </div>

        <div style="margin-top: 10px;">

            <Table ref="mechanismTable" :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="mid"> <!--MID-->
                    <Input type="text"  v-if="editIndex === index" />
                    <span v-else>{{ row.mid}}</span>
                </template>

                <template slot-scope="{ row, index }" slot="mname"> <!--MNAME-->
                    <Input type="text" v-model="editMname" v-if="editIndex === index" />
                    <span v-else>{{ row.mname }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="mdistrict">
                    <Input type="text" v-model="editMdistrict" v-if="editIndex === index"/>
                    <span v-else>{{ row.mdistrict }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="mcontact">
                    <Input type="text" v-model="editMcontact" v-if="editIndex === index" ></Input>
                    <span v-else>{{ row.mcontact }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="mverifystatus">
                    <Input type="text" v-model="editMverifystatus" v-if="editIndex === index" />
                    <span v-else>{{ row.mverifystatus}}</span>
                </template>

                <template slot-scope="{ row, index }" slot="action">
                    <div v-if="editIndex === index">
                        <Button @click="handleSave(index)">保存</Button>
                        <Button @click="editIndex = -1">取消</Button>
                    </div>

                    <div v-else>
                        <Button  @click="handleEdit(row, index)" >审核</Button>
                        <Button  @click="handleDelete(row, index)" >删除</Button>
                    </div>
                </template>
            </Table>
        </div>
    </Card>

</template>
<script>

export default {

  name: 'SearchMechnism',
  data () {
    return {
      search: '', // 搜索栏的默认值为空
      columns: [

        {
          title: '机构编号',
          slot: 'mid',
          sortable: true
        },

        {
          title: '机构名称',
          slot: 'mname',
          sortable: true
        },

        {
          title: '机构地区',
          slot: 'mdistrict'
        },

        {
          title: '机构联系电话',
          slot: 'mcontact'
        },

        {
          title: '机构审核状态',
          slot: 'mverifystatus'
        },
        {
          title: '操作',
          slot: 'action'

        }
      ],
      data: [

      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editMid: '', // 第二列输入框
      editMname: '', // 机构名称
      editMdistrict: '', // 地址
      editMcontact: '', // 联系方式
      editMverifystatus: '' // 审核状态
    }
  },
  methods: {
    // row – A JavaScript value, usually an object or array, to be converted.
    // index – A function that transforms the result

    handleDelete (row, index) { // 删除某个机构
      this.data.splice(index, 1) // 删除显示那一行数据 index=0为第一行 数组开始下标
      console.log('MID:' + row.mid) // 获取MID字段的值
      console.log(JSON.parse(JSON.stringify(row))) // JSON.stringify解决显示[object,object]的问题
      console.log('index:' + index)
      // console.log("data:"+this.data.length)
      // console.log("data:"+JSON.stringify(this.data))

      let _this = this
      this.$axios
        .get('api/adminindex/deletemechanism/' + row.mid, { // 前端发送post请求
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

        console.log('LENGTH:' + this.data.length) // 获取customerId字段的值
        // console.log(JSON.parse(JSON.stringify(row))) //JSON.stringify解决显示[object,object]的问题
        // console.log("index:"+index)
      } else {
        console.log('search one !')

        // console.log("UID:"+ row.uid) //获取customerId字段的值
        // console.log(JSON.parse(JSON.stringify(row))) //JSON.stringify解决显示[object,object]的问题
        // console.log("index:"+index)
      }
      this.$axios
        .get('api/adminindex/searchmechanism/' + search, { // 前端发送post请求？
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
      // this.editMid = row.mid;
      this.editMname = row.mname
      this.editMdistrict = row.mdistrict
      this.editMcontact = row.mcontact
      if (row.mverifystatus == 1) {
        this.editMverifystatus = '通过' // 1
      } else {
        this.editMverifystatus = '未通过' // 0
      }
      this.editIndex = index
    },
    handleSave (index) {
      let _this = this
      this.$axios
        .post('api/adminindex/updatemechanism', { // 前端发送post请求

          mid: this.editIndex + 1,
          mname: this.editMname,
          mdistrict: this.editMdistrict,
          mcontact: this.editMcontact,
          mverifystatus: this.editMverifystatus
          // uavatar: this.editUavatar,
        })
        .then(response => {
          // this.data[index].uid = this.editUid;
          this.data[index].mname = this.editMname
          this.data[index].mdistrict = this.editMdistrict
          this.data[index].mcontact = this.editMcontact
          if (this.editMverifystatus == 1) {
            this.data[index].mverifystatus = '通过'
          } else {
            this.data[index].mverifystatus = '未通过'
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
    this.tableHeight = window.innerHeight - this.$refs.mechanismTable.$el.offsetTop - 270
  }
}
</script>

<style scoped>

</style>
