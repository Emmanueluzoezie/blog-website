const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const BlogPost = new Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

const Blog = mongoose.model("Blog", BlogPost)
module.exports = Blog;