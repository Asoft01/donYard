const express = require('express');
const path = require('path');

const app = express();


// Serve only the static files from the dist directory
app.use(express.static('./dist/donyard'));
    app.get('/*', function(req, res) {
        res.sendFile('index.html', {root: 'dist/donyard/'}
    );
});

// Starting the app by listening on the default port
app.listen(process.env.PORT || 8080);





/////////////// Second Method /////////////////


// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     next();
// }
// const express = require('express');
// const app = express();
// // app.use(requireHTTPS);

// app.use(express.static('./dist/donyard-app'));
// app.get('/*', function(req, res) {
//   res.sendFile('index.html', {root: 'dist/donyard-app/'}
// );
// });

// app.listen(process.env.PORT || 8080);

