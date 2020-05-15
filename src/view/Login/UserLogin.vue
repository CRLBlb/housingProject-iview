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

            <div style="text-align: center;" >
                <Card title="欢迎您登录二手房平台系统" >
                    <Form ref="loginForm" :model="loginForm" :rules="loginrole"  >
                        <div class="login-input">
                            <FormItem label="账号："  prop="uname">
                                <Input
                                        v-model="loginForm.uname"
                                        prefix="ios-person"
                                        type="text"
                                        placeholder="请输入用户名"
                                        clearable/>
                            </FormItem>
                            <FormItem label="密码:" prop="upassword">
                                <Input
                                        v-model="loginForm.upassword"
                                        prefix="ios-lock"
                                        placeholder="请输入用户密码"
                                        type="password"
                                        password/>
                            </FormItem>
                          <SliderVerificationCode height="60px" sliderWidth="120px"  inactiveValue="未解锁" activeValue="已解锁" v-model="value"/>
                        </div>
                        <div >
                            <Button type="primary" style="margin-right: 50px" @click="userlogin" >登录</Button>
                            <Button type="primary" style="margin-right: 50px" @click="register">注册</Button>
                        </div>

                    </Form>
                </Card>
            </div>
        </layout>
    </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserLogin',
  data () {
    return {

      addUserShow: false, // 不显示注册框
      loginForm: {
        uname: '赵四',
        upassword: '123456'
      },
      loginrole: { // 表单验证
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        upassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能小于6位!', trigger: 'blur' }
        ]
      },
      responseResult: []
    }
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),

    register () {
      this.$router.replace({ path: 'api/userregister' })
    },

    userlogin () {
      var _this = this

      console.log(this.$store.state) // 控制台打印日志

      this.$axios
        .post('api/userlogin', { // 前端发送post请求？
          uname: this.loginForm.uname,
          upassword: this.loginForm.upassword
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) { //= ==:完全相等,包括类型 200代表管理员登录
            console.log(this.loginForm.uname)
            console.log(this.loginForm.upassword)
            this.handleLogin(this.loginForm.uname)
            // _this.$store.commit('handleLogin', _this.loginForm) // 提交登录操作
            var path = this.$route.query.redirect // 重定向路径

            this.$router.replace({ path: '/home' }) // 未使用重定向
            // 路径存在则跳转;路径不存在，则跳转到界面userIndex
            // this.$router.replace({ path: path === '/' || path === undefined ? '/' : path })
          } else {
            this.$Message.error('用户名密码错误或账号已被冻结!')
            console.log(this.loginForm.uname)
            console.log(this.loginForm.upassword)
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
