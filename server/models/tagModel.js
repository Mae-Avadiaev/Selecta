const {mongoose, Schema} = require("mongoose");
// const findOrCreate = require('mongoose-find-or-create')


const  tagSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please provide tag name']},
    data: Object,
    category: {
        type: Schema.Types.ObjectId, ref: 'Category',
        required: [true, 'Please provide category id']
    },
    suggested: Boolean
});

// tagSchema.plugin(findOrCreate)

const Tag = mongoose.model('Tag',  tagSchema)

module.exports = Tag;