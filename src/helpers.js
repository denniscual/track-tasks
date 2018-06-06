const { findTextInFiles } = require('find-text')
// for prettier text
const chalk = require('chalk')

const { info } = console

// Constant variables
const TODO = 'TODO'
const FIXME = 'FIXME'

/**
 * Performs right-to-left function composition.
 */
exports.compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

/**
 * cleanLineText :: String => String => String
 *
 * Remove unnecessary characters on the line text to be more readable based on the given command name. The final output is also trimmed.
 * @param {String} cmd is a command name. Either TODO or FIXME.
 * @param {String} text is a line text
 * @return {String} New text.
 */
exports.cleanLineText = (cmd) => (text) => {
  // get the first match, represent by index, based on the given string (cmd).
  const index = text.search(cmd)
  // length of cmd
  const length = cmd.length
  // omit the cmd word which is included in the text.
  // We gonna add the index to length so that the extraction
  // will start at the end of character of cmd not at the first character.
  const newText = text.slice(index+length)
  // remove unnecessary special character :
  const cleanText = newText.replace(':', '').trim()
  return cleanText
}

/**
 * prettyFileName :: (String, String) => void
 *
 * Log the fileName in pretty format.
 * @param {String} cmd
 * @param {String} fileName
 * @return {Void}
 */
exports.prettyFileName = (cmd, fileName) => {
  const { compose } = exports
  const { underline, green, red } = chalk
  // format fileName with todo scheme
  const formatTodo = compose(info, underline, green)
  // format fileName with fixme scheme
  const formatFixme = compose(info, underline, red)
  // Handle specific color for each cmd
  if (cmd === TODO) {
    formatTodo(fileName)
  } else {
    formatFixme(fileName)
  }
}

/**
 * prettierText :: Array => void
 *
 * Display the results on the console with the pretty format.
 * @param {Array} results
 * @return {Void}
 */
exports.prettierText = (cmd) => (results) => {
  const { gray, white } = chalk
  // iterate to each results
  results.forEach((result) => {
    const { fileName, matches } = result
    // log the filename in pretty format.
    exports.prettyFileName(cmd, fileName)
    // iterate to each matches line of strings
    matches.forEach((line) => {
      const coloredLineNumber = gray(`(${line.lineNumber})`)
      const coloredLineText = exports.compose(white, exports.cleanLineText(cmd))
      // log the line information
      info(`  ${white('-')} ${coloredLineText(line.text)} ${coloredLineNumber}`)
    })
  })
}

// action fires when the command todo triggers
exports.todoAction = (pattern) => {
  findTextInFiles(TODO, pattern)
    .then(exports.prettierText(TODO))
    .catch(console.error)
}

// action fires when the command fixme triggers
exports.fixmeAction = (pattern) => {
  findTextInFiles(FIXME, pattern)
    .then(exports.prettierText(FIXME))
    .catch(console.error)
}
