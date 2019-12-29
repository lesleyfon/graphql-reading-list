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
