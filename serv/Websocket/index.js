const fs = require('fs')
module.exports = class Websocket {
  constructor (port) {
    this.io = require('socket.io')(port, {
      cors: {
        origin: ['http://localhost:8080']
      }
    })
    this.loadWebsocket()
  }

  loadWebsocket() {
    const eventsFile = fs.readdirSync('./Websocket/events').filter(file => file.endsWith('.js'))

    for (const event of eventsFile) {
      const Event = require(`./events/${event}`);
      console.log(`Registering websocket events ${Event.name}`)
      this.io.on(Event.name, (...args) => Event.run(this.io, this, ...args))
    }
  }
}
