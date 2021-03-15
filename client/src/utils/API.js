import axios from "axios";
import socketIOClient from "socket.io-client";
const socket = socketIOClient.connect()

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  sendUpdate: function (volumeInfo) {
    socket.on('savedBook', data=> {console.log('update')}, 
    socket.emit('event', volumeInfo.title)   
    )
  } 
};

