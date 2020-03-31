import React from "react";
import "./App.css";
import BookList from "./components/BookList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import AddBook from "./components/AddBook";

const client = new ApolloClient({});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Kafil Reading List</h1>
        <BookList></BookList>
        <AddBook></AddBook>
      </div>
    </ApolloProvider>
  );
}

export default App;
