const execa = require('execa')
const path = require('path')

const myAppExe = path.join('C:', 'Program Files (x86)', 'Buttercup', 'Buttercup.exe')
const chromeExe = path.join('C:', 'Program Files (x86)', 'Google', 'Chrome', 'Application', 'chrome.exe')

console.log('executing...')

execa(chromeExe)
.then(result => {
  console.log('got a result:')
  console.log(result)
})
.catch(err => {
  console.error('got an error :( ')
  console.error(err)
})

console.log('done')
