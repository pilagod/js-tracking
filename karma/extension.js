var configFactory = require('./configFactory')
var PORT = 9879

module.exports = configFactory(function (defaultConfig) {
  var customConfig = Object.assign({}, defaultConfig, {
    port: PORT,

    proxies: {
      '/script.js': `/base/test/script.js`
    },
    // list of files / patterns to load in the browser
    // all modules including in tests should be included here
    files: [
      /* targets */

      // utils
      { pattern: 'src/extension/utils.ts' },

      // contentscript
      { pattern: 'src/extension/contentscript.ts' },
      { pattern: 'src/extension/contentscriptHelpers.ts' },

      // devtool sidebar
      { pattern: 'src/extension/Sidebar/*.tsx' },

      /* dependencies */

      // tracker
      { pattern: 'src/tracker/public/*[!(.d)].ts' },

      /* tests */
      { pattern: 'test/*.ts' },
      { pattern: 'test/extension/**/*.ts' }
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      /* targets */

      // utils
      'src/extension/utils.ts': ['karma-typescript'],

      // contentscript
      'src/extension/contentscript.ts': ['karma-typescript', 'coverage'],
      'src/extension/contentscriptHelpers.ts': ['karma-typescript', 'coverage'],

      // devtool sidebar
      'src/extension/Sidebar/*.tsx': ['karma-typescript', 'coverage'],

      /* dependencies */

      // tracker
      'src/tracker/public/*[!(.d)].ts': ['karma-typescript'],

      /* tests */
      'test/*.ts': ['karma-typescript'],
      'test/extension/**/*.ts': ['karma-typescript']
    }
  })
  customConfig.karmaTypescriptConfig.reports.html = 'coverage/extension'

  return customConfig
})
