// Dependencies
// =============================================================
const fs = require("fs");
const { v4: uuid } = require('uuid')
const path = require("path");

// GET API
// =============================================================
    // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
module.exports =  app => {
    // read file
    app.get("/api/notes", (req, res) => 
        fs.readFile("db/db.json", function read(err, data) {
            // error statements
            if (err) {
                console.log("You messed up... again");
                throw err;
            }
            
            // JSON parse to make it readable
                // if successful, read data
            note = JSON.parse(data);
            
            // response is in JSON format
            console.log("You managed to get some data...")
            res.json(note);  

        })
    );
};

// POST API
// =============================================================
    // POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

module.exports =  app => {
    // send new note
    app.post("/api/notes", (req, res) => { 
        // create a new note
        let newNote = {
            title: req.body.title,
            text: req.body.text,
        };

        // setting a unique id
        newNote.id = uuid();

        console.log("Your note = ", newNote);
        
        // sets db file to savedNotes
        let savedNotes = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8");
        
        // pushes the newNote into the savedNotes in db
        // savedNotes.push(newNote)  // why doesn't .push() work here???
        
        // strigifies and writes the newNote into the savedNotes
        fs.writeFileSync("db/db.json", JSON.stringify(newNote));
        
        // returns savedNotes file, can see in POSTman
        res.json(savedNotes);
    })

    
  
};


    



// DELETE API
// =============================================================
    // DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.