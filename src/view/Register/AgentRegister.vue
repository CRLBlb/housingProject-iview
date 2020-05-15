<template>
    <div class="layout">
        <layout>
            <Header class="layout-header" id="layout-header-scroll">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <img height="50px" width="50px" src="../../assets/logo.png"/>
                    </div>
                </Menu>
            </Header>
            <div >
                <Card title="欢迎注册二手房平台系统">
                    <Form ref="registerForm" :model="registerForm" :rules="registerrole"  >
                        <div class="register-input">

                            <FormItem label="机构编号："  prop="mid">
                                <Input
                                        v-model="registerForm.mid"
                                        prefix="ios-person"
                                        type="text"
                                        placeholder="请输入机构编号"
                                        clearable/>
                            </FormItem>

                            <FormItem label="用户名："  prop="aname">
                                <Input
                                        v-model="registerForm.aname"
                                        prefix="ios-person"
                                        type="text"
                                        placeholder="请输入用户名"
                                        clearable/>
                            </FormItem>
                            <FormItem label="密码:" prop="apassword">
                                <Input
                                        v-model="registerForm.apassword"
                                        prefix="ios-lock"
                                        placeholder="请输入密码"
                                        clearable/>
                            </FormItem>
                            <FormItem label="电话："  prop="acontact">
                                <Input
                                        v-model="registerForm.acontact"
                                        prefix="ios-paper"
                                        type="text"
                                        placeholder="请输入联系电话"
                                        clearable/>
                            </FormItem>
                        </div>

                        <div>
                            <Button type="primary" style="margin-right: 20px"  @click="register" >确认</Button>
                            <Button type="primary" style="margin-left: 20px" @click="login" >前往登录</Button>

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
  name: 'AgentRegister',
  data () {
    return {
      registerForm: {
        aid: '', // 经纪人编号
        mid: '',
        aname: '',
        apassword: '',
        acontact: '',
        averifystatus: '0', // 审核状态 ， 默认未审核
        avalidstatus: '1', // 封禁状态，默认未封禁
        ainfo: null,
        aavatar: null
      },

      registerrole: { // 表单验证
        mid: [
          { required: true, message: '请输入机构编号', trigger: 'blur' }
        ],
        aname: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        apassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能小于6位!', trigger: 'blur' }
        ],
        acontact: [
          { required: true, message: '请输入电话!', trigger: 'blur' },
          { type: 'string', length: 11, message: '电话长度为11位!', trigger: 'blur' }
        ]
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      this.$router.replace({ path: '/agentlogin' }) // 未使用重定向
    },
    register () {
      this.$axios
        .get('api/adminindex/searchagent/', { // 前端发送post请求？
        })
        .then(response1 => {
          // _this.total = response.total;

          this.registerForm.aid = response1.data.length
          // this.changePage(current)//更新当前页码的数据
          console.log(response1.data.length) // 控制台打印响应的数据
          this.$axios
            .post('api/agentregister', {
              aid: this.registerForm.aid + 1,
              amid: this.registerForm.amid,
              aname: this.registerForm.aname,
              apassword: this.registerForm.apassword,
              acontact: this.registerForm.acontact,
              averifystatus: this.registerForm.averifystatus,
              avalidstatus: this.registerForm.avalidstatus,
              ainfo: this.registerForm.ainfo,
              aavatar: this.registerForm.aavatar

            })
            .then(function (response2) {
              alert('注册成功！')
              console.log('aid:' + this.registerForm.aid)
              console.log('mid:' + this.registerForm.mid)
              console.log('aname:' + this.registerForm.aname)
              console.log('apassword:' + this.registerForm.apassword)
              console.log('avalidstatus:' + this.registerForm.avalidstatus)
              console.log('aavatar:' + this.registerForm.aavatar)
            })
            .catch(error => {
              console.log('aid:' + this.registerForm.aid)
              console.log('aname' + this.registerForm.aname)
              console.log('apassword' + this.registerForm.apassword)
              console.log('avalidstatus' + this.registerForm.avalidstatus)
              console.log('aavatar' + this.registerForm.aavatar)
              console.log('STH WRONG WITH IT LIUBO')
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
