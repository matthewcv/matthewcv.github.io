import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import {DateFromTicks, TicksFromDate} from './datestuff.js'




createApp({
  setup() {
    const message = ref(TicksFromDate(new Date()))
    return {
      message
    }
  }
}).mount('#app')
