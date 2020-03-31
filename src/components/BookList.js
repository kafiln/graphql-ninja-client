import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const BOOKS = gql`
  {
    books {
      name
      id
      author {
        name
        age
      }
    }
  }
`;

function BookList() {
  const { loading, data, error } = useQuery(BOOKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const books = data.books.map(({ id, name, author }) => (
    <li key={id}>
      <p>
        {name} by {author.name}
      </p>
    </li>
  ));
  return <ul className="book-list">{books}</ul>;
}

export default BookList;
