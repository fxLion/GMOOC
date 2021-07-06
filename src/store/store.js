import Vue from 'vue'
import Vuex from 'vuex'
import util from '@/util/util'

Vue.use(Vuex)

const state = {
  USER_INFO: {
    realName: '',
    userId: null
  },
  PROJECT_ID: null,
  GROUP_ID: null
}

const mutations = {
  setValue: function (state, payload) {
    if (payload.category === 'user_info') {
      state.USER_INFO = payload.user_info
      util.setSessionInfo('user_info', payload.user_info)
    } else if (payload.category === 'project_id') {
      state.PROJECT_ID = payload.project_id
      util.setSessionInfo('project_id', payload.project_id)
    } else if (payload.category === 'group_id') {
      state.GROUP_ID = payload.group_id
      util.setSessionInfo('group_id', payload.group_id)
    }
  }
}

const getters = {
  getValue: function (state) {
    return function (category) {
      if (category === 'user_info') {
        let localData = util.getSessionInfo('user_info')
        if (localData && state.USER_INFO.userId === null) {
          mutations.setValue(state, {
            category: 'user_info',
            user_info: localData
          })
        }
        return state.USER_INFO
      } else if (category === 'project_id') {
        let localData = util.getSessionInfo('project_id')
        if (localData && state.PROJECT_ID === null) {
          mutations.setValue(state, {
            category: 'project_id',
            project_id: localData
          })
        }
        return state.PROJECT_ID
      } else if (category === 'group_id') {
        let localData = util.getSessionInfo('group_id')
        if (localData && state.GROUP_ID === null) {
          mutations.setValue(state, {
            category: 'group_id',
            project_id: localData
          })
        }
        return state.GROUP_ID
      }
    }
  }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})

export default store
