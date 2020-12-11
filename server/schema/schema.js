const graphql = require("graphql");
// Importing our book and author Mongo models
const BookModel = require("./../models/book");
const AuthorModel = require("./../models/author");

//then we extrapolate graphql methods from the graphql package
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
} = graphql;

//Define schemas for our graphql queries
const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		name: {
			type: GraphQLString,
		},
		genre: {
			type: GraphQLString,
		},
		author: {
			type: AuthorType,
			resolve(parent, args) {
				//parent is equal to the book model and we get the autorId from the book model
				return AuthorModel.findById(parent.authorId);
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		name: {
			type: GraphQLString,
		},
		age: {
			type: GraphQLInt,
		},
		book: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return BookModel.find({
					authorId: parent.id,
				});
			},
		},
	}),
});

// RootQuery
//How we Jump into a graph
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: {
				id: {
					type: GraphQLID,
				},
			},
			resolve(parent, args) {
				return BookModel.findById(args.id);
			},
		},

		author: {
			type: AuthorType,
			args: {
				id: {
					type: GraphQLID,
				},
			},
			resolve(parent, args) {
				return AuthorModel.findById(args.ID);
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return BookModel.find({});
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return AuthorModel.find({});
			},
		},
	},
});

const Mutations = new GraphQLObjectType({
	name: "Mutations",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
				},
				age: {
					type: new GraphQLNonNull(GraphQLInt),
				},
			},
			resolve(parent, args) {
				let author = new AuthorModel({
					name: args.name,
					age: args.age,
				});
				return author.save();
			},
		},

		addBook: {
			type: BookType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
				},
				genre: {
					type: new GraphQLNonNull(GraphQLString),
				},
				authorId: {
					type: new GraphQLNonNull(GraphQLID),
				},
			},
			resolve(parent, args) {
				let book = new BookModel({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				});
				return book.save();
			},
		},

		deleteBook: {
			type: BookType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
				},
			},
			resolve(parent, args) {
				let bookId = args.id;
				// Model to delete Book

				BookModel.deleteOne({ _id: bookId })
					.then((data) => {
						console.log("BOOK DELETED");
					})
					.catch((err) => {
						console.log("err");
					});
				return bookId;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations,
});
