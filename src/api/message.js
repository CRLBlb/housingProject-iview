import axios from '@/libs/api.request'
import qs from 'qs'

export const getUserMessageCount = (uid) => {
  return axios.request({
    url: 'user/unreadNum/' + uid,
    method: 'get'
  })
}

export const getAgentMessageCount = (aid) => {
  return axios.request({
    url: 'agent/unreadNum/' + aid,
    method: 'get'
  })
}

export const getUserUnreadMessages = (uid) => {
  return axios.request({
    url: 'messages/user/unread/' + uid,
    method: 'get'
  })
}

export const getUserReadMessages = (uid) => {
  return axios.request({
    url: 'messages/user/read/' + uid,
    method: 'get'
  })
}

export const getAgentUnreadMessages = (aid) => {
  return axios.request({
    url: 'messages/agent/unread/' + aid,
    method: 'get'
  })
}

export const getAgentReadMessages = (aid) => {
  return axios.request({
    url: 'messages/agent/read/' + aid,
    method: 'get'
  })
}

export const getMessages = (uid, aid) => {
  return axios.request({
    url: 'messages/' + uid + '/' + aid,
    method: 'get'
  })
}

export const userSend = message => {
  return axios.request({
    url: 'messages/user',
    method: 'post',
    data: message
  })
}

export const agentSend = message => {
  return axios.request({
    url: 'messages/agent',
    method: 'post',
    data: message
  })
}

export const userRead = (uid, aid) => {
  var put = qs.stringify({ uid: uid, aid: aid })
  return axios.request({
    url: 'messages/user/read',
    method: 'put',
    data: put
  })
}

export const agentRead = (aid, uid) => {
  var put = qs.stringify({ uid: uid, aid: aid })
  return axios.request({
    url: 'messages/agent/read',
    method: 'put',
    data: put
  })
}
