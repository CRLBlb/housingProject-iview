<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="messageUnreadCount+groupUnreadCount+perUnreadCount">
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="groupNotice">
          系统通知<Badge style="margin-left: 10px" :count="groupUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="perNotice">
          个人通知<Badge style="margin-left: 10px" :count="perUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    },
    groupUnreadCount: {
      type: Number,
      default: 0
    },
    perUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.replace({ path: '/userlogin' })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    group () {
      this.$router.push({
        name: 'group_page'
      })
    },
    per () {
      this.$router.push({
        name: 'per_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
        case 'groupNotice': this.group()
          break
        case 'perNotice': this.per()
          break
      }
    }
  }
}
</script>
