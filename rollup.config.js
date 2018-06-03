import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import cli from 'rollup-plugin-cli'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: {
    file: pkg.main,
    format: 'cjs'
  },
  plugins: [
    filesize(), // display the filesize.
    terser(), // uglifier for es modules
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    resolve(),
    commonjs(),
    cli()
  ],
  external: ['commander', 'find-text', 'supports-color']
}
