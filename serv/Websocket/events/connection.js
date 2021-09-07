module.exports = {
  name: 'connection',
  run: async (io, websocket, socket) => {
    console.log(socket.id)
  }
}
