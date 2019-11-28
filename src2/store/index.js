import Vue from 'vue'
import Vuex from 'vuex'
import Local from '../local/index'

Vue.use(Vuex)

const store = new Vuex.Store({

    state:{
        token:Local.get('token')||''
    },
    mutations: {
        addtoken(state,v){
            console.log(v)
            state.token=v
            Local.set('token',state.token)
        }
    }


})

export default store
