import { ref, computed, watchEffect } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
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

        watchEffect(() => {
            console.dir([timeAsNumber.value, timeAsValue.value])

        })

        //setInterval(() => {timeAsValue.value = new Date()}, 1000)

        return {
            timeAsNumber,
            timeAsValue
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
                      <LocalDateTime class="form-control" id="someTimeValue" v-model="timeAsValue"></LocalDateTime>
                  </div>

              </div>
              <div class="col">
                  <div>
                      <label for="tickstime">Ticks</label>
                      <input type="number" class="form-control" id="tickstime">
                  </div>
                  <div>
                      <label for="epochmillstime">Mills Since Epoch</label>
                      <input type="number" class="form-control" id="epochmillstime">
                  </div>
                  <div>
                      <label for="epochsecstime">Secs Since Epoch</label>
                      <input type="number" class="form-control" id="epochsecstime">
                  </div>
              </div>
          </div>
      </div>
  </form>
       `
}

