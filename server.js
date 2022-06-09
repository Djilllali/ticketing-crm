const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

//mongodb connection setup
const mongoose = require("mongoose");
const mDb = mongoose.connection;

mongoose.connect(process.env.MONGO_URL);

mDb.on("open", () => {
  console.log("mongodb is connected");
});
mDb.on("error", (error) => {
  console.log("error while conneting");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on the port ${port}...`);
});
