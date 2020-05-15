<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
  // mounted () {
  //   let _this = this
  //   let opts = {
  //     query: 'loginUser=linzf'
  //   }
  //   // socketIo连接的服务器信息，就是我们后端配置的信息
  //   let socket = io.connect('http://127.0.0.1:9099', opts)
  //   socket.on('connect', function () {
  //     console.log('连接成功')
  //   })
  //   // 接收后端发送过来的消息
  //   socket.on('push_event', function (data) {
  //     console.log(data)
  //   })
  //   socket.on('disconnect', function () {
  //     console.log('已经下线')
  //   })
  // },
  // sockets: {
  //   // 这里是监听connect事件
  //   connect: function () {
  //     // 获取每台客服端生成的id
  //     this.websocketid = this.$socket.id
  //     console.log('链接服务器')
  //   },
  //   // 监听断开连接，函数
  //   disconnect () {
  //     console.log('断开服务器连接')
	//   },
	//   // 服务端指定有msg监听的客服端，可接对应发来的收消息，data服务端传的消息
	//   msg (data) {

	//   }
  // }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  // overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
