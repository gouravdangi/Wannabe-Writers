const blog = require('../models/blog')
const cnt = require('./blog')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Blog time")
    })
    .catch(err => {
        console.log("oh no!! sed")
    })


const seedDB = async () => {
    await blog.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const blg = new blog({
            title: `${cnt[i].title}`,
            body: `${cnt[i].body}`,
            author: `${cnt[i].author}`,
            date: `${cnt[i].date}`
        })
        await blg.save();
        console.log(blg);
    }
}

seedDB();