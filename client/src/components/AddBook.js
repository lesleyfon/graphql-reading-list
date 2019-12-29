import React, {useState} from 'react';
import { graphql, Mutation } from 'react-apollo'
import {getAuthors} from './../queries/queries'

function AddBook(props) {
    const [book, setBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    })
    const handleChange = e => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
        // <Mutation
        <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
            <label>Book name:</label>
            <input type="text" name='name' onChange={handleChange}/>
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" name='genre' onChange={handleChange}/>
        </div>
        <div className="field">
            <label>Author:</label>
            <select name='authorId' onChange={handleChange}>
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
