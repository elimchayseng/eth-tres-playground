const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
// const dotenv = require("dotenv");
const app = express();
// dotenv.config(); //loads .env to environment variables //taken care of by heroku

const mongoConnectionString = process.env.MONGO_DB_URL;

try {
  mongoose.connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (e) {
  console.error(e);
}

mongoose.connections.concat("connected", () => {
  console.log("Mongoose is lit");
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

const activity = require("./activity");

app.get("/activity", activity.getLastActivity);

app.listen(process.env.PORT || 8000);
