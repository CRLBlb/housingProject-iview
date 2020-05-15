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
            <div  style="text-align: center;">
                <Card title="欢迎登录二手房平台管理系统" >
                    <Form ref="loginForm" :model="loginForm" :rules="loginrole"  >
                        <div class="login-input" >
                            <FormItem label="用户名："  prop="adminid">
                               <Input
                                    v-model="loginForm.adminid"
                                    prefix="ios-person"
                                    type="text"
                                    placeholder="请输入管理员用户名"
                                    clearable/>
                            </FormItem>
                            <FormItem label="密码:" prop="adminpassword">
                               <Input
                                    v-model="loginForm.adminpassword"
                                    prefix="ios-lock"
                                    placeholder="请输入管理员密码"
                                    type="password"
                                    password/>
                            </FormItem>
                        </div >
                        <div class="login-button" >
                            <Button type="primary" @click="adminlogin" >登录</Button>
                        </div>

                    </Form>
                </Card>
            </div>
        </layout>
    </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data () {
    return {
      loginForm: {
        adminid: '',
        adminpassword: ''
      },

      loginrole: { // 表单验证
        adminid: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        adminpassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能小于6位!', trigger: 'blur' }
        ]
      },
      responseResult: []
    }
  },
  methods: {

    adminlogin () {
      var _this = this

      console.log(this.$store.state) // 控制台打印日志

      this.$axios
        .post('api/adminlogin', { // 前端发送post请求？
          adminid: this.loginForm.adminid,
          adminpassword: this.loginForm.adminpassword
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) { //= ==:完全相等,包括类型 200代表管理员登录
            _this.$store.commit('adminlogin', _this.loginForm) // 提交登录操作
            var path = this.$route.query.redirect // 重定向路径
            // this.$router.replace({path: '/adminindex'}) //未使用重定向
            // 路径存在则跳转;路径不存在，则跳转到首页Index
            this.$router.replace({ path: path === '/' || path === undefined ? '/adminindex' : path })
            console.log('登录成功！')
          } else {
            this.$Message.error('用户名或密码错误!')
            console.log('用户名或密码错误！')
          }
        })
        .catch(failResponse => {
          if (failResponse.data.code === 404) {
            console.log('404 not Find! LiuBo')
          }
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

    .login-input{
        margin:0px auto;
        width: 500px;

    }

    .login-button{
        width: 400px;
        margin: 0 auto;
        display: block;
    }

</style>
