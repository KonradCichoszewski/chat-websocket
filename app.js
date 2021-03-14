const express = require("express");
const app = express();

var bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded());

app.use(require("./routes/index"));
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

app.set('view engine', 'pug');

const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);

if (process.env.ENV === "DEVELOPMENT"){
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors)
}


module.exports = app;