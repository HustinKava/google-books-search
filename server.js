const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
// Setting up socket.io
const socketIo = require('socket.io');
const http = require('http');
// const { disconnect } = require("process");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// How to connect locally "mongodb://localhost/YOUR DATA BASE NAME"
mongoose.connect(
  process.env.MONGDB_URI || 'mongodb://localhost/googlebooks', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
  }
);

// Creating socket connection
const server = http.createServer(app)
const io = socketIo(server);
io.on('connection', client => {
  console.log('connected')

  client.on('event', data => { console.log(data)
  io.emit('savedBook', data)
  });
  
  client.on('disconnect', () => { console.log('disconnect')});
});
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


