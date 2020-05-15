<style scoped>
.layout{
        border: 1px solid #041324;
        background: #f8f9fa;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #07245e;
        border-radius: 3px;
        margin: 30px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>主页</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="ios-search"></Icon>
                        <span>搜索</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="ios-settings"></Icon>
                        <span>用户设置</span>
                    </MenuItem>
                </Menu>
            </Sider>
        <Layout>
                <Header :style="{padding: 0}" class="layout-header">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <!-- <Icon class="layout-logo-left" style="{text-align: centre}"></Icon> -->
                        <Menu mode="horizontal" :theme="theme1" active-name="1">
                            <MenuItem name="1">
                                    <Icon type="ios-paper" />
                                        导航
                            </MenuItem>
                            <MenuItem name="2">
                                <!-- <router-link v-bind:to="'/house'"> -->
                                    <Icon type="ios-people" />
                                        房源大全
                                <!-- </router-link> -->
                            </MenuItem>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-stats" />
                                        论坛
                                </template>
                                <MenuGroup title="使用">
                                    <MenuItem name="3-1">新增和启动</MenuItem>
                                    <MenuItem name="3-2">活跃分析</MenuItem>
                                    <MenuItem name="3-3">时段分析</MenuItem>
                                </MenuGroup>
                                <MenuGroup title="留存">
                                    <MenuItem name="3-4">用户留存</MenuItem>
                                    <MenuItem name="3-5">流失用户</MenuItem>
                                </MenuGroup>
                            </Submenu>
                            <MenuItem name="4">
                                <Icon type="ios-construct" />
                                    通知
                            </MenuItem>
                        </Menu>
                </Header>
                <Content :style="{margin: '100px', background: '#f8f9fa', minHeight: '1000px'}">



                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      isCollapsed: false
      
    }
  },
  created () {
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    }
  }
}
</script>
