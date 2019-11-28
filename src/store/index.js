import Vue from 'vue'
import Vuex from 'vuex'
import Local from '../local/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token:Local.get('token')||'',
        userItem:Local.get('title')||''
    },
    mutations: {
        addlist(state,lis){
            // console.log(lis)
            Local.set('token',lis.token)
            Local.set('title',lis.list)
            state.userItem = lis.list
            // console.log(state.userItem)
        }
    }
})

export default store
