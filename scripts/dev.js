const { build } = require('esbuild')
const nodePolyfills = require('@esbuild-plugins/node-modules-polyfill')
const { resolve, relative } = require('path')
const args = require('minimist')(process.argv.slice(2))

const target = args._[0] || 'canvas2d'
const format = args.f || 'global'
const pkg = require(resolve(__dirname, `../packages/${target}/package.json`))

// resolve output
const outputFormat =
  format === 'global' ? 'iife' : format === 'cjs' ? 'cjs' : 'esm'

const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
)
const relativeOutfile = relative(process.cwd(), outfile)

// TODO this logic is largely duplicated from rollup.config.js
let external = []
if (format === 'cjs' || format.includes('esm-bundler')) {
  external = [...external, ...Object.keys(pkg.dependencies || {})]
}

build({
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
  outfile,
  bundle: true,
  external,
  sourcemap: true,
  format: outputFormat,
  globalName: pkg.buildOptions?.name,
  platform: format === 'cjs' ? 'node' : 'browser',
  plugins: format === 'cjs' ? [nodePolyfills.default()] : undefined,
  define: {
    __COMMIT__: `"dev"`,
    __VERSION__: `"${pkg.version}"`,
    __DEV__: `true`
  },
  watch: {
    onRebuild(error) {
      if (!error) console.log(`重新编译: ${relativeOutfile}`)
    }
  }
}).then(() => {
  console.log(`监听: ${relativeOutfile}`)
})
