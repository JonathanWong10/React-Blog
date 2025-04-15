const mongoose = require ('mongoose');
const DB_URI = 'mongodb+srv://jonathanwfc:j59208948@blog.97g2xgr.mongodb.net/blogs?retryWrites=true&w=majority&appName=Blog'

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
    
module.exports = mongoose