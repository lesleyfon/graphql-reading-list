//author models

const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number,
});

//we create a model using the mongoose.model method and export it 
//model refers to a collection in a db
module.exports = mongoose.model('Author', authorSchema);