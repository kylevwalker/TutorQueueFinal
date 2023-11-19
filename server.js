const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public_html"));

let ip = "127.0.0.1";
let port = "80";

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

var Student = mongoose.model("Student", studentSchema);
var Tutor = mongoose.model("Tutor", tutorSchema);
var Queue = mongoose.model("Queue", queueSchema);

const cookieParser = require("cookie-parser");
app.use(cookieParser());
let sessions = {};

// TODO: Check if user is student or tutor to determine which pages are visible
function authenticate(res, res, next) {
    let c = req.cookies;
    console.log(c);
    if (c.login != undefined) {
        if (sessions[c.login.username] != undefined &&
            sessions[c.login.username].id == c.login.sessionID) {
            
            console.log(c);
            next();
        } else {
            console.log("failed auth because user is invalid");
            res.redirect("/login/login.html");
        }
    } else {
        console.log("failed auth because cookue is wack man");
        res.redirect("/login/login.html");
    }
}

/**
 * @param username name of the user who you are making the session for 
 * adds a session
 */
function addSession(username) {
    let sid = Math.floor(Math.random() * 100000000000);
    let now = Date.now()
    sessions[username] = {id: sid, time: now};
    return sid;
}
/**
 * remove sessions that have expired
 */
function removeSessions() {
    let now = Date.now;
    let usernames = Object.keys(sessions);
    for (let i = 0; i < usernames.length; i++) {
        let last = sessions[username[i]].time;
        if (last + 20000000 < now) {
            delete sessions[username[i]];
        }
    }
}

app.use("/tutor/", authenticate);
setInterval(removeSessions, 2000);

/**Login as a Tutor or Student. If a tutor, send to tutor home page. If Student, send to student home. */
app.post("/login", (req, res) => {
    let user = req.body.user;
    // search database for username password combo put promise in p
    let p = 0

    p.then((results) => {
        if (results.lenght == 0) {
            res.end("could not find account");
        } else {
            console.log("Accound found: creating cookie");
            let sid = addSession(user.usernname);
            res.cookie(
                "login",
                {username: user.username, sessionID: sid},
                {maxAge: 600000 * 3600}
            );
            res.end("SUCCESS");
        }
    });
});

app.get("")

app.listen(port, () => {
    console.log(`server running on http://${ip}:${port}`);
});