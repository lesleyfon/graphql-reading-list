import React from 'react';
import { graphql, Mutation } from 'react-apollo'
import {getAuthors} from './../queries/queries'

// const addBook = gql`
//     mutation addBook( name, genre, authorId){

//     }
// `;

function AddBook(props) {
    return (
        // <Mutation>
        <form id="add-book">
        <div className="field">
            <label>Book name:</label>
            <input type="text" />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" />
        </div>
        <div className="field">
            <label>Author:</label>
            <select>
                <option>Select author</option>
                {   
                    Boolean(props.data.authors) 
                        && 
                    props.data.authors.map(author => 
                        <option 
                            key={author.id} 
                            value={author.id}>
                            {author.name}
                        </option>)
                }
            </select>
        </div>
        <button>+</button>

    </form>
    // </Mutation>
    )
}

export default graphql(getAuthors)(AddBook)
