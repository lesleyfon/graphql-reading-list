import React from 'react';
import { gql, } from "apollo-boost";
import { graphql, Mutation } from 'react-apollo'

const getAuthors = gql`
   { 
       authors{
        name,
        id
        }   
    }
`;


function AddBook(props) {
    return (
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

    )
}

export default graphql(getAuthors)(AddBook)
