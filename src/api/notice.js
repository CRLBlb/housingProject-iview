import axios from '@/libs/api.request'
import qs from 'qs'

export const getNoticeByNid = (nid) => {
  return axios.request({
    url: 'group/' + nid,
    method: 'get'
  })
}

export const getGroupUserCount = (uid) => {
  return axios.request({
    url: 'group/user/num/' + uid,
    method: 'get'
  })
}

export const getGroupAgentCount = (aid) => {
  return axios.request({
    url: 'group/agent/num/' + aid,
    method: 'get'
  })
}

export const getPerUserCount = (uid) => {
  return axios.request({
    url: 'personal/user/num/' + uid,
    method: 'get'
  })
}

export const getPerAgentCount = (aid) => {
  return axios.request({
    url: 'personal/agent/num/' + aid,
    method: 'get'
  })
}

export const getUserGroupRead = (uid) => {
  return axios.request({
    url: 'group/user/read/' + uid,
    method: 'get'
  })
}

export const getUserGroupUnread = (uid) => {
  return axios.request({
    url: 'group/user/unread/' + uid,
    method: 'get'
  })
}

export const getAgentGroupRead = (aid) => {
  return axios.request({
    url: 'group/agent/read/' + aid,
    method: 'get'
  })
}

export const getAgentGroupUnread = (aid) => {
  return axios.request({
    url: 'group/agent/unread/' + aid,
    method: 'get'
  })
}

export const postGroupNotice = notice => {
  return axios.request({
    url: 'group/post',
    method: 'post',
    data: notice
  })
}

export const userReadGroupNotice = uid => {
  var put = qs.stringify({ uId: uid })
  return axios.request({
    url: 'group/user/read',
    method: 'put',
    data: put
  })
}

export const agentReadGroupNotice = aid => {
  var put = qs.stringify({ aId: aid })
  return axios.request({
    url: 'group/agent/read',
    method: 'put',
    data: put
  })
}

export const getUserPerRead = (uid) => {
  return axios.request({
    url: 'personal/user/read/' + uid,
    method: 'get'
  })
}

export const getUserPerUnread = (uid) => {
  return axios.request({
    url: 'personal/user/unread/' + uid,
    method: 'get'
  })
}

export const getAgentPerRead = (aid) => {
  return axios.request({
    url: 'personal/agent/read/' + aid,
    method: 'get'
  })
}

export const getAgentPerUnread = (aid) => {
  return axios.request({
    url: 'personal/agent/unread/' + aid,
    method: 'get'
  })
}

export const postUserPersonalNotice = notice => {
  return axios.request({
    url: 'personal/user/post',
    method: 'post',
    data: notice
  })
}

export const postAgentPersonalNotice = notice => {
  return axios.request({
    url: 'personal/agent/post',
    method: 'post',
    data: notice
  })
}

export const readPerNotice = nid => {
  var put = qs.stringify({ nid: nid })
  return axios.request({
    url: 'personal/read',
    method: 'put',
    data: put
  })
}
