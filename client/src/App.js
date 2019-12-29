import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
//Apollo Client setUp
const Client = new ApolloClient({
    //endpoint we are making request to 
    uri: `http://localhost:4040/graphql`     
}) 


function App() {
    return (
        <ApolloProvider client= {Client}>
            <div className='main'>
                <h1>Reading List... </h1>
                <BookList />
            </div>

        </ApolloProvider>
    )
}

export default App
