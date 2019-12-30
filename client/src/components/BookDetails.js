import React, {}from 'react';
import { graphql } from 'react-apollo';
import {getBookQuery} from "./../queries/queries"


function BookDetails({data}) {
    console.log(data)
    return (
        <div id='book-details'>
            <p>book details</p>
        </div>
    )
}

export default graphql(getBookQuery)(BookDetails)
