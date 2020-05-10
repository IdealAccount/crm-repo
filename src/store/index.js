import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    GET_USER(state) {
      Vue.set(state, "user", {
        firstName: "dev",
        lastName: "front",
        groupVolume: "0.00",
        groupVolumeProgressBar: 0,
        countOfChildren: 0,
        countOfFirstLine: "0",
        selfVolume: 0,
        children: [],
        deepLvl: 1,
        root: true
      });
    },
    ADD_CARD(state, [card, data]) {
      card.children.push(data);
    },
  },
  actions: {
    add_card({commit}, card) {
      if (!card) {
        commit('GET_USER')
      }
      else {
        let data = {
          parentName: card.firstName,
          firstName: 'partner of',
          lastName: `${card.parentName}-${card.children.length}`,
          groupVolume: "0.00",
          groupVolumeProgressBar: 0,
          countOfChildren: card.children && card.children.length ? card.children.length : 0,
          countOfFirstLine: "0",
          selfVolume: 0,
          children: [],
          deepLvl: card.deepLvl + 1
        }
        commit('ADD_CARD', [card, data]);
      }
    },
  },
  getters: {
    GET_ROOT_USER(state) {
      return state.user;
    }
  }
})
