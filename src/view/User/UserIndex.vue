<template>

    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                    <router-link v-bind:to="'/'">
                        <MenuItem name="1-1">
                            <Icon type="ios-navigate"></Icon>
                            <span>首页</span>
                        </MenuItem>
                    </router-link>
                    <!--                    <MenuItem name="1-2">-->
                    <!--                        <Icon type="ios-navigate"></Icon>-->
                    <!--                        <span>个人信息</span>-->
                    <!--                    </MenuItem>-->
                </Menu>
            </Sider>

            <Layout>
                <Header :style="{padding: 0}" class="layout-header">
                    <Menu mode="horizontal"  active-name="1">

                        <Submenu name="1">
                            <router-link slot="title" v-bind:to="'/forum/:pId'">
                                <Icon type="ios-people" />
                                我的论坛
                            </router-link>
                        </Submenu>

                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-paper" />
                                我的信息
                            </template>
                            <MenuGroup >
                                <MenuItem>
                                    <router-link v-bind:to="'/message/message_page'">
                                        消息推送
                                    </router-link>
                                </MenuItem>
                            </MenuGroup>
                        </Submenu>

                      <Submenu name="3">
                        <template slot="title">
                          <Icon type="ios-paper" />
                          房源信息
                        </template>
                        <MenuGroup >
                          <MenuItem>
                            <router-link v-bind:to="'/search/house'">
                              搜索房源
                            </router-link>
                          </MenuItem>
                        </MenuGroup>
                      </Submenu>
                        <div class="logout-button" style="float: right">
                            <Button @click="userlogout" >退出登录</Button>
                        </div>

                        <div class="user_avatar">
<!--                            <Avatar icon="ios-person" />-->
<!--                            <Avatar>U</Avatar>-->
<!--                            <Avatar>USER</Avatar>-->
                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
<!--                            <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>-->
<!--                            <Avatar style="background-color: #87d068" icon="ios-person" />-->
                        </div>

                    </Menu>
                </Header>
                <Content :style="{margin: '100px', background: '#f8f9fa', minHeight: '1000px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
  name: 'UserIndex',
  methods: {
    userlogout () {
      console.log(this.$store.state.user.uname) // 控制台打印日志
      window.localStorage.clear() // 清除所有缓存
      this.$router.replace({ path: '/userlogin' })
    }
  }
}
</script>

<style scoped>
    .user_avatar{
        float: right;
    }

</style>
