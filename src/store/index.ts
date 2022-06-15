import Vue from 'vue'
import Vuex from 'vuex'
import { registerStoreModules } from './modules';

Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

const store = new Vuex.Store({});
registerStoreModules(store);
export default store;
