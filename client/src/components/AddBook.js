import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash/flowRight";
import { getAuthors, addBookMutation, getBooksQuery, addAuthor } from "./../queries/queries";

function AddBook(props) {
	// Component Stat
	const [authors, setAuthors] = useState([]);
	const [error, setError] = useState(false);

	// Determines which form inputs to display
	const [switchDisplay, setSwitchDisplay] = useState(true);

	// UseEffect fot Fetching authors
	useEffect(() => {
		fetchAuthors();
	});

	//
	const fetchAuthors = () => setAuthors(props.getAuthorsQuery.authors);
	//For form field
	const [book, setBook] = useState({
		name: "",
		genre: "",
		authorId: "",
	});

	// For form fields
	const [authorDetails, setAuthorsDetails] = useState({
		authorName: "",
		authorAge: "",
	});

	// Handle Change for the Book fields
	const handleChange = (e) => {
		console.log(e.target.name, e.target.value);
		setBook({
			...book,
			[e.target.name]: e.target.value,
		});
	};

	// Handle Change for the Author fields
	const handleAuthorFieldChange = (e) => {
		setAuthorsDetails({
			...authorDetails,
			[e.target.name]: e.target.value,
		});
	};

	// Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();

		// IF switch is false that means we are trying submit to a book
		if (switchDisplay === false) {
			if (!book.name.trim() || !book.genre.trim() || !book.authorId.trim()) {
				// Set error state to true if user doesn't fill out all form fields
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
		} else {
			if (!authorDetails.authorName.trim() || !Number(authorDetails.authorAge)) {
				// Set error state to true if user doesn't fill out all form fields
				setError(true);
				return;
			}
			setError(false);

			// Make a mutation to add an author
			props.addAuthor({
				variables: {
					name: authorDetails.authorName,
					age: Number(authorDetails.authorAge),
				},
				refetchQueries: [{ query: getAuthors }],
			});
			setAuthorsDetails({
				authorAge: "",
				authorName: "",
			});
		}
	};

	return (
		<form id="add-book" onSubmit={handleSubmit}>
			{error ? <h3 className="form-error">Please Fill All Form Fields...</h3> : null}
			<div className="field">
				{switchDisplay ? (
					<>
						<label>Author name:</label>
						<input
							type="text"
							name="authorName"
							value={authorDetails.authorName}
							onChange={handleAuthorFieldChange}
						/>
					</>
				) : (
					<>
						<label>Book name:</label>
						<input type="text" name="name" value={book.name} onChange={handleChange} />
					</>
				)}
			</div>
			<div className="field">
				{switchDisplay ? (
					<>
						<label>Author Age:</label>
						<input
							type="number"
							name="authorAge"
							value={authorDetails.authorAge}
							onChange={handleAuthorFieldChange}
						/>
					</>
				) : (
					<>
						<label>Genre:</label>
						<input
							type="text"
							name="genre"
							value={book.genre}
							onChange={handleChange}
						/>
					</>
				)}
			</div>
			<div className="field">
				<label>Author:</label>
				<select name="authorId" id="select-id" onChange={handleChange}>
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
			<div className="add-author" onClick={() => setSwitchDisplay(!switchDisplay)}>
				{switchDisplay ? "Add book" : "Add author"}
			</div>
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
	}),
	graphql(addAuthor, {
		name: "addAuthor",
	})
)(AddBook);
