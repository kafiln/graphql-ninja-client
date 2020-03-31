import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_BOOK = gql`
query($id:String){
    book($id){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                id
                name
                genre
            }
        }
    }
}
`;

function BookDetails() {
  return (
    <div>
      <p>Output book details here</p>
    </div>
  );
}

export default BookDetails;
