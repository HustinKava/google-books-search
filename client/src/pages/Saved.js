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
      <h1 className='text-center'>Saved Books!</h1>
      <div className='container'>
      {books.length ? (
              <div>
                {books.map(book => (
                  <div className="container" key={book._id}>
                    <div className='card'>
                    <div className="row first">
                    <div className="col-10">
                    <div className='left'>   
                     
                    <h5>
                      {book.title}
                    </h5>
                    <span>Authors: </span>
                    {book.authors ? book.authors.map(author => {
                    return <span key={author}>
                    {author + '. '}
                    </span>
                    }) :  <h1>loading</h1>}                    

                    </div>
                    </div>

                    <div className="col">
                    <div className='float-right right'>
                    <a href={book.link} target='_blank' rel='noopener noreferrer'><button type="button" className="btn btn-secondary btn-sm">View</button></a>
                    <div className='divider'/>
                    <button onClick={() => deleteBook(book._id)} type="button" className="btn btn-secondary btn-sm">Delete</button>
                    </div>
                    </div>
                    </div>
                    
                    <div className="row">
                      <div className="col">
                        <div className='text-center'>
                      <img className='img-fluid' src={book.image} alt={book.title}/>
                        </div>
                      </div>
                      <div className="col-9">
                      <p>
                      {book.description}
                      </p>
                      </div>
                    </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h3>No Results to Display</h3>
            )}

      </div>
    </div>
  )
};

export default Saved;