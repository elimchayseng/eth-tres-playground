const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const activityRouter = require("./routes/activity");
const methodOverride = require("method-override");
// const dotenv = require("dotenv");
const app = express();
// dotenv.config(); //loads .env to environment variables //taken care of by heroku

const mongoConnectionString = process.env.MONGODB_URI;
// MONGODB_URI -- .env correct variable

try {
  mongoose.connect('mongodb://localhost:27017/?readPreference=primary&ssl=false', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (e) {
  console.error(e);
}

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
app.use("/activity", activityRouter);



app.listen(process.env.PORT || 8000);
