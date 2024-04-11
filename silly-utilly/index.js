import { createApp, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { TicksTocks } from './tickstocks.js'
import { Rando } from './rando.js'



const pages = [
    {
        hash:"#/ticksntocks",
        label:"Ticks n Tocks",
        component: TicksTocks
    },
    {
        hash:"#/rando",
        label:"Rando",
        component: Rando
    }
]

const currentHash = ref(window.location.hash)

window.addEventListener('hashchange', (...args) => {
    //console.log('hashchange', args)
    currentHash.value = window.location.hash
  })

if(window.location.hash === ''){
    window.location.hash = pages[0].hash
}

const NotFoundPage = {
    setup(){
        return {
            currentHash
        }
    },
    template:'<p>Nothing found at <b>{{currentHash}}</b></p>'
}

const currentPage = computed(() => pages.find(e => e.hash == currentHash.value)?.component || NotFoundPage)

const Nav = {
    setup(){


        return {
            pages,
            currentHash
        }
    },

    template:`                
<nav class="nav nav-pills flex-column">
    <a v-for="page in pages" class="nav-link" :class="{active: page.hash === currentHash }" aria-current="page" :href="page.hash">{{page.label}}</a>

    
  </nav>`
}


const Content = {
    setup(){
        return {
            currentPage
        }
    },
    template:`

    <component :is="currentPage"></component>

    `
}

createApp()
.component('SuContent', Content)
.component('SuNav',Nav)
.mount('#app')
