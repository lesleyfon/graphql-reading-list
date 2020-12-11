import React from "react";

// GraphQl
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

//Apollo Client setUp
const Client = new ApolloClient({
	//endpoint we are making request to
	uri: `http://localhost:4040/graphql`,
});

function App() {
	return (
		<ApolloProvider client={Client}>
			<div id="main">
				<h1>Reading List... </h1>
				<BookList />
				<AddBook />
			</div>
		</ApolloProvider>
	);
}

export default App;
