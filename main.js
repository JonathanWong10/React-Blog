const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { Blog } = require('./models/blog');

app.use(cors());
app.use(express.json());

const blog_routes = require('./routes/blog');
const authentication_routes = require('./routes/authentication');

app.use('/', blog_routes);
app.use('/authentication', authentication_routes);

mongoose.connect(process.env.DB_URI);

const port = 3000;
app.listen(port, function(req, res) {
    console.log('Server is listening');
});