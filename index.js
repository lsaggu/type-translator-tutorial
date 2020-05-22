//modules
const express = require('express');
const path = require('path');
const serveFavicon = require('serve-favicon');


//router
const routes = require('./routes');

//variables
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//favicon
app.use(serveFavicon(path.join(__dirname, 'public', 'images', 'favicon-32x32.png')));

//routing
app.use('/', routes);

//start app
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
