import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash/flowRight";
import { getAuthors, addBookMutation, getBooksQuery } from "./../queries/queries";

function AddBook(props) {
	const [authors, setAuthors] = useState([]);
	useEffect(() => {
		fetchAuthors();
	});

	const fetchAuthors = () => setAuthors(props.getAuthorsQuery.authors);
	const [book, setBook] = useState({
		name: "",
		genre: "",
		authorId: "",
	});
	const handleChange = (e) => {
		setBook({
			...book,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		props.addBookMutation({
			variables: {
				name: book.name,
				genre: book.genre,
				authorId: book.authorId,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});

		// Reset form fields
		setBook({
			name: "",
			genre: "",
			authorId: "",
		});
	};
	return (
		<form id="add-book" onSubmit={handleSubmit}>
			<div className="field">
				<label>Book name:</label>
				<input type="text" name="name" onChange={handleChange} />
			</div>
			<div className="field">
				<label>Genre:</label>
				<input type="text" name="genre" onChange={handleChange} />
			</div>
			<div className="field">
				<label>Author:</label>
				<select name="authorId" onChange={handleChange}>
					<option>Select author</option>
					{!authors ? (
						<option>Loading authors</option>
					) : (
						authors.map((author) => (
							<option key={author.id} value={author.id}>
								{author.name}
							</option>
						))
					)}
				</select>
			</div>
			<button>+</button>
		</form>
	);
}

export default compose(
	graphql(getAuthors, {
		name: "getAuthorsQuery",
	}),
	graphql(addBookMutation, {
		name: "addBookMutation",
	})
)(AddBook);
