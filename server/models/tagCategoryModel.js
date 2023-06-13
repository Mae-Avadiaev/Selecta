const {mongoose, Schema} = require("mongoose");
// const findOrCreate = require('mongoose-find-or-create')


const  categorySchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please provide name for tag category']},
    // children: {type: [Schema.Types.ObjectId], default: []}
    type: String,

});

// categorySchema.plugin(findOrCreate)

const Category = mongoose.model('Category',  categorySchema)

module.exports = Category;