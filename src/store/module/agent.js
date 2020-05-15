import {
  getAgentMessageCount,
  getAgentUnreadMessages,
  getAgentReadMessages,
  getMessages,
  agentSend
} from '@/api/message'
import {
  getNoticeByNid,
  getGroupAgentCount,
  getPerAgentCount,
  getAgentGroupRead,
  getAgentGroupUnread,
  agentReadGroupNotice,
  getAgentPerRead,
  getAgentPerUnread,
  readPerNotice
} from '@/api/notice'
import { agentRead } from '../../api/message'
import { getAgentInfo } from '@/api/agent'

export default {
  state: {
    agentName: '',
    agentId: '',
    avatarImgPath: '',
    access: '',
    hasGetInfo: false,
    messageUnreadCount: 0,
    groupUnreadCount: 0,
    perUnreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageContentStore: {},
    groupNoticeUnreadList: [],
    groupNoticeReadedList: [],
    groupNoticeContentStore: {},
    perNoticeUnreadList: [],
    perNoticeReadedList: [],
    perNoticeContentStore: {}
  },
  mutations: {
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setAgentId (state, id) {
      state.agentId = id
    },
    setAgentName (state, name) {
      state.agentName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.messageUnreadCount = count
    },
    setGroupCount (state, count) {
      state.groupUnreadCount = count
    },
    setPerCount (state, count) {
      state.perUnreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    updateMessageContentStore (state, { content }) {
      state.messageContentStore = content
    },
    setGroupNoticeUnreadList (state, list) {
      state.groupNoticeUnreadList = list
    },
    setGroupNoticeReadedList (state, list) {
      state.groupNoticeReadedList = list
    },
    updateGroupNoticeContentStore (state, { msg_id, content }) {
      state.groupNoticeContentStore[msg_id] = content
    },
    setPerNoticeUnreadList (state, list) {
      state.perNoticeUnreadList = list
    },
    setPerNoticeReadedList (state, list) {
      state.perNoticeReadedList = list
    },
    updatePerNoticeContentStore (state, { msg_id, content }) {
      state.perNoticeContentStore[msg_id] = content
    }
  },
  getters: {
    aMessageUnreadCount: state => state.messageUnreadList.length,
    aMessageReadedCount: state => state.messageReadedList.length,
    aGroupNoticeUnreadCount: state => state.groupNoticeUnreadList.length,
    aGroupNoticeReadedCount: state => state.groupNoticeReadedList.length,
    aPerNoticeUnreadCount: state => state.perNoticeUnreadList.length,
    aPerNoticeReadedCount: state => state.perNoticeReadedList.length
  },
  actions: {
    agentHandleLogin ({ commit }, name) {
      return new Promise((resolve, reject) => {
        getAgentInfo(name).then(res => {
          console.log(res.data)
          localStorage.setItem('AgentInfo', JSON.stringify(res.data))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAgentFromCache ({ commit }) {
      return new Promise((resolve, reject) => {
        var info = JSON.parse(localStorage.getItem('AgentInfo'))
        console.log(info)
        commit('setAvatar', info.aavatar)
        commit('setAgentId', info.aid)
        commit('setAgentName', info.aname)
        commit('setHasGetInfo', true)
        // this.getUnreadMessageCount()
        // this.getUnreadGroupNoticeCount()
        // this.getUnreadPerNoticeCount()
        resolve()
      })
    },
    agenthandleLogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('setAvatar', '')
        commit('setAgentId', '')
        commit('setAgentName', '')
        commit('setHasGetInfo', false)
        window.localStorage.clear() // 清除所有缓存
        this.$router.replace({ path: '/agentlogin' })
        resolve()
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    agentgetUnreadMessageCount ({ state, commit }) {
      getAgentMessageCount(state.agentId).then(res => {
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    agentgetUnreadMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        console.log(state)
        getAgentUnreadMessages(state.agentId).then(res => {
          const unread = res.data
          console.log(unread)
          commit('setMessageUnreadList', unread)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    agentgetReadMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getAgentReadMessages(state.agentId).then(res => {
          const read = res.data
          console.log(read)
          commit('setMessageReadedList', read)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    agentreadMessage ({ state, commit }, aid) {
      return new Promise((resolve, reject) => {
        agentRead(state.agentId, aid).then(res => {
          console.log(res)
          resolve()
        })
      })
    },
    agentgetUnreadGroupNoticeCount ({ state, commit }) {
      getGroupAgentCount(state.agentId).then(res => {
        const { data } = res
        commit('setGroupCount', data)
      })
    },
    agentgetUnreadGroupList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getAgentGroupUnread(state.agentId).then(res => {
          const unread = res.data
          commit('setGroupNoticeUnreadList', unread)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    agentgetReadGroupList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getAgentGroupRead(state.agentId).then(res => {
          const read = res.data
          commit('setGroupNoticeReadedList', read)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    agentreadGroupNotice ({ state, commit }) {
      return new Promise((resolve, reject) => {
        agentReadGroupNotice(state.agentId).then(res => {
          console.log(res)
          resolve()
        })
      })
    },
    agentgetUnreadPerNoticeCount ({ state, commit }) {
      getPerAgentCount(state.agentId).then(res => {
        const { data } = res
        commit('setPerCount', data)
      })
    },
    agentgetUnreadPerList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getAgentPerUnread(state.agentId).then(res => {
          const unread = res.data
          commit('setPerNoticeUnreadList', unread)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    agentgetReadPerList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getAgentPerRead(state.agentId).then(res => {
          const read = res.data
          commit('setPerNoticeReadedList', read)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    agentgetContentByUser ({ state, commit }, { uid }) {
      return new Promise((resolve, reject) => {
        getMessages(state.agentId, uid).then(res => {
          const content = res.data
          commit('updateMessageContentStore', { content })
          resolve(content)
        })
      })
    },
    agentgetContentByGroupId ({ state, commit }, { nid }) {
      return new Promise((resolve, reject) => {
        getNoticeByNid(nid).then(res => {
          const content = res.data
          commit('updateGroupNoticeContentStore', { content })
          resolve(content)
        })
      })
    },
    agentgetContentByPerId ({ state, commit }, { nid }) {
      return new Promise((resolve, reject) => {
        readPerNotice(nid).then(res => {
          const content = res.data
          commit('updatePerNoticeContentStore', { content })
          resolve(content)
        })
      })
    },
    agentPostMessage ({ state, commit }, reply) {
      var post = {
        id: state.agentId,
        targetId: reply.uid,
        content: reply.content
      }
      return new Promise((resolve, reject) => {
        console.log(post)
        agentSend(post)
        resolve()
      })
    }
  }
}
