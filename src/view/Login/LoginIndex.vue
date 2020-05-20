
<template>
  <div >
    <Carousel autoplay  style="height: 100px; text-align: center;font-size: 20px; background: #348EED; color: #041324">
      <Carousel-item>
        <div class="demo-carousel">
          <div>
            {{this.beijing_position}}
          </div>
          <div>
            {{this.beijing_text}}
          </div>
          <div>
            {{this.beijing_feels_like}}℃
          </div>

        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">
          <div>
            {{this.shanghai_position}}
          </div>
          <div>
            {{this.shanghai_text}}
          </div>
          <div>
            {{this.shanghai_feels_like}}℃
          </div>
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">

          <div>
            {{this.shenzheng_position}}
          </div>
          <div>
            {{this.shenzheng_text}}
          </div>
          <div>
            {{this.shenzheng_feels_like}}℃
          </div>

        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">
          <div>
            {{this.xiamen_position}}
          </div>
          <div>
            {{this.xiamen_text}}
          </div>
          <div>
            {{this.xiamen_feels_like}}℃
          </div>
        </div>
      </Carousel-item>
    </Carousel>
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

  data () {
    return {
      search: '', // 搜索栏的默认值为空
      date: '',

      beijing_position: '',
      beijing_text: '',
      beijing_feels_like: '',

      shanghai_position: '',
      shanghai_text: '',
      shanghai_feels_like: '',

      shenzheng_position: '',
      shenzheng_text: '',
      shenzheng_feels_like: '',

      xiamen_position: '',
      xiamen_text: '',
      xiamen_feels_like: ''
    }
  },

  methods: {
    admin () {
      this.$router.replace({ path: 'adminlogin' })
    },
    agent () {
      this.$router.replace({ path: 'agentlogin' })
    },
    user () {
      this.$router.replace({ path: 'userlogin' })
    },

    weather_beijing () { // 北京实时天气
      this.$axios
        .get('getweather/' + 110101) // 调用GET方法
        .then(response => { // 连接成功
          this.date = JSON.stringify(response.data.result.forecasts.date)

          this.beijing_position = JSON.stringify(response.data.result.location.city)
          this.beijing_text = JSON.stringify(response.data.result.now.text)
          this.beijing_feels_like = JSON.stringify(response.data.result.now.feels_like)

          this.shanghai_position = JSON.stringify(response.data.result.location.city)
          this.shanghai_text = JSON.stringify(response.data.result.now.text)
          this.shanghai_feels_like = JSON.stringify(response.data.result.now.feels_like)

          this.shenzheng_position = JSON.stringify(response.data.result.location.city)
          this.shenzheng_text = JSON.stringify(response.data.result.now.text)
          this.shenzheng_feels_like = JSON.stringify(response.data.result.now.feels_like)

          this.xiamen_position = JSON.stringify(response.data.result.location.city)
          this.xiamen_text = JSON.stringify(response.data.result.now.text)
          this.xiamen_feels_like = JSON.stringify(response.data.result.now.feels_like)

          console.log('success！')
          console.log(response)
        })
        .catch(error => { // 连接失败
          console.log('连接失败' + error)
          console.log('STH WRONG WITH IT LIUBO')
        })
    },

    weather_shanghai () {
      this.$axios
        .get('getweather/' + 310100) // 调用GET方法
        .then(response => { // 连接成功
          this.date = JSON.stringify(response.data.result.forecasts.date)

          this.shanghai_position = JSON.stringify(response.data.result.location.city)
          this.shanghai_text = JSON.stringify(response.data.result.now.text)
          this.shanghai_feels_like = JSON.stringify(response.data.result.now.feels_like)

          console.log('success！')
          console.log(response)
        })
        .catch(error => { // 连接失败
          console.log('连接失败' + error)
          console.log('STH WRONG WITH IT LIUBO')
        })
    },

    weather_shenzheng () {
      this.$axios
        .get('getweather/' + 440300) // 调用GET方法
        .then(response => { // 连接成功
          this.date = JSON.stringify(response.data.result.forecasts.date)

          this.shenzheng_position = JSON.stringify(response.data.result.location.city)
          this.shenzheng_text = JSON.stringify(response.data.result.now.text)
          this.shenzheng_feels_like = JSON.stringify(response.data.result.now.feels_like)

          console.log('success！')
          console.log(response)
        })
        .catch(error => { // 连接失败
          console.log('连接失败' + error)
          console.log('STH WRONG WITH IT LIUBO')
        })
    },

    weather_xiamen () {
      this.$axios
        .get('getweather/' + 350200) // 调用GET方法
        .then(response => { // 连接成功
          this.date = JSON.stringify(response.data.result.forecasts.date)

          this.xiamen_position = JSON.stringify(response.data.result.location.city)
          this.xiamen_text = JSON.stringify(response.data.result.now.text)
          this.xiamen_feels_like = JSON.stringify(response.data.result.now.feels_like)

          console.log('success！')
          console.log(response)
        })
        .catch(error => { // 连接失败
          console.log('连接失败' + error)
          console.log('STH WRONG WITH IT LIUBO')
        })
    }
  },

  mounted () {
    this.weather_beijing()
    this.weather_shanghai()
    this.weather_shenzheng()
    this.weather_xiamen()
  }

}
</script>

<style scoped>

</style>
