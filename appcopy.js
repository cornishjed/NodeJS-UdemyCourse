//express, expHbs, bodyparser

const app = express();

const shopeRoutes = require('./routes/shop');

app.use(express.static('public'));

app.engine('hbs', expressHandlebars({defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'hbs');

app.use(shopRoutes);

app.listen(5000);