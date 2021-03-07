import {
  createStore
} from 'vuex'
import axios from 'axios'

export default createStore({
  state() {
    return {
      tasks: [],
      task:null,
      errorMessage: ''
    }
  },
  mutations: {
    changeStatusInState({task,tasks},{status,type,activeStatus,id}) {
      const idx = tasks.findIndex(elem => elem.id == id)
      task.status.text = status
      task.status.type = type
      task.status.active = activeStatus
      tasks[idx] = task
    },

    taskUpdate(state, tasks) {
      state.tasks = tasks || []
      state.loader = false
    },

    setErrorMessage(state, message) {
      state.errorMessage = message
    },

    deleteTaskInState(state, id) {
      state.tasks = state.tasks.filter(elem => elem.id != id)
    }

  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    getTask(state) {
      return state.task
    },
    tasksActive(_, getters) {
      return getters.tasks.filter(elem => elem.status.active === true).length
    },
    errorMessage(state) {
      return state.errorMessage
    },
    getElementId(state) {
      return (id) => state.tasks.findIndex(elem => elem.id == id)
    }
  },
  actions: {

    async getTasksInDatabase({commit}) {
      try {
        const { data } = await axios.get(`${process.env.VUE_APP_URL}.json`)
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
      }
    },

    async saveStatusInDatabase({ state,getters }, id) {
      const idx = getters.getElementId(id)
      try {
        await axios.put(`${process.env.VUE_APP_URL}/${state.tasks[idx].id}.json`, {
          ...state.tasks[idx],
        })
      } catch (e) {
        state.errorMessage = e.message
      }
    },

    async addedTask({dispatch,state}, task) {
      try {
        await axios.post(`${process.env.VUE_APP_URL}.json`, task)
        await dispatch("getTasksInDatabase")
      } catch (e) {
        state.errorMessage = e.message
      }
    },

    async getTask({state},id) {
      try{
        const { data } = await axios.get(`${process.env.VUE_APP_URL}/${id}.json`)
        state.task = await data
      }catch(e) {
        state.errorMessage = e.message
      }
    },

    async deleteTask({state,commit,getters}, id) {
      const idx = getters.getElementId(id)
      try {
        await axios.delete(`${process.env.VUE_APP_URL}/${state.tasks[idx].id}.json`)
        commit('deleteTaskInState', state.tasks[idx].id)
      } catch (e) {
        state.errorMessage = e.message
      }
    }

  },
  modules: {}
})
