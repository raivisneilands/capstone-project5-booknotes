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
    let notes = [];
    const result = await db.query("SELECT * FROM booknotes")
    result.rows.forEach(async (note) => {
        notes.push(note);
    });
    res.render("index.ejs", {
        date: getTodaysDate(),
        notes: notes
    });
});

function getTodaysDate(){
    const currentTime = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = currentTime.getDay();
    const month = currentTime.getMonth();
    const date = currentTime.getDate();
    return `${days[day]}, ${months[month]} ${date}`;
}

app.post("/add-note", (req, res) => {
    res.render("new-note.ejs", {
        date: getTodaysDate()
    });
});

app.post("/note-added", async (req, res) => {
    const title = req.body["book-title"];
    const note = req.body["book-note"];
    const date = req.body["date"]
    const result = await axios.get(`https://openlibrary.org/search.json?title=${title}`)
    const olid = result.data.docs[0].cover_edition_key;
    const author = result.data.docs[0].author_name[0];
    await db.query("INSERT INTO booknotes (book_name, book_note, date_added, olid, author) VALUES ($1, $2, $3, $4, $5)", [title, note, date, olid, author]);
    res.redirect("/");
});

app.post("/delete", async (req, res) => {
    const id = req.body["noteId"];
    await db.query("DELETE FROM booknotes WHERE id = $1", [id]);
    res.redirect("/");
});

app.post("/edit", async (req, res) => {
    const id = req.body["noteId"];
    const note = await db.query("SELECT * FROM booknotes WHERE id = ($1)", [id]);
    res.render("edit-note.ejs", {
        note: note.rows[0],
        date: getTodaysDate(),
        id: id
    })
});

app.post("/note-edited", async (req, res) => {
    const newTitle = req.body["new-book-title"];
    const newNote = req.body["new-book-note"];
    const newDate = req.body["new-date"];
    const id = req.body["noteId"]
    await db.query("UPDATE booknotes SET book_name = $1, book_note = $2, date_added = $3 WHERE id = $4", [newTitle, newNote, newDate, id]);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});