const express = require("express");
const app = express();
const cors = require("cors");

require("./MongoDatabase");
app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/indexroutes1"));
app.listen(4000);
console.log("Server running on port ", 4000);
