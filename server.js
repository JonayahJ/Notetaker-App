// Dependencies
// =============================================================
const express = require("express");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// finding the specific, unchanging file path
app.use(express.static("./public"));

// require route files
// ============================================================
require("./routes/apiroutes.js")(app);
require("./routes/htmlroutes.js")(app);


// Listener
// ============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
