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
                            <FormItem label="用户名："  prop="uname">
                                <Input
                                        v-model="registerForm.uname"
                                        prefix="ios-person"
                                        type="text"
                                        placeholder="请输入用户名"
                                        clearable/>
                            </FormItem>
                            <FormItem label="密码:" prop="upassword">
                                <Input
                                        v-model="registerForm.upassword"
                                        prefix="ios-lock"
                                        placeholder="请输入管理员密码"
                                        clearable/>
                            </FormItem>
                            <FormItem label="性别："  prop="ugender">
                                <Input
                                        v-model="registerForm.ugender"
                                        prefix="ios-paper"
                                        type="text"
                                        placeholder="请输入性别"
                                        clearable/>
                            </FormItem>

                            <FormItem label="电话："  prop="ucontact">
                                <Input
                                        v-model="registerForm.ucontact"
                                        prefix="ios-paper"
                                        type="text"
                                        placeholder="请输入联系电话"
                                        clearable/>
                            </FormItem>

                            <FormItem label="地址："  prop="udistrict">
                                <Input
                                        v-model="registerForm.udistrict"
                                        prefix="ios-paper"
                                        type="text"
                                        placeholder="请输入地址"
                                        clearable/>
                            </FormItem>
                        </div>
                        <div class="register-button">
                            <Button type="primary" @click="register" >登录</Button>
                        </div>

                    </Form>
                </Card>
            </div>
        </layout>
    </div>
</template>

<script>
export default {
  name: 'UserRegister',
  data () {
    return {
      registerForm: {
        uid: '',
        uname: '',
        upassword: '',
        uvalidstatus: '1',
        ugender: '',
        ucontact: '',
        udistrict: '',
        uavatar: null
      },

      registerrole: { // 表单验证
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        upassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能小于6位!', trigger: 'blur' }
        ],
        ugender: [
          { required: true, message: '请输入性别！1代表男,0代表女', trigger: 'blur' },
          { type: 'string', max: 1, message: '1代表男,0代表女!', trigger: 'blur' }
        ],
        ucontact: [
          { required: true, message: '请输入电话!', trigger: 'blur' },
          { type: 'string', length: 11, message: '电话长度为11位!', trigger: 'blur' }
        ],
        udistrict: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { type: 'string', length: 45, message: '地址信息请勿超过45位', trigger: 'blur' }
        ]
      },
      responseResult: []
    }
  },
  methods: {
    register () {
      this.$axios
        .get('api/adminindex/searchuser/', { // 前端发送post请求？
        })
        .then(response1 => {
          // _this.total = response.total;

          this.registerForm.uid = response1.data.length
          // this.changePage(current)//更新当前页码的数据
          console.log(response1.data.length) // 控制台打印响应的数据
          this.$axios
            .post('api/userregister', {
              uid: this.registerForm.uid + 1,
              uname: this.registerForm.uname,
              upassword: this.registerForm.upassword,
              ugender: this.registerForm.ugender,
              uvalidstatus: this.registerForm.uvalidstatus,
              ucontact: this.registerForm.ucontact,
              udistrict: this.registerForm.udistrict,
              uavatar: this.registerForm.uavatar

            })
            .then(function (response2) {
              alert(JSON.stringify(response2.data))
              console.log('uid:' + this.registerForm.uid)
              console.log('uname:' + this.registerForm.uname)
              console.log('upassword:' + this.registerForm.upassword)
              console.log('uvalidstatus:' + this.registerForm.uvalidstatus)
              console.log('uavatar:' + this.registerForm.uavatar)
            })
            .catch(error => {
              console.log('uid:' + this.registerForm.uid)
              console.log('uname' + this.registerForm.uname)
              console.log('upassword' + this.registerForm.upassword)
              console.log('uvalidstatus' + this.registerForm.uvalidstatus)
              console.log('uavatar' + this.registerForm.uavatar)
              console.log('STH WRONG WITH IT LIUBO')
              console.log(error)
            })
        })
      // 错误处理
        .catch(error => {
          console.log(error)
          console.log('STH WRONG WITH IT LIUBO')
        })

      // this.$axios
      //      .post('/userregister', {
      //         uname: this.registerForm.uname,
      //         upassword: this.registerForm.upassword,
      //         ugender: this.registerForm.ugender,
      //         uvalidstatus: this.registerForm.uvalidstatus,
      //         ucontact: this.registerForm.ucontact,
      //         udistrict: this.registerForm.udistrict,
      //         uavatar: this.registerForm.uavatar,
      //
      //     })
      //     .then(function (response2) {
      //         alert(JSON.stringify(response2.data));
      //         console.log("uid:"+this.registerForm.uid);
      //         console.log("uname:"+this.registerForm.uname);
      //         console.log("upassword:"+this.registerForm.upassword);
      //         console.log("uvalidstatus:"+this.registerForm.uvalidstatus);
      //         console.log("uavatar:"+this.registerForm.uavatar);
      //     })
      //     .catch(error => {
      //         console.log("uid:"+this.registerForm.uid);
      //         console.log("uname"+this.registerForm.uname);
      //         console.log("upassword"+this.registerForm.upassword);
      //         console.log("uvalidstatus"+this.registerForm.uvalidstatus);
      //         console.log("uavatar"+this.registerForm.uavatar);
      //         console.log("STH WRONG WITH IT LIUBO");
      //         console.log(error);
      //     });
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

    .register-button{
        width: 400px;
        margin: 0 auto;
        display: block;
    }

</style>
