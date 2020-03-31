import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { BOOKS } from "./BookList";

const AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($name: String, $genre: String, $author: String) {
    addBook(name: $name, genre: $genre, author: $author) {
      name
      author {
        name
        age
      }
    }
  }
`;

export default function AddBook() {
  const emptyState = { name: "", genre: "", author: "" };
  const [state, setState] = useState(emptyState);
  const { loading, data } = useQuery(AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);

  const handleSubmit = e => {
    e.preventDefault();
    const { name, genre, author } = state;
    if (!author) return;
    addBook({
      variables: {
        name,
        genre,
        author
      },
      refetchQueries: [{ query: BOOKS }]
    });
    setState(emptyState);
  };

  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Add a book</h2>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="name"
            id="name"
            value={state.name}
          ></input>
        </div>
        <div className="input">
          <label>Genre</label>
          <input
            type="text"
            onChange={handleChange}
            name="genre"
            id="genre"
            value={state.genre}
          ></input>
        </div>
        <div className="input">
          <label>Author</label>

          {loading && <p>loading authors</p>}
          {data && (
            <select
              name="author"
              onChange={handleChange}
              value={state.author}
              required
            >
              <option>Select an author</option>
              {data.authors.map(author => {
                return (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <input type="submit" value="Add a book" />
      </form>
    </div>
  );
}
