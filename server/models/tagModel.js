const {mongoose, Schema} = require("mongoose");

const  tagSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please provide tag name']},
    category: Schema.Types.ObjectId
});

const Tag = mongoose.model('Tag',  tagSchema)

module.exports = Tag;