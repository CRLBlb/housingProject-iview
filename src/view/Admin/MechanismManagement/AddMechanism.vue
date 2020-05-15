<template>
    <div class="layout">
        <layout>
            <Header class="layout-header" id="layout-header-scroll">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <img height="50px" width="50px" src="../../../assets/logo.png"/>
                    </div>
                </Menu>
            </Header>
            <div >
                <Card title="入驻二手房平台系统">
                    <Form ref="registerForm" :model="registerForm" :rules="registerrole"  >
                        <div class="register-input">

                            <FormItem label="机构名称："  prop="mname">
                                <Input
                                        v-model="registerForm.mname"
                                        prefix="ios-paper"
                                        type="text"
                                        placeholder="请输入机构名称"
                                        clearable/>
                            </FormItem>
                            <FormItem label="机构地址:" prop="mdistrict">
                                <Input
                                        v-model="registerForm.mdistrict"
                                        prefix="ios-paper"
                                        placeholder="请输入地址"
                                        clearable/>
                            </FormItem>
                            <FormItem label="电话："  prop="mcontact">
                                <Input
                                        v-model="registerForm.mcontact"
                                        prefix="ios-paper"
                                        type="text"
                                        placeholder="请输入联系电话"
                                        clearable/>
                            </FormItem>
                        </div>

                        <div>
                            <Button type="primary" style="margin-right: 20px"  @click="register" >确认</Button>
                            <Button type="primary" style="margin-left: 20px" @click="management" >前往管理界面</Button>

                        </div>
                        <div>
                        </div>
                    </Form>
                </Card>
            </div>
        </layout>
    </div>
</template>

<script>
export default {
  name: 'AddMechanism',
  data () {
    return {
      registerForm: {
        mid: '',
        mname: '',
        mdistrct: '',
        mcontact: '',
        mverifystatus: '0' // 审核状态 ， 默认未审核
      },

      registerrole: { // 表单验证
        mname: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        mdistrict: [
          { required: true, message: '请输入机构地址', trigger: 'blur' }
        ],
        mcontact: [
          { required: true, message: '请输入电话!', trigger: 'blur' },
          { type: 'string', length: 11, message: '电话长度为11位!', trigger: 'blur' }
        ]
      },
      responseResult: []
    }
  },
  methods: {
    management () {
      this.$router.replace({ path: '/adminindex/mechanismaudit' })
    },
    register () {
      this.$axios
        .get('api/adminindex/searchmechanism/', { // 前端发送post请求
        })
        .then(response1 => {
          // _this.total = response.total;

          this.registerForm.mid = response1.data.length
          // this.changePage(current)//更新当前页码的数据
          console.log(response1.data.length) // 控制台打印响应的数据
          this.$axios
            .post('api/addmechanism', {
              mid: this.registerForm.mid + 1,
              mname: this.registerForm.mname,
              mdistrict: this.registerForm.mdistrict,
              mcontact: this.registerForm.mcontact,
              mverifystatus: this.registerForm.mverifystatus
            })
            .then(function (response2) {
              alert('注册成功！')
            })
            .catch(error => {
              console.log(error)
            })
        })
      // 错误处理
        .catch(error => {
          console.log(error)
          console.log('STH WRONG WITH IT LIUBO')
        })
    }
  }

}
</script>

<style scoped>

    .layout-header {
        position: relative;
        z-index: 999;
        height: 60px;
    }
    .layout-logo {
        width: 100px;
        height: 30px;
        border-radius: 10px;
        float: left;
        position: relative;
        left: 20px;
        top: 5px;
    }

    .register-input{
        margin:0px auto;
        width: 500px;

    }

</style>
