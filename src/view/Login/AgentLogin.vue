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
                <Card title="欢迎登录二手房平台系统" style="text-align: center;">
                    <Form ref="loginForm" :model="loginForm" :rules="loginrole"  >
                        <div class="login-input">
                            <FormItem label="中介人账号："  prop="aname">
                                <Input
                                        v-model="loginForm.aname"
                                        prefix="ios-person"
                                        type="text"
                                        placeholder="请输入账号"
                                        clearable/>
                            </FormItem>
                            <FormItem label="密码:" prop="apassword">
                                <Input
                                        v-model="loginForm.apassword"
                                        prefix="ios-lock"
                                        placeholder="请输入密码"
                                        type="password"
                                        password/>
                            </FormItem>
                          <SliderVerificationCode height="60px" sliderWidth="120px"  inactiveValue="未解锁" activeValue="已解锁" v-model="value"/>
                        </div>
                        <div style="text-align: center;" >
                            <Button type="primary" style="margin-right: 50px" @click="agentlogin" >登录</Button>
                            <Button type="primary" style="margin-right: 50px" @click="register">注册</Button>
                        </div>

                    </Form>
                </Card>
            </div>
        </layout>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'AgentLogin',
  data () {
    return {
      loginForm: {
        aname: 'Sam',
        apassword: '123456'
      },
      loginrole: { // 表单验证
        aname: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        apassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能小于6位!', trigger: 'blur' }
        ]
      },
      responseResult: []
    }
  },
  methods: {
    ...mapActions([
      'agentHandleLogin'
    ]),
    register () {
      this.$router.replace({ path: '/agentregister' })
    },
    agentlogin () {
      var _this = this

      console.log(this.$store.state) // 控制台打印日志?

      this.$axios
        .post('api/agentlogin', { // 前端发送post请求？
          aname: this.loginForm.aname,
          apassword: this.loginForm.apassword
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) { //= ==:完全相等,包括类型 200代表管理员登录
            console.log(successResponse)
            // _this.$store.commit('agentlogin', _this.loginForm)
            this.agentHandleLogin(this.loginForm.aname) // 提交登录操作，存储登录信息
            var path = this.$route.query.redirect // 重定向路径

            // 路径存在则跳转;路径不存在，则跳转到首页AppIndex
            this.$router.replace({ path: path === '/' || path === undefined ? '/agentindex' : path })
          } else {
            this.$Message.error('用户名密码错误或账号已被冻结!')
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

    .layout-nav {
        width: auto;
        float: right;
        margin: 0 20px 0 auto;
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
