import {
  getUserMessageCount,
  getUserUnreadMessages,
  getUserReadMessages,
  getMessages,
  userSend
} from '@/api/message'
import {
  getNoticeByNid,
  getGroupUserCount,
  getPerUserCount,
  getUserGroupRead,
  getUserGroupUnread,
  userReadGroupNotice,
  getUserPerRead,
  getUserPerUnread,
  readPerNotice
} from '@/api/notice'
import { userRead } from '../../api/message'
import { getUserInfo } from '@/api/user'

export default {
  state: {
    userName: '',
    userId: '',
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
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
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
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    groupNoticeUnreadCount: state => state.groupNoticeUnreadList.length,
    groupNoticeReadedCount: state => state.groupNoticeReadedList.length,
    perNoticeUnreadCount: state => state.perNoticeUnreadList.length,
    perNoticeReadedCount: state => state.perNoticeReadedList.length
  },
  actions: {
    handleLogin ({ commit }, name) {
      return new Promise((resolve, reject) => {
        // console.log(name)
        getUserInfo(name).then(res => {
          console.log(res.data)
          localStorage.setItem('UserInfo', JSON.stringify(res.data))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserFromCache ({ commit }) {
      return new Promise((resolve, reject) => {
        var info = JSON.parse(localStorage.getItem('UserInfo'))
        console.log(info.uavatar)
        commit('setAvatar', info.uavatar)
        commit('setUserId', info.uid)
        commit('setUserName', info.uname)
        commit('setHasGetInfo', true)
        this.getUnreadMessageCount()
        this.getUnreadGroupNoticeCount()
        this.getUnreadPerNoticeCount()
        resolve()
      })
    },
    handleLogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('setAvatar', '')
        commit('setUserId', '')
        commit('setUserName', '')
        commit('setHasGetInfo', false)
        window.localStorage.clear() // 清除所有缓存
        resolve()
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    getUnreadMessageCount ({ state, commit }) {
      getUserMessageCount(state.userId).then(res => {
        console.log(res)
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    getUnreadMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        console.log(state)
        getUserUnreadMessages(state.userId).then(res => {
          const unread = res.data
          console.log(unread)
          commit('setMessageUnreadList', unread)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getReadMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserReadMessages(state.userId).then(res => {
          const read = res.data
          console.log(read)
          commit('setMessageReadedList', read)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    readMessage ({ state, commit }, aid) {
      return new Promise((resolve, reject) => {
        userRead(state.userId, aid).then(res => {
          console.log(res)
          resolve()
        })
      })
    },
    getUnreadGroupNoticeCount ({ state, commit }) {
      getGroupUserCount(state.userId).then(res => {
        const { data } = res
        commit('setGroupCount', data)
      })
    },
    getUnreadGroupList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserGroupUnread(state.userId).then(res => {
          const unread = res.data
          commit('setGroupNoticeUnreadList', unread)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getReadGroupList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserGroupRead(state.userId).then(res => {
          const read = res.data
          commit('setGroupNoticeReadedList', read)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    readGroupNotice ({ state, commit }) {
      return new Promise((resolve, reject) => {
        userReadGroupNotice(state.userId).then(res => {
          console.log(res)
          resolve()
        })
      })
    },
    getUnreadPerNoticeCount ({ state, commit }) {
      getPerUserCount(state.userId).then(res => {
        const { data } = res
        commit('setPerCount', data)
      })
    },
    getUnreadPerList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserPerUnread(state.userId).then(res => {
          const unread = res.data
          commit('setPerNoticeUnreadList', unread)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getReadPerList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserPerRead(state.userId).then(res => {
          const read = res.data
          commit('setPerNoticeReadedList', read)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getContentByAgent ({ state, commit }, { aid }) {
      return new Promise((resolve, reject) => {
        getMessages(state.userId, aid).then(res => {
          const content = res.data
          commit('updateMessageContentStore', { content })
          resolve(content)
        })
      })
    },
    getContentByGroupId ({ state, commit }, { nid }) {
      return new Promise((resolve, reject) => {
        getNoticeByNid(nid).then(res => {
          const content = res.data
          commit('updateGroupNoticeContentStore', { content })
          resolve(content)
        })
      })
    },
    getContentByPerId ({ state, commit }, { nid }) {
      return new Promise((resolve, reject) => {
        readPerNotice(nid).then(res => {
          const content = res.data
          commit('updatePerNoticeContentStore', { content })
          resolve(content)
        })
      })
    },
    PostMessage ({ state, commit }, reply) {
      var post = {
        id: state.userId,
        targetId: reply.aid,
        content: reply.content
      }
      return new Promise((resolve, reject) => {
        console.log(post)
        userSend(post)
        resolve()
      })
    }
  }
}
