const mongoose = require("mongoose")

var commentSchema = new mongoose.Schema({
    content: String,
    blog: {type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}
})

commentSchema.statics.format = function(comment) {
    return {
      content: comment.content, 
      blog: comment.blog,
      id: comment._id
    }
  }

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment