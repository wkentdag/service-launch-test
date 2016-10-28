const Service = require('node-windows').Service
const path = require('path')

const service = new Service({
  name: 'testlaunch',
  description: 'this service should open an arbitrary application on start',
  script: path.join('C:', 'Users', 'will', 'code', 'service-launch-test', 'app.js')
})

service.on('install', () => {
  service.start()
})

service.on('start', () => {
  console.log(`${service.name} started!`)
})

service.install()
