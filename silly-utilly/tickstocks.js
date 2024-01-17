import { ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

import {DateFromTicks, TicksFromDate} from './datestuff.js'

export const TicksTocks = {
    setup(){

        const ticks = ref(TicksFromDate(new Date()))

        return {
            ticks
        }
    },
    template: `
    {{ticks}}
    `   
}

