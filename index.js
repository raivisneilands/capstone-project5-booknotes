import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
import axios from "axios";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "booknotes",
    password: "raivisneilands",
    port: 5432
});

db.connect()

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const currentTime = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = currentTime.getDay();
    const month = currentTime.getMonth();
    const date = currentTime.getDate();
    let notes = [];
    const result = await db.query("SELECT * FROM booknotes")
    result.rows.forEach((note) => {
        notes.push(note);
    });
    res.render("index.ejs", {
        currentDay: days[day],
        currentMonth: months[month],
        currentDate: date,
        notes: notes
    });
});

app.post("/add-note", (req, res) => {
    const currentTime = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = currentTime.getDay();
    const month = currentTime.getMonth();
    const date = currentTime.getDate();
    res.render("new-note.ejs", {
        currentDay: days[day],
        currentMonth: months[month],
        currentDate: date
    });
});

app.post("/note-added", async (req, res) => {
    const title = req.body["book-title"];
    const note = req.body["book-note"];
    const date = req.body["date"]
    await db.query("INSERT INTO booknotes (book_name, book_note, date_added) VALUES ($1, $2, $3)", [title, note, date]);
    res.redirect("/");
});

app.post("/delete", async (req, res) => {
    const id = req.body["noteId"];
    await db.query("DELETE FROM booknotes WHERE id = $1", [id]);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});