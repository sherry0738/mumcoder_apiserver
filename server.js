let express = require("express");
let app = express();
let cors = require("cors");
const PORT = process.env.PORT || 3000;

//copied from https://github.com/vitaly-t/pg-promise/blob/master/examples/query.js
const promise = require("bluebird");

const initOptions = {
    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise
};

const pgp = require("pg-promise")(initOptions);

const cn = {
    host: "mumcoder.c8uycasr0kiy.ap-southeast-2.rds.amazonaws.com", // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: "postgres",
    
};

const db = pgp(cn); // database instance;

let bodyParser = require("body-parser");

function mapToResultJson(rawJson) {
    console.log(rawJson);
    questions = [];
    rawJson.forEach(element => {
        if (questions.length == 0) {
            var newQuestion = {
                id: element.id,
                title: element.title,
                description: element.description,
                answers: []
            };
            if (element.user_name && element.content) {
                var answer = {
                    user: element.user_name,
                    answer: element.content
                };
                newQuestion.answers.push(answer);
            }
            questions.push(newQuestion);
        } else {
            var foundQuestion = false;

            for (var i = 0; i < questions.length; i++) {
                if (questions[i].id === element.id) {
                    foundQuestion=true;
                    //if qustion already added to questions list
                    if (element.user_name && element.content) {
                        var answer = {
                            user: element.user_name,
                            answer: element.content
                        };
                        questions[i].answers.push(answer);
                    }
                } 
            }
            
            if(!foundQuestion){
                var newQuestion = {
                    id: element.id,
                    title: element.title,
                    description: element.description,
                    answers: []
                };
                if (element.user_name && element.content) {
                    var answer = {
                        user: element.user_name,
                        answer: element.content
                    };
                    newQuestion.answers.push(answer);
                }
                questions.push(newQuestion);
            }


        }
    });
    console.log(JSON.stringify(questions));
    return questions;
}
app.use(cors());
app.use(bodyParser.json());

app.get("/details", (req, res) => {
    db
        .task(t => {
            return t.any(
                "SELECT q.id,q.title,q.description,a.content, u.user_name FROM QUESTIONS Q LEFT JOIN ANSWERS A on Q.id = A.question_id LEFT JOIN USERS U on U.id = A.created_by order by q.created_at desc"
            );
        })
        .then(result => {
            var questions = mapToResultJson(result);
            res.send({ "questions": questions });
        });
});

app.post("/question", (req, res) => {
    db
        .task(t => {
            return t
                .oneOrNone("SELECT id FROM USERS where email = ${email}", {
                    email: req.body.email
                })
                .then(user => {
                    if (user) {
                        //if user exists
                        return user;
                    } else {
                        return t.oneOrNone(
                            "INSERT INTO users (user_name,email,password_digest,image_url) VALUES (${username}, ${email},12345,'http://mumcoder.s3-website-ap-southeast-2.amazonaws.com/img/girl.jpg') RETURNING id;",
                            {
                                username: req.body.username,
                                email: req.body.email
                            }
                        );
                    }
                })
                .then(user => {
                    //create answer to a question
                    if (user) {
                        return t.oneOrNone(
                            "INSERT INTO questions(title,description,created_by) values ( ${title},${description},${createdBy}) RETURNING id;",
                            {
                                title: req.body.title,
                                description: req.body.description,
                                createdBy: user.id
                            }
                        );
                    }
                    return [];
                });
        })
        .then(events => {
            console.log(events);
        })
        .catch(error => {
            //res.error(error);
            console.log(error);
        })
        .finally(res.sendStatus(200));
});

app.post("/details", (req, res) => {
    db
        .task(t => {
            return t
                .oneOrNone("SELECT id FROM USERS where email = ${email}", {
                    email: req.body.email
                })
                .then(user => {
                    if (user) {
                        //if user exists
                        return user;
                    } else {
                        return t.oneOrNone(
                            "INSERT INTO users (user_name,email,password_digest,image_url) VALUES (${username}, ${email},12345,'http://mumcoder.s3-website-ap-southeast-2.amazonaws.com/img/girl.jpg') RETURNING id;",
                            {
                                username: req.body.username,
                                email: req.body.email
                            }
                        );
                    }
                })
                .then(user => {
                    //create answer to a question
                    if (user) {
                        return t.oneOrNone(
                            'INSERT INTO answers(content,question_id,"like",dislike,created_by) values ( ${content},${questionId},0,0,${createdBy}) RETURNING id;',
                            {
                                content: req.body.answer,
                                questionId: req.body.id,
                                createdBy: user.id
                            }
                        );
                    }
                    return [];
                });
        })
        .then(events => {
            console.log(events);
        })
        .catch(error => {
            
            console.log(error);
        })
        .finally(res.sendStatus(200));
});



app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
