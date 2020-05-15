import axios from '@/libs/api.request'
import qs from 'qs'

export const getUserInfo = (userName) => {
  return axios.request({
    url: 'user/name',
    params: {
      uname: userName
    },
    method: 'get'
  })
}
