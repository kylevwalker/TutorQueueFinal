const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public_html"));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/TutorQueue");
mongoose.connection.on("error", () => {
    console.log("ERROR CONNECTING TO MONGODB");
});

let Schema = mongoose.Schema;
const studentSchema = new Schema({
    name: String,
    password: String,
    isTutor: Boolean,
});

const tutorSchema = new Schema({
    name: String,
    password: String,
    tutorCoordinationRank: Number,
    studentsHelped: Number,
});

const queueSchema = new Schema({
    time: Number,
    student: String,
    tutor: String,
    course: String,
    desctiprion: String,
    status: String,
});

let ip = "127.0.0.1";
let port = "80";


app.listen(port, () => {
    console.log(`server running on http://${ip}:${port}`);
});