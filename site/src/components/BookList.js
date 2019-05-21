import React from 'react';

import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        };
    }
    
    displayBooks() {
        const { loading, books } = this.props.data;
        if (loading) {
            return <div>Loading books....</div>
        } else {
            return books.map(book => (
                <li key={book.id} onClick={(e) => this.setState({ selected: book.id })}>{book.name}</li>
            ));
        }
    }
    render() {
        return (
            <div className="BookContainer">
                <ul className="BookList">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookId={this.state.selected} />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);