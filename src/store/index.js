import {
  createStore
} from 'vuex'
import axios from 'axios'

export default createStore({
  state() {
    return {
      tasks: [],
      loader: true,
      url: 'https://vue-freelance-db362-default-rtdb.firebaseio.com/freelance.json',
      errorMessage: ''
    }
  },
  mutations: {
    changeStatusInState(state, {status,type,activeStatus,id}) {
      const idx = state.tasks.findIndex(elem => elem.id == id)
      state.tasks[idx].status.text = status
      state.tasks[idx].status.type = type
      state.tasks[idx].status.active = activeStatus
    },

    taskUpdate(state, tasks) {
      state.tasks = tasks || []
      state.loader = false
    },

    setErrorMessage(state, message) {
      state.errorMessage = message
    },

    loader(state) {
      state.loader = false
    },

    deleteTaskInState(state, id) {
      state.tasks = state.tasks.filter(elem => elem.id != id)
    }

  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    getTask(_, getters) {
      return (id) => getters.tasks.find(elem => elem.id == id)
    },
    tasksActive(_, getters) {
      return getters.tasks.filter(elem => elem.status.active === true).length
    },
    loader(state) {
      return state.loader
    },
    errorMessage(state) {
      return state.errorMessage
    },
    getElementId(state) {
      return (id) => state.tasks.findIndex(elem => elem.id == id)
    }
  },
  actions: {

    async getTaskInDatabase({
      state,
      commit
    }) {
      try {
        const { data } = await axios.get(state.url)
        if (!data) {
          await commit('taskUpdate')
        } else {
          const task = await Object.keys(data).map(elem => {
            return {
              ...data[elem],
              id: elem
            }
          })
          await commit('taskUpdate', task)
        }

      } catch (e) {
        commit('setErrorMessage', e.message)
      } finally {
        commit('loader')
      }
    },

    async saveStatusInDatabase({ state,getters }, id) {
      const idx = getters.getElementId(id)
      try {
        await axios.put(`https://vue-freelance-db362-default-rtdb.firebaseio.com/freelance/${state.tasks[idx].id}.json`, {
          ...state.tasks[idx],
        })
      } catch (e) {
        state.errorMessage = e.message
      }
    },

    async addedTask({dispatch,state}, task) {
      try {
        await axios.post(state.url, task)
        await dispatch("getTaskInDatabase")
      } catch (e) {
        state.errorMessage = e.message
      }
    },

    async deleteTask({state,commit,getters}, id) {
      const idx = getters.getElementId(id)
      try {
        await axios.delete(`https://vue-freelance-db362-default-rtdb.firebaseio.com/freelance/${state.tasks[idx].id}.json`)
        commit('deleteTaskInState', state.tasks[idx].id)
      } catch (e) {
        state.errorMessage = e.message
      }
    }

  },
  modules: {}
})
