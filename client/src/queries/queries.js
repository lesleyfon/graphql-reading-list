//package to make request to the graphql server
import { gql } from 'apollo-boost';

export const getAuthors = gql`
   { 
       authors{
        name,
        id
        }   
    }
`;
export const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`;
export const addBookMutation = gql`
    mutation ($name:String! $genre:String!, $authorId: ID!){
        addBook( name: $name, genre:$genre, authorId: $authorId){
            name,
            id
        }
    }

`;
