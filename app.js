const express = require("express")
const app = express()
const port = 3000
const path = require('path')
const mongoose = require("mongoose")
const Blog = require("./model/blog")

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))


//connecting mongoose to mongoBD 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(port))
.catch((err) => console.log(err))


app.get("/", (req, res) => {
    res.redirect("blogs")
})

app.get("/blogs", (req, res) => {
    const blogs = Blog.find().sort({length: -1})
        .then(result => res.render("blogs", { title: "Blog website", blogs:result }))
    .catch(err => console.log(err))
})

app.post("/blogs", (req, res,) => {
    const blogs = new Blog(req.body)
    blogs.save()
        .then(result => res.redirect("blogs"))
    .catch(err => console.log(err))
})

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    const blog = Blog.findById(id)
        .then(result => res.render("details", { title: "Create blog website", blog:result }))
        .catch(err => console.log(err))
})

app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() => res.json({redirect: "/blogs"}))
        .catch(err => console.log(err))
})

app.get("/about", (req, res) => {
    res.render("about", { title: "About blog website"})
})

app.get("/create", (req, res) => {

    res.render("create", { title: "Create blog website"})
})

app.get("/detials", (req, res) => {
    res.redirect("details")
})


app.use((req, res) => {
    res.status(404).render("404", { title: "Page not found"})
})