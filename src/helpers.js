import { findTextInFiles } from 'find-text'
// for prettier text
import { blue, gray, yellow } from 'colors'

/**
 * Performs right-to-left function composition.
 */
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

/**
 * cleanLineText :: String => String => String
 * 
 * Remove unnecessary characters on the line text to be more readable based on the given command name. The final output is also trimmed.
 * @param {String} cmd is a command name.
 * @param {String} text is a line text
 * @return {String} New text.
 */
const cleanLineText = (cmd) => (text) => {
  // Handle if the command is todo
  if (cmd === 'TODO') {
    return text.replace('// TODO:', '').trim()
  }
  // Handle if the comman is fixme
  return text.replace('// FIXME:', '').trim()
}

/**
 * prettierText :: Array => void
 *
 * Display the results on the console with the pretty format.
 * @param {Array} results
 * @return {Void}
 */
const prettierText = (cmd) => (results) => {
  // iterate to each results
  results.forEach((result) => {
    const { fileName, matches } = result
    // log the filename
    console.info(blue(fileName))
    // iterate to each matches line of strings
    matches.forEach((line) => {
      const coloredLineNumber = gray(`(${line.lineNumber})`)
      const coloredLineText = compose(yellow, cleanLineText(cmd))
      // log the line information
      console.info(`  ${yellow('-')} ${coloredLineText(line.text)} ${coloredLineNumber}`)
    })
  })
}

// action fires when the command todo triggers
export const todoAction = (pattern) => {
  findTextInFiles('TODO', pattern)
    .then(prettierText('TODO'))
    .catch(console.error)
}

// action fires when the command fixme triggers
export const fixmeAction = (pattern) => {
  findTextInFiles('FIXME', pattern)
    .then(prettierText('FIXME'))
    .catch(console.error)
}
