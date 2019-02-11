const state = {
    pulls: []
}

const getters = {
    pulls: state => state.pulls
}

const mutations = {
    FILL_PULLS(state, pulls) {
        state.pulls = pulls
    }
}

const actions = {
    fillPulls(ctx, pulls) {
        ctx.commit('FILL_PULLS', pulls)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}