const  graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

//define schema
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
     })
})