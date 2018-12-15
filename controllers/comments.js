const commentsRouter = require("express").Router()
const Comment = require("../models/comment")

commentsRouter.get('/', async (request,response) => {
    let comments = await Comment.find({})
    .populate('blog',{author: 1, title: 1, url: 1, likes: 1});
    response.json(comments.map(comment => Comment.format(comment)))
})

module.exports = commentsRouter