'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/core.cjs.prod.js.js')
} else {
  module.exports = require('./dist/core.cjs.js.js')
}
