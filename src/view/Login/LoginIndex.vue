
<template>
  <div >
    <Layout>

      <Card>
        <div style="min-height: 1000px;">
          <div style="text-align: center">
            <div>
              <h1 >欢迎登录二手房平台</h1>
            </div>
            <div  >
              <Button @click="admin"  style="margin-right: 30px; margin-top: 100px"
                      type="primary"
                      shape="circle"
                      icon="ios-contact" >管理员登录</Button>
              &nbsp;
              <Button @click="agent"  style="margin-right: 30px;margin-right: 20px; margin-top: 100px"
                      type="primary"
                      shape="circle"
                      icon="ios-contact">中介人登录</Button>
              &nbsp;
              <Button @click="user"  style="margin-right: 30px; margin-top: 100px"
                      type="primary"
                      shape="circle"
                      icon="ios-contact" >客户登录</Button>
            </div>
          </div>
        </div>
      </Card>

      <Footer class="loginlayout-footer-center">2020 &copy; HIT</Footer>
    </Layout>

  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  methods: {
    admin () {
      this.$router.replace({ path: 'adminlogin' })
    },
    agent () {
      this.$router.replace({ path: 'agentlogin' })
    },
    user () {
      this.$router.replace({ path: 'userlogin' })
    }

  }

}
</script>

<style scoped>
  /*.loginlayout{*/
  /*  border: 1px solid #d7dde4;*/
  /*  background: #f5f7f9;*/
  /*  position: relative;*/
  /*  border-radius: 23px;*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*  overflow: hidden;*/
  /*}*/

  /*.loginlayout-footer-center{*/
  /*  height: 100%;*/
  /*  text-align: center;*/
  /*}*/
</style>
