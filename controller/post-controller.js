const Post = require("../models/postSchema");

const createpost = async (req, res) => {
    console.log(req.body);
    try {
        const post = await new Post(req.body);
        post.save();

        res.status(200).json("Blog save successfully");
    }
    catch (error) {
        res.status(500).json(error);
    }
}

const getAllPosts = async (req, res) => {
    let username = req.query.username;
    let category = req.query.category;
    let posts;

    try {
        if (username)
            posts = await Post.find({ username: username });
        else if (category)
            posts = await Post.find({ category: category });
        else
            posts = await Post.find({});

        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

const updatePost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, { $set: req.body });

        res.status(200).json("Blog updated successfully");
    }
    catch (error) {
        res.status(500).json(error);
    }
}

const deletePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        await post.delete();

        res.status(200).json("Blog deleted successfully");
    }
    catch (error) {
        res.status(500).json(error);
    }
}


module.exports.createpost = createpost;
module.exports.getAllPosts = getAllPosts;
module.exports.getPost = getPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;