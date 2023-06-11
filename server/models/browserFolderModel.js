const {mongoose, Schema} = require("mongoose");

const browserFolderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User of the browser folder is not provided']
    },
    type: {type: String, enum: [
            'seed browser folder', 'queue browser folder',
            'collection browser folder', 'showcase browser folder']
    },
    children: {
        type: [{id: Schema.Types.ObjectId, customPosition: Number}], default: []
    }
});

const BrowserFolder = mongoose.model('BrowserFolder', browserFolderSchema)

module.exports = BrowserFolder;