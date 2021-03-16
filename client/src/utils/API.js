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
  // The sendUpdate function is passing volumeInfo which is the data of the saved book 
  // It has a callback function to be able to create an action using that data
  // VolumeInfo is passed from Search.js and then we use sendUpdate() in App.js
  // We then save volumeInfo into a state in App.js and pass it to Notification.js
  sendUpdate: function (volumeInfo, cb) {
    socket.on('savedBook', data => cb(data))
    
    // only if there is volumeInfo then emit
    if(volumeInfo) {
    
    socket.emit('event', volumeInfo.title)  
    }   
}
};

