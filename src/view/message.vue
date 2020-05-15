<template>
  <Card shadow>
    <div>
      <div class="message-page-con message-category-con">
        <Menu width="auto" active-name="unread" @on-select="handleSelect">
          <MenuItem name="unread">
            <span class="category-title">未读消息</span><Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
          </MenuItem>
          <MenuItem name="readed">
            <span class="category-title">所有消息</span><Badge style="margin-left: 10px" class-name="gray-dadge" :count="messageReadedCount"></Badge>
          </MenuItem>
        </Menu>
      </div>
      <div class="message-page-con message-list-con">
        <Menu
          width="auto"
          active-name=""
          :class="titleClass"
          @on-select="handleView"
        >
          <MenuItem v-for="item in messageList" :name="item.aid" :key="`msg_${item.aid}`">
            <div>
              <Avatar :src="item.aavatar" />{{ item.aname }}
            </div>
          </MenuItem>
        </Menu>
      </div>
      <div class="message-page-con message-view-con">
        <!-- <div class="message-view-header">
          <h2 class="message-view-title">{{ showingMsgItem.title }}</h2>
          <time class="message-view-time">{{ showingMsgItem.create_time }}</time>
        </div> -->
        <template>
        <!-- <div v-html="messageContent"> -->
        <ul>
            <template v-for='item in messageContent'>
                    <li  v-if='item.sendorreceive==1' :key="item.title">
                      对方:
                        <div>
                            {{item.mcontent}}
                        </div>
                            <span>发送时间:{{item.mdate}}</span>
                    </li>
                    <li  v-if='item.sendorreceive==0' :key="item.title">
                      你:
                        <div>
                            {{item.mcontent}}
                        </div>
                            <span>发送时间:{{item.mdate}}</span>
                    </li>
            </template>
        <Form ref="reply" :model="reply" :rules="replyRules" inline>
        <FormItem prop="content">
            <Input v-model="reply.content" type="textarea" :rows="2"/>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('reply')">Submit</Button>
        </FormItem>
        </Form>
        </ul>
        </template>
      </div>
    </div>
  </Card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
const listDic = {
  unread: 'messageUnreadList',
  readed: 'messageReadedList'
}
export default {
  name: 'message_page',
  data () {
    return {
      reply: {
        content: ''
      },
      currentMessageType: 'unread',
      currentAid: '',
      messageContent: [],
      showingMsgItem: {},
      replyRules: {
        content: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      messageUnreadList: state => state.user.messageUnreadList,
      messageReadedList: state => state.user.messageReadedList,
      messageList () {
        return this[listDic[this.currentMessageType]]
      },
      titleClass () {
        return {
          'not-unread-list': this.currentMessageType !== 'unread'
        }
      }
    }),
    ...mapGetters([
      'messageUnreadCount',
      'messageReadedCount'
    ])
  },
  methods: {
    ...mapMutations([
      //
    ]),
    ...mapActions([
      'getContentByAgent',
      'getUnreadMessageList',
      'getReadMessageList',
      'readMessage',
      'PostMessage'
    ]),
    handleSelect (name) {
      this.currentMessageType = name
    },
    handleView (aid) {
      this.getContentByAgent({ aid }).then(content => {
        this.messageContent = content
        this.currentAid = aid
        this.readMessage(aid)
        const item = this.messageList.find(item => item.aid === aid)
        if (item) this.showingMsgItem = item
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          var post = {
            aid: this.currentAid,
            content: this.reply.content
          }
          this.PostMessage(post)
          this.getUnreadMessageList()
          this.getReadMessageList()
          this.handleView(this.currentAid)
          this.handleReset(name)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  mounted () {
    // 请求获取消息列表
    this.getUnreadMessageList()
    this.getReadMessageList()
  }
}
</script>

<style lang="less">
.chat-other{
  float: left;
}
.chat-me{
  float: right;
}
.message-page{
  &-con{
    height: ~"calc(100vh - 176px)";
    display: inline-block;
    vertical-align: top;
    position: relative;
    &.message-category-con{
      border-right: 1px solid #e6e6e6;
      width: 200px;
    }
    &.message-list-con{
      border-right: 1px solid #e6e6e6;
      width: 230px;
    }
    &.message-view-con{
      position: absolute;
      left: 446px;
      top: 16px;
      right: 16px;
      bottom: 16px;
      overflow: auto;
      padding: 12px 20px 0;
      .message-view-header{
        margin-bottom: 20px;
        .message-view-title{
          display: inline-block;
        }
        .message-view-time{
          margin-left: 20px;
        }
      }
    }
    .category-title{
      display: inline-block;
      width: 65px;
    }
    .gray-dadge{
      background: gainsboro;
    }
    .not-unread-list{
      .msg-title{
        color: rgb(170, 169, 169);
      }
      .ivu-menu-item{
        .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only{
          display: none;
        }
        &:hover{
          .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only{
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
