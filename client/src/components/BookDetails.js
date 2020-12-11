import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "./../queries/queries";

// Delete Svg
import DeleteSVG from "./../assets/trash.svg";

function BookDetails(props) {
	const { book } = props.data;
	const displayBookDetails = () => {
		if (book) {
			return (
				<div>
					<h2>{book.name}</h2>
					<p>{book.genre}</p>
					<p>{book.author.name}</p>
					<p>All books By {book.author.name}</p>
					<ul className="other-books">
						{book.author.book.map((item) => (
							<li key={item.id}>{item.name}</li>
						))}
					</ul>
					<div className="delete-container">
						<img src={DeleteSVG} alt="Delete Book" />
					</div>
				</div>
			);
		} else {
			return <div>No book Selected</div>;
		}
	};
	return <div id="book-details">{displayBookDetails()}</div>;
}

export default graphql(getBookQuery, {
	options: (props) => {
		return {
			variables: {
				id: props.bookId,
			},
		};
	},
})(BookDetails);
