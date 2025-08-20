const express = require("express");
const app = express();
const mongoose = require("mongoose");  // for mogoDB connection
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true})); // for parse purpose. e.g :  let {from, to, msg} = req.body;
app.use(methodOverride("_method"));

main() // for mongoDB connection 
    .then(() => {
        console.log("Connection Successful")
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); // here test is the database
}

// let chat1 = new Chat({
//     from: "Mahesh",
//     to: "Chetan",
//     msg: "send me your exam sheets",
//     created_at: new Date(),
// });

// chat1.save().then((res) => {
//     console.log(res);
// });

//Index Route

//New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
})

app.get("/chats", async (req,res) => {
    let chats = await Chat.find();  // extract all data from database
    res.render("index.ejs", {chats});
});

//Insert the data through POST
app.post("/chats", (req, res) => {
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });

    newChat
    .save()
    .then((res) => {  // if .then present then there is no need of await for handing asynchronous action
        console.log("chat was saved")
    })
    .catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");
});

//Edit 
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})

//Update
app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let {msg : newMsg} = req.body;  // we do remane fo understading {msg : newMsg} mgs to newMsg
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true}
    )
    console.log(updatedChat);
    res.redirect("/chats")
});

//Delete 
app.delete("/chats/:id", async(req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/", (req, res) => {
    res.send("root is working");
});

app.listen(8080, () => {   // server setup
    console.log("Server is listening on port 8080");
});           