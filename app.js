const express = require("express");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const mongoConnect = require('./utils/database').mongoConnect;

const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const pageNotFound = require("./controllers/404");

app.use(bodyParser.urlencoded({extended: false}));

// enable files to be read from template head element
app.use(express.static('public'));

// configure template engine
app.engine('hbs', expressHandlebars({defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'hbs');

// routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(pageNotFound);

const port = 5000;

mongoConnect(() => {
    app.listen(port, () => {
        console.log(`Server started listening on port: ${port}`);
    });
})
