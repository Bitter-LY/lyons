import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import commonJs from '@rollup/plugin-commonjs'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

export default {
  input: './packages/canvas2d/src/index.ts',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    commonJs(),
    json({
      namedExports: false
    })
  ]
}
