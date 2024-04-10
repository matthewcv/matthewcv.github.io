import { ref, computed, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { DateFromTicks, TicksFromDate } from './datestuff.js'
import { LocalDateTime } from './local-date-time.js'



export const TicksTocks = {
    components:{
        LocalDateTime
    },
    setup(...args) {

        console.log('setup', args)
        const timeAsNumber = ref();
        const timeAsValue = ref();
        const ticks = ref();
        const mills = ref();
        const secs = ref();

        watch(timeAsValue,(n,o) =>{
            ticks.value = TicksFromDate(timeAsValue.value)
            mills.value = timeAsValue.value.getTime()
        })

        //setInterval(() => {timeAsValue.value = new Date()}, 1000)
//
        return {
            timeAsNumber,
            timeAsValue,
            ticks,
            mills,
            secs
        }
    },
    template: `
    <form>
        <div class="container">
          <div class="row">
              <div class="col">
                  <div>
                      <label for="someTimeNumber">some time number here</label>
                      <input type="number" class="form-control" id="someTimeNumber" v-model="timeAsNumber">
                  </div>
                  <div>
                      <label for="someTimeValue">some time value here</label>
                  <div class="input-group">
                      <LocalDateTime class="form-control" id="someTimeValue" v-model="timeAsValue"></LocalDateTime>
                      <button class="btn btn-outline-secondary" type="button" alt="now"  @click="timeAsValue = new Date()" >⏱</button>
                  </div>
                  </div>
              </div>
              <div class="col">
                  <div>
                      <label for="tickstime">Ticks</label>
                      <input type="number" class="form-control" id="tickstime" v-model="ticks" readonly>
                  </div>
                  <div>
                      <label for="epochmillstime">Mills Since Epoch</label>
                      <input type="number" class="form-control" id="epochmillstime" v-model="mills" readonly>
                  </div>
                  <div>
                      <label for="epochsecstime">Secs Since Epoch</label>
                      <input type="number" class="form-control" id="epochsecstime" v-model="secs" readonly>
                  </div>
              </div>
          </div>
      </div>
  </form>
       `
}

