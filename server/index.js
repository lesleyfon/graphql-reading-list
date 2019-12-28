require('dotenv').config()
const express = require('express');
//middleware  to enable graphql work with node.js
const graphqlHTTP = require('express-graphql');
// Import our graphql schema where all aur queries and mutations are
const schema = require('./schema/schema')
const app = express();
const PORT = process.env.PORT || 4040;
//url to connect to the mongo db
const MONGO_URL = process.env.MONGO_URL;
//Mongoose is a package that helps us work/make CRUD operations with the mongoDb 
const mongoose = require('mongoose');

app.use(express.json());

//connect to the mongo db
mongoose.connect(
    MONGO_URL, 
    { 
        useNewUrlParser: true ,
        useUnifiedTopology: true
});

// starty server after we connect to the mongio db
mongoose.connection.once('open', ()=> {
    console.log('connected to db')
})


//this is the super charged endpoint  
// Creating a single endpoint for the graphql where we'll be making all are api calls to 
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))



app.listen(PORT, () => console.log(`App listening to port http://localhost:${PORT}`))