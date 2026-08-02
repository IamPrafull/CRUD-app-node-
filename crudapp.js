const express = require("express");
const userModel = require("./models/user.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/card", async (req, res) => {
    let allUsers = await userModel.find();
    res.render("card", { users: allUsers });
});

app.post("/create", async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect("/card");  
});

app.get("/edit/:id", async (req, res) => {
    let user = await userModel.findById(req.params.id);
    res.render("edit", { user });
});

app.post("/update/:id", async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.findByIdAndUpdate(req.params.id, { name, email, image });
    res.redirect("/card");
});

app.post("/delete/:id", async (req, res) => {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/card");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});