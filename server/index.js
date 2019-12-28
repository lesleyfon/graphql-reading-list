require('dotenv').config()
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const PORT = process.env.PORT || 4040;
const MONGO_URL = process.env.MONGO_URL;
const mongoose = require('mongoose');
app.use(express.json());

//connect to the mongo db
mongoose.connect(
    MONGO_URL, 
    { 
        useNewUrlParser: true ,
        useUnifiedTopology: true
});

mongoose.connection.once('open', ()=> {
    console.log('connected to db')
})


//this is the super charged endpoint  
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))



app.listen(PORT, () => console.log(`App listening to port http://localhost:${PORT}`))