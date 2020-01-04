const express = require("express");
const app = express(); //SSH test
const path = require("path");
const db = require("./db/");
const bodyParser = require("body-parser");
const { addNote, getNote, editNote, deleteNote } = require("./db/index");
const { addList, getList, editList, deleteList } = require("./db/index");
db.testConnection();
// connect to static files in public folder
app.use("/", express.static("public"));
app.use("/note", express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set the view engine to ejs
app.set("view engine", "ejs");

// index page
app.get("/", async function (req, res) {
  const notes = await db.getNotes();
  const lists = await db.getLists();
  res.render('pages/index', {
    notes, // get all notes on a main page
    lists  // get all lists on a main page
  });
});

// index note (card)
app.get("/notes", function (req, res) {
  res.render("pages/note");
});

// index list
app.get("/lists", function (req, res) {
  res.render("pages/list");
});

// index open note get id
app.get("/note/:id", async function (req, res) {
  try {
    const note = await getNote(req.params.id);
    res.render("pages/opennote", {
      note
    }
    );
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Server Error!")
  }
});

// index open list get id
app.get("/list/:id", async function (req, res) {
  try {
    const list = await getList(req.params.id);
    res.render("pages/openlist", {
      list
    }
    );
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Server Error!")
  }
});

// add note (card)
app.post("/api/note", async function (req, res) {
  try {
    const data = await addNote(req.body);
    res.send("Note added");
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Server Error!")
  }
});

// add list
app.post("/api/list", async function (req, res) {
  try {
    const data = await addList(req.body);
    res.send("List added");
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Server Error!")
  }
});

// edit note (card)  |ROUT
app.put("/api/note/:id", async function (req, res) {
  try {
    const data = await editNote(req.params.id, req.body.themeNote, req.body.textNote);
    res.send("Note edited");
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Server Error!")
  }
});

// edit list
app.put("/api/list/:id", async function (req, res) {
  console.log(req.body);
  console.log(req.params.id);
  console.log(req.body.themeList);

  try {
    const data = await editList(req.params.id, req.body);
    res.send("List edited");
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Server Error!")
  }
});

// delete note (card)
app.delete("/api/note/:id", async function (req, res) {
  try {
    const data = await deleteNote(req.params.id);
    res.send("Note deleted");
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Server Error!")
  }
});

// delete list
app.delete("/api/list/:id", async function (req, res) {
  try {
    const data = await deleteList(req.params.id);
    res.send("List deleted");
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Server Error!")
  }
});

// delete lists in db
app.delete('/api/lists/:id', function (req, res) {
  db.delList(req.params.id)
    .then(() => {
      res.send('Success')
    })
    .catch(err => {
      res.status.json({ err: err });
    });
});


// app.listen(3000);
// console.log("3000 is the magic port");

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
  console.log('EVERYTHING IS OK PORT IS' + app.get('port'));

});

