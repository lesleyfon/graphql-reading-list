//package to make request to the graphql server
import { gql } from "apollo-boost";

// Get authors Query
export const getAuthors = gql`
	{
		authors {
			name
			id
		}
	}
`;

// Get all books query
export const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

// Add book Mutation
export const addBookMutation = gql`
	mutation($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

// Fetches book query
export const getBookQuery = gql`
	query($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				book {
					name
					id
				}
			}
		}
	}
`;
