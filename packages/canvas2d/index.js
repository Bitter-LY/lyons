'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/canvas2d.cjs.prod.js')
} else {
  module.exports = require('./dist/canvas2d.cjs.js')
}
