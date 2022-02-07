const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes');


const Article = require("./models/article");
const articleRouter = require("./routes/articles.route");
const activityRouter = require("./routes/activity.route");
const methodOverride = require("method-override");
// const dotenv = require("dotenv");
var app = express();
// dotenv.config(); //loads .env to environment variables //taken care of by heroku

const mongoConnectionString = process.env.MONGODB_URI;
// MONGODB_URI -- .env correct variable

try {
    mongoose.connect(mongoConnectionString, {
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


app.use("/", routes);



app.listen(process.env.PORT || 8000);
