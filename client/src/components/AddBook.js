import React, { useState, useRef, useEffect } from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash/flowRight";
import { getAuthors, addBookMutation, getBooksQuery } from "./../queries/queries";

function AddBook(props) {
	// Component Stat
	const [authors, setAuthors] = useState([]);
	const [error, setError] = useState(false);
	const selectRef = useRef(null);

	// UseEffect fot Fetching authors
	useEffect(() => {
		fetchAuthors();
	});

	// UseEffect for adding new author
	useEffect(() => {
		//
		window.$("document").ready(() => {
			window
				.$("#select-id")
				.select2({
					tags: true,
				})
				.on("change", (ev) => {
					// MAke the mutation to the addAuthor here
				});
		});
	});

	//
	const fetchAuthors = () => setAuthors(props.getAuthorsQuery.authors);
	//
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

		// Set error state to true if user doesn't fill out all form fields
		if (!book.name.trim() || !book.genre.trim()) {
			setError(true);
			return;
		}
		// Set error state to false if everything is okay
		setError(false);

		// Add books mutation
		props.addBookMutation({
			variables: {
				name: book.name,
				genre: book.genre,
				authorId: book.authorId,
			},

			// After adding a book, refetch books so book we just added gets updated to the display
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
			{error ? <h3 className="form-error">Please Fill All Form Fields...</h3> : null}
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
				<select name="authorId" id="select-id" onChange={handleChange} ref={selectRef}>
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
			<div className="add-author">Add author</div>
			<button className="submit-book">+</button>
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
