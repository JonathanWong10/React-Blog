const express = require('express');
const router = express.Router();
const { Blog } = require('../models/blog');

router.get('/get-all-blogs', async function(req, res) {
    const blogs = await Blog.find({});
    res.send(blogs);
});

router.get('/blog/:id', async function(req, res) {
    const id = req.params.id;
    const response = await Blog.findById(id);
    res.send(response);
});

router.put('/blog/:id', async function(req, res) {
    const id = req.params.id;
    const data = req.body;
    const response = await Blog.findByIdAndUpdate(id, data);
    res.send(response);
});

router.delete('/blog/:id', async function(req, res) {
    const id = req.params.id;
    const response = await Blog.findByIdAndDelete(id);
    res.send('Success');
});

router.post('create-blog', async function(req, res) {
    try {
        const data = req.body;
        const blog = new Blog(data);
        const response = await blog.save();
        res.send('Success')
    }catch(err){
        res.send(err);
    }
});

module.exports = router;