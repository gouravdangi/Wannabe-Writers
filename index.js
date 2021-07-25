const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const path = require('path');
const blog = require('./models/blog')
const ejsMate = require('ejs-mate')
const passport = require('passport');
const localStrategy = require('passport-local')
const user = require('./models/user');
const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate)

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Blog time")
    })
    .catch(err => {
        console.log("Blog time is over")
    })


app.listen(3000, () => {
    console.log('BLOG BLOG BLOG');
})

app.get('/new/user', (req, res) => {
    res.render('login')

})

app.get('/new/blog', (req, res) => {
    res.render('newblog')
})

app.post('/new/blog', (req, res) => {
    res.redirect()
})

app.post('/new/user', async (req, res) => {
    const { email, username, password } = req.body;
    const newuser = new user({ email, username });
    const regusr = await user.register({ newuser, password });
})

app.get('/home', async (req, res) => {
    const blogs = await blog.find({});
    res.render('home', { blogs })
})



app.get('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const blg = await blog.findById(id);
    res.render('expandblog', { blg })
})