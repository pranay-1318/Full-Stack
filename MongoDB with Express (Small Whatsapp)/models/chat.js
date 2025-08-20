const mongoose = require("mongoose");

// main() // for mongoDB connection   // There is no need of this because it is used in index.js
//     .then(() => {
//         console.log("Connection Successful")
//     })
//     .catch((err) => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); // here test is the database
// }

const chatSchema = new mongoose.Schema({
    from:{
        type: String,
        required : true,
    },
    to: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        maxLength: 50,
    },
    created_at: {
        type: Date,
        required: true,
    },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat // exports use for Chat use in another file