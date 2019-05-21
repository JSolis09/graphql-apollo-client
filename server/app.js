const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/db_example", { useNewUrlParser: true }, function(err, cnn) {
    if(err) {
        console.error(err);
    }
    console.log("Successful connected");
});

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening on http://localhost:4000');
});