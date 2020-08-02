// Dependencies
const fs = require("fs");
const { v4: uuid } = require('uuid')
const path = require("path");
const db = require("../db/db.json");

// GET API
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

    // POST API
     // send new note
    app.post("/api/notes", (req, res) => { 
        // create a new note
        let newNote =
            {
                title: req.body.title,
                text: req.body.text,
            };

        // setting a unique id
        newNote.id = uuid();
        //db is type array
        db.push(newNote);
        // console.log(db);

        fs.writeFile("../db/db.json", JSON.stringify(db), function(err) {
            console.log("done")
            res.json(db);
        });
    
    });

    // DELETE API
    // delete note
    app.delete("/api/notes/:id", (req, res) => {
        //1. look for req.params.id () use a forloop based on length of an array (db)
        for (let i = 0; i < db.length; i++) 
        {
            if(req.params.id === db[i].id)
            {
                // console.log(i); 
                // 2. cut out the index
                db.splice(i, 1); 
                //console.log(db)

                //do a .then fs writefile (bc it's not showing up on the page)
                fs.writeFile("../db/db.json", JSON.stringify(db), function(err) 
                {
                    console.log("done")
                    // returns noteList file, can see in POSTman
                });
            }   
        }
    });
};