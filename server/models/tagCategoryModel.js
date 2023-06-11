const {mongoose, Schema} = require("mongoose");

const  tagCategorySchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please provide name for tag category']},
    children: {type: [Schema.Types.ObjectId], default: []}
});

const TagCategory = mongoose.model('TagCategory',  tagCategorySchema)

module.exports = TagCategory;