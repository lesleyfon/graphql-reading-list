import React, { useState, useEffect}from 'react';

//bind graphql to react
import{ graphql } from 'react-apollo'
//wuery to get books from the graphql sserver
import { getBooksQuery} from './../queries/queries'
import BookDetails from './BookDetails';

function BookList(props) {
    const [books, setBooks] = useState([]); 
    const [bookId, setBookId ] = useState(null)
    useEffect(() => {
       fetchBooks();
    });

    const fetchBooks = ()=> {
        setBooks(props.data.books)
    } 
    const handleCLick = (e, id) => {
        e.preventDefault()
        setBookId(id)
    }
    return (
        <div>
            <ul id='book-list'>
                {props.data.loading || !books
                    ? 
                    <p>Loading Books</p> 
                    :
                    <>
                        {
                           
                            books.map(book =>
                                 <li key={book.id} onClick={e => handleCLick(e, book.id)}>{book.name}</li>
                                 )
                        }  
                    </>
                }
            </ul>
            <BookDetails bookId = { bookId }/>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList);