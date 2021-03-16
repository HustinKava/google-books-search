import React, { useState } from "react";  
import axios from 'axios';  
import API from '../utils/API';
import Navbar from '../components/Navbar';
import './Search.css';
require('dotenv').config()

function Search() {
  
  // Creating useState for books, results and api key
  const [book, setBook] = useState("");  
  const [result, setResult] = useState([]);  
  
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Creating a handle event that will set the book state
  function handleChange(event) {  
    const book = event.target.value;  
    setBook(book);  
}  

// Creating a handle submit function that will use axios to get
// the books saved in the book state and set the result state with the searched books
function handleSubmit(event) {  
  event.preventDefault();  
  axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + API_KEY + "&maxResults=20")  
      .then(data => {   
          setResult(data.data.items);  
      }) 
}  

// Creating a form submit button to save the book and its values
function handleFormSubmit(id) {
 const { volumeInfo } = result.filter(book => book.id === id)[0]

//  Here we are passing volumeInfo content to API.js and we have to use a callback, so here we are actually logging the book title
// This is used for socket.io
 API.sendUpdate(volumeInfo, (data) => console.log('received saved update: ', data))

    // Saving the book details to the database
    API.saveBook({
      title: volumeInfo.title,
      authors: volumeInfo.authors,
      link: volumeInfo.infoLink,
      image: volumeInfo.imageLinks.thumbnail,
      description: volumeInfo.description
    })   
};

  return (
    <div>
    <Navbar/>
    <div className='container'>
      <form onSubmit={handleSubmit}>
        
      <div className="input-group">
      <input onChange={handleChange} type="search" className="form-control rounded searchInput" placeholder="Search for a book" aria-label="Search"
        aria-describedby="search-addon" />
      <button type="submit" value='Search' className="btn search">search</button>
      </div>

      </form>

    </div>

    <div className='container'>

      {result.map(book => (   
      <div className="container content" key={book.id}>
      <div className='card'>
      <div className="row first">

          
        <div className='left'> 
        <h5>
        <i>{book.volumeInfo.title}</i>
        </h5>
        <span className='top-text'>Authors: </span>  
        {book.volumeInfo.authors ? book.volumeInfo.authors.map(author => {
          return <span className='top-text' key={author}>
          {author + '. '}
          </span>
        }) :  <span className='top-text'>No authors to display</span>}
        </div>


          <div className='right'>
          <a href={book.volumeInfo.infoLink} target='_blank' rel='noopener noreferrer'><button type="button" className="btn btn-lg"><i className="fa fa-external-link" aria-hidden="true"></i></button></a>
          <div className='divider'/>
          <button onClick={() =>handleFormSubmit(book.id)} type="button" className="btn btn-lg"><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
          </div>
      </div>
      
      <div className="row">
        <div className="col bottom">
          <div className='text-center center-image'>
        <img className='img-fluid' src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.volumeInfo.title}/>
          </div>
        </div>
        <div className="col-9">
        <p className='description'>
        {book.volumeInfo.description ? book.volumeInfo.description : <span>No description available</span>}
        </p>
        </div>
      </div>
      </div>
    </div>  
        
      ))}

    </div>
  </div>



  )
};

export default Search;