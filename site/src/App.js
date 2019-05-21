import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header>
          <h1 className ="AppTitle">List of Books</h1>
        </header>
        <BookList />
        <BookForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
