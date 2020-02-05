const express = require('express');
const mongoose = require('mongoose');

const router = require('./routers/router');
const app = express();
const path = require('path');

mongoose.connect(
    'mongodb://admin:admin2020@ds135061.mlab.com:35061/news',
    { useNewUrlParser: true, useFindAndModify: false},
);

app.set('port', (process.env.PORT || 5500));
app.use(express.static('../dist/ang-front-camp'));
// app.use(express.static(path.join(__dirname + '/dist/ang-front-camp')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname,'/dist/ang-front-camp/index.html'));
});
// app.use('/', router);

// app.use((err, req, res, next) => {
//     res.status(500).render('error', {contentError: `Error: ${err.message}`})
// });

app.listen(app.get('port'), () => {
    console.log('Node app is running at localhost:' + app.get('port'));
});
