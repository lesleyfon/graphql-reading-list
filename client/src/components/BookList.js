import React, { useState, useEffect}from 'react';
//package to make request to the graphql server
import { gql } from 'apollo-boost';
//bind graphql to react
import{ graphql } from 'react-apollo'
//wuery to get books from the graphql sserver
const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`;
 

function BookList(props) {
    const [books, setBooks] = useState([]); 
    useEffect(() => {
       fetchBooks();
    });

    const fetchBooks = ()=> {
        setBooks(props.data.books)
    } 
    return (
        <div>
            <ul id='book-list'>
                {props.data.loading 
                    ? 
                    <p>Loading Books</p> 
                    :
                    <>
                        {
                            Boolean(books) 
                                && 
                            books.map(book =>
                                 <li key={book.id}>{book.name}</li>
                                 )
                        }  
                    </>
                }
            </ul>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList);