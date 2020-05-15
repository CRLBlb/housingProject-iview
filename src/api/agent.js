import axios from '@/libs/api.request'

export const getAgentInfo = (agentName) => {
  return axios.request({
    url: 'agent/name',
    params: {
      aname: agentName
    },
    method: 'get'
  })
}
