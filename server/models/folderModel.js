const {mongoose, Schema} = require("mongoose");

const folderSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Folder name is not provided']},
    description: String,
    type: {type: String, enum: [
        'seed folder', 'queue folder', 'collection folder', 'showcase folder']
    },
    children: {
        type: [{id: Schema.Types.ObjectId, customPosition: Number}], default: []
    }
});

const Folder = mongoose.model('Folder', folderSchema)

module.exports = Folder;