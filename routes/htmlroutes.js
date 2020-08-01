// Dependencies
// =============================================================
const fs = require("fs");
const path = require("path");

// GET API
// ===========================================================
// GET /notes - Should return the notes.html file.
module.exports = function (app) {
    app.get("/notes", function(req, res) {
        // locating the file in the static public folder
        res.sendFile(path.join(__dirname, "public", "notes.html"));
    });

    // GET * - Should return the index.html file
    app.get("/*", function(req, res) {
        // locating the file in the static public folder
        res.sendFile(path.join(__dirname, "public", "index.html"));
    });
};