
console.log('swx loaded 2')




importScripts("./swx-other.js") // this works


importScripts("./swx-other.js?" + Math.random()) // this works too

setTimeout(() => {
  importScripts("./swx-another.js?" + Math.random())
}, 10000)