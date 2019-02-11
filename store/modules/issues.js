const state = {
    issues: []
}

const getters = {
    issues: state => state.issues
}

const mutations = {
    FILL_ISSUES(state, issues) {
        state.issues = issues
    }
}

const actions = {
    fillIssues(ctx, issues) {
        ctx.commit('FILL_ISSUES', issues)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}