import React, { useState } from "react";  
import axios from 'axios';  
import API from '../utils/API';
import Navbar from '../components/Navbar';
import './Search.css';


function Search() {
  
  // Creating useState for books, results and api key
  const [book, setBook] = useState("");  
  const [result, setResult] = useState([]);  
  const apiKey = 'AIzaSyA6C5xu1fdpTkDQbkwbWXsas3rh3_sXVIs'


  // Creating a handle event that will set the book state
  function handleChange(event) {  
    const book = event.target.value;  
    setBook(book);  
}  

// Creating a handle submit function that will use axios to get
// the books saved in the book state and set the result state with the searched books
function handleSubmit(event) {  
  event.preventDefault();  
  axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey + "&maxResults=20")  
      .then(data => {   
          setResult(data.data.items);  
      }) 
}  

// Creating a form submit button to save the book and its values
function handleFormSubmit(id) {
 const { volumeInfo } = result.filter(book => book.id === id)[0]

 API.sendUpdate(volumeInfo, (data) => console.log('received saved update: ', data))
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
      <input onChange={handleChange} type="search" className="form-control rounded" placeholder="Search for a book" aria-label="Search"
        aria-describedby="search-addon" />
      <button type="submit" value='Search' className="btn btn-outline-primary">search</button>
      </div>

      </form>

    </div>

    <div className='container'>

      {result.map(book => (   
      <div className="container" key={book.id}>
      <div className='card'>
      <div className="row first">
        <div className="col-10">
        <div className='left'> 
        <h5>
        {book.volumeInfo.title}
        </h5>
        <span>Authors: </span>  
        {book.volumeInfo.authors ? book.volumeInfo.authors.map(author => {
          return <span key={author}>
          {author + '. '}
          </span>
        }) :  <span>No authors to duisplay</span>}
        </div>
        </div>
        <div className="col">
          <div className='float-right right'>
          <a href={book.volumeInfo.infoLink} target='_blank' rel='noopener noreferrer'><button type="button" className="btn btn-secondary btn-sm">View</button></a>
          <div className='divider'/>
          <button onClick={() =>handleFormSubmit(book.id)} type="button" className="btn btn-secondary btn-sm">Save</button>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col">
          <div className='text-center'>
        <img className='img-fluid' src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.volumeInfo.title}/>
          </div>
        </div>
        <div className="col-9">
        <p>
        {book.volumeInfo.description}
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