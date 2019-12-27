const express = require('express')
const app = express();
const PORT = process.env.PORT || 4040;
app.use(express.json());



app.listen(PORT, () => console.log(`App listening to port 4040`))