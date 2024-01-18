// a component that renders as a input type datetime-local and allows binding a javascript Date object as the v-model. 

export const LocalDateTime = {
    props:{
        modelValue:Date
    },
    emits:['update:modelValue'],
    setup(props, ctx){
    const timeZoneOffsetMills = new Date().getTimezoneOffset() * 60 * 1000;

    
      return {
        timeAsValueForLocal() {
            if(!!props.modelValue){
                return props.modelValue.getTime() - timeZoneOffsetMills
            }
            return NaN
        },

        timeAsValueFromLocal(time) {
            console.log('emitting time',time)
            let updateVal;
            if(time !== NaN){
                updateVal = new Date(time + timeZoneOffsetMills)
            }
            
            ctx.emit('update:modelValue', updateVal)
        }
      }
   },
   template: `
   <input type="datetime-local" step=".001" 
                          :valueAsNumber="timeAsValueForLocal()"
                          @input="e => timeAsValueFromLocal(e.target.valueAsNumber)">
   `
}