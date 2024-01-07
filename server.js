const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Anatoliy:fXRpjk4h1FLWPYxs@cluster0.ar0lvfe.mongodb.net/my-contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
