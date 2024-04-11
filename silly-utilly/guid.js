import { ref, computed, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'



export const Guid = {

    setup(){

        const guids = ref([])

        const makeGuid = () => {

            guids.value.unshift(crypto.randomUUID())

        }

        const selectNCopy = (evt) => {
            console.dir(evt)

            let selection = window.getSelection().toString();
            console.dir(selection)
        }

        return {
            guids,
            makeGuid,
            selectNCopy
        }
    },

    template: `
    <div><button type="button" class="btn btn-outline-primary" @click="makeGuid">Make a guid</button></div>

    <div class="d-flex flex-wrap"><div style="cursor: default " class="px-2 user-select-all font-monospace" @click="selectNCopy" v-for="guid in guids"> {{guid}} </div></div>
    `

}