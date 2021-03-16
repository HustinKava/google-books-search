import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import API from "../utils/API";
import './Saved.css';

function Saved() {

  const [books, setBooks] = useState([])

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data) 
      )
      .catch(err => console.log(err));
  };

  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Navbar/>
      <h1 className='text-center heading'>Saved Books!</h1>
      <div className='container'>
      {books.length ? (
              <div>
                {books.map(book => (
                  <div className="container" key={book._id}>
                    <div className='card'>
                    <div className="row first">
                    <div className='left'>   
                     
                    <h5>
                      <i>{book.title}</i>
                    </h5>
                    <span className='top-text'>Authors: </span>
                    {book.authors ? book.authors.map(author => {
                    return <span className='top-text' key={author}>
                    {author + '. '}
                    </span>
                    }) :  <span className='top-text'>No authors to display</span>}                    

                    </div>

                    <div className='right'>
                    <a href={book.link} target='_blank' rel='noopener noreferrer'><button type="button" className="btn btn-lg">
                    <i className="fa fa-external-link" aria-hidden="true"></i>
                    </button></a>

                    <div className='divider'/>
                    
                    <button onClick={() => deleteBook(book._id)} type="button" className="btn btn-lg" aria-label="Close">
                    <i className="fa fa-minus-square-o" aria-hidden="true"></i>
                    </button>
                    </div>
                    </div>
                    
                    <div className="row">
                      <div className="col bottom">
                        <div className='text-center center-image'>
                      <img className='savedImage' src={book.image} alt={book.title}/>
                        </div>
                      </div>
                      <div className="col-9">
                      <p className='description'>
                      {book.description ? book.description : <span>No description available</span>}
                      </p>
                      </div>
                    </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h3 className='heading'>No Results to Display</h3>
            )}

      </div>
    </div>
  )
};

export default Saved;