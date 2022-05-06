const {
  add
} = require('./js/math.js')

import "./js/element";
const a = 1
console.log(a);
if (module.hot) {
  module.hot.accept("./js/element", () => {
    console.log(1111);
  })
}
