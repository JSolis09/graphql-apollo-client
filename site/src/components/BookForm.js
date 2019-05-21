import React from 'react';
import { graphql, compose } from 'react-apollo';

import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../queries/queries';


class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    displayAuthors() {
        const { authors, loading } = this.props.getAuthorsQuery;
        if (loading) {
            return <option>Loading Authors...</option>;
        } else {
            return authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>);
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId,
            },
            refetchQueries: [
                { query: getBooksQuery },
            ],
        });
    }
    
    render() {
        return (
            <form className="BookForm" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label></label>
                    <input className="BookForm--Input" name="name" type="text" placeholder="Book Name" onChange={this.handleChange} />
                </div>
                <div className="field">
                <label></label>
                    <input className="BookForm--Input" name="genre" type="text" placeholder="Genre" onChange={this.handleChange} />
                </div>
                <div className="field">
                    <label></label>
                    <select className="BookForm--Input" name="authorId" onChange={this.handleChange}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select> 
                </div>
                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" }),
)(BookForm);