const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main() // for mongoDB connection 
    .then(() => {
        console.log("Connection Successful")
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); // here test is the database
}

let allChats = [
    {
        from: "Rohit",
        to: "Sahil",
        msg: "Send me notes for the exam",
        created_at: new Date(),
    },
    {
        from: "Sahil",
        to: "Rohit",
        msg: "Sure, I’ll send them by tonight",
        created_at: new Date(),
    },
    {
        from: "Anita",
        to: "Rohit",
        msg: "Are you ready for the test tomorrow?",
        created_at: new Date(),
    },
    {
        from: "Rohit",
        to: "Anita",
        msg: "Yes, I revised everything today",
        created_at: new Date(),
    },
    {
        from: "Sahil",
        to: "Anita",
        msg: "Can you share the last year’s question paper?",
        created_at: new Date(),
    },
];

Chat.insertMany(allChats);
