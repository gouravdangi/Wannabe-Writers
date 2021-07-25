const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    author: {
        type: String
    },
    date: {
        type: String
    }
});

module.exports = mongoose.model('Blog', blogSchema);