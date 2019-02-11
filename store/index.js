import Vue from 'vue'
import Vuex from 'vuex'

import issues from './modules/issues'
import pulls from './modules/pulls'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        issues,
        pulls
    }
})