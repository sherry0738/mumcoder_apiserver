let express = require('express');
let app = express();
let cors = require('cors');
const PORT = process.env.PORT || 3000;

//copied from https://github.com/vitaly-t/pg-promise/blob/master/examples/query.js
const promise = require('bluebird');

const initOptions = {
    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);


const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'mumcoder',
    user: 'blablahbla',
    password: 'blahblah'
};

const db = pgp(cn); // database instance;



let bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());


app.get('/details', (req, res) => {
    // TODO: Convert to proper json format later
    // const users = 
    // db.any('SELECT q.id,q.title,q.description,a.content, u.user_name FROM QUESTIONS Q LEFT JOIN ANSWERS A on Q.id = A.question_id LEFT JOIN USERS U on U.id = A.created_by')
    // .then(result => {
    //     res.send(result);
    // })
    // .finally(db.$pool.end);

/* ----raw json
[{"id":1,"title":"test","description":"testtesttest","content":"answer","user_name":"b1"},{"id":2,"title":"test2","description":"ssssss","content":null,"user_name":null}]
*/
    res.json = users;
    res.json(
        {
            "questions": [
                {
                    "id": 1,
                    "title": "what is this?",
                    "description": "abc",
                    "answers": [
                        { "usera": "apple" },
                        { "userb": "banana" },
                        { "userc": "pear" }
                    ]
                },
                {
                    "id": 2,
                    "title": "what's your name?",
                    "description": "efg",
                    "answers": [
                        { "usera": "ben" },
                        { "userb": "lucy" },
                        { "userc": "mia" },
                        { "userd": "jess" }
                    ]
                }
            ]
        }
    );
});

app.post('/details', (req, res) => {
    console.log(res.body.info)
})
app.listen(PORT, () => console.log(`server started on port: ${PORT}`));