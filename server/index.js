const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const PORT = process.env.PORT || 4040;
app.use(express.json());

//this is the super charged endpoint  
app.use('/graphql', graphqlHTTP({}))



app.listen(PORT, () => console.log(`App listening to port http://localhost:${PORT}`))