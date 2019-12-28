//book models

const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
});

//we create a model using the mongoose.model method and export it 
//model refers to a collection in a db
module.exports = mongoose.model('Book', bookSchema);