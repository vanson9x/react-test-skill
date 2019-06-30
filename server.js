const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('mydb.sqlite3');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Content-type', 'application/json');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/logout', function (req, res) {
    res.send('hello world')
});

app.post('/register', function (req, res) {
    res.send(JSON.stringify({"token": {"value": "adfafasdfa", "expire": 0}}))
});

app.post('/login', function (req, res) {
    const {username, password, remember} = req.body;
    new Promise((resolve, reject) => {
        db.serialize(() => {
            const query = `SELECT * FROM tblUsers WHERE username="${username}"`;
            db.each(query, (err, row) => {
                err && reject(err);
                if (row && row.password === password) {
                    delete row.id;
                    delete row.password;
                    resolve(row);
                }
            })
        });
    })
        .then(data => res.send(JSON.stringify(data)))
        .catch((err) => {
            res.status(400);
            res.send('');
        })
});

app.listen(3000, () => {
    db.serialize(() => db.run('CREATE TABLE IF NOT EXISTS "tblUsers" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "username" TEXT NOT NULL UNIQUE, "fullname" TEXT NOT NULL, "email" TEXT NOT NULL UNIQUE, "password" INTEGER NOT NULL)'));
});