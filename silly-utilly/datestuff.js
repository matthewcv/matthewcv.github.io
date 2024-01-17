
const epochTicks = 621355968000000000;
const ticksPerMs = 10000;

export function DateFromTicks(ticks) {
  if(typeof(ticks) !== 'number') {
    throw 'not ticks'
  }


  let dif = ticks - epochTicks;
  let difms = dif / ticksPerMs;

  return new Date(difms);
}

export function TicksFromDate(date) {
  if(typeof(date) === 'object' && typeof(date.getTime) === 'function'){
    date = date.getTime();
  }

  if(typeof(date) !== 'number') {
    throw 'not a date'
  }
  
  let dateTicks = date * ticksPerMs;
  return dateTicks + epochTicks


}
