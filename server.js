const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const app = express();
const db = new sqlite3.Database('mydb.sqlite3');

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Content-type', 'application/json');
    next();
});


app.post('/register', function (req, res) {
    const {username, fullname, password, email} = req.body;
    new Promise((resolve, reject) => {
        db.serialize(() => {
            const query = `SELECT * FROM tblUsers WHERE username="${username}" OR email="${email}"`;
            db.get(query, (err, row) => {
                err && reject(err);
                if (row)
                    resolve({
                        code: 400,
                        message: row.username === username ? 'Tài khoản đã tồn tại' : "Email đã tồn tại"
                    });
                else
                    db.prepare(`INSERT INTO tblUsers(username, password, fullname, email) VALUES ('${username}', '${password}', '${fullname}', '${email}')`)
                        .run((err, row) => !err && resolve({
                            code: 200,
                            message: "Đăng ký thành công"
                        }));
            });
        });
    })
        .then(data => res.send(JSON.stringify(data)))
        .catch((err) => {
            res.status(400);
            res.send('');
        })
});

app.post('/login', function (req, res) {
    const {username, password, remember} = req.body;
    new Promise((resolve, reject) => {
        db.serialize(() => {
            const query = `SELECT * FROM tblUsers WHERE username="${username}"`;
            db.get(query, (err, row) => {
                err && reject(err);
                if (!row) resolve({
                    code: 403,
                    message: 'Tài khoản không tồn tại'
                });
                else if (row.password === password) {
                    delete row.id;
                    delete row.password;
                    row['token'] = md5(new Date());
                    resolve(row);
                } else resolve({
                    code: 403,
                    message: 'Mật khẩu không đúng'
                });
            });
        });
    })
        .then(data => res.send(JSON.stringify(data)))
        .catch((err) => {
            res.status(400);
            res.send('');
        })
});

app.listen(3000, () => {
    console.log('Server listen http://localhost:3000');
    db.serialize(() => db.run('CREATE TABLE IF NOT EXISTS "tblUsers" (' +
        '"id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        '"username" TEXT NOT NULL UNIQUE, ' +
        '"fullname" TEXT NOT NULL, ' +
        '"email" TEXT NOT NULL UNIQUE, ' +
        '"password" INTEGER NOT NULL)'));
});
