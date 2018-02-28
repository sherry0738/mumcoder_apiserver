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
  host: "localhost", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "mumcoder",
};

const db = pgp(cn); // database instance;

let bodyParser = require("body-parser");
//===================================
function mapToResultJson(rawJson) {
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
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].id === element.id) {
          //if qustion already added to questions list
          if (element.user_name && element.content) {
            var answer = {
              user: element.user_name,
              answer: element.content
            };
            questions[i].answers.push(answer);
          }
        } else {
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
    }
  });
  return {'questions':questions};
}
app.use(cors());
app.use(bodyParser.json());

app.get("/details", (req, res) => {
  // TODO: Convert to proper json format later
  // const users =
  db.any('SELECT q.id,q.title,q.description,a.content, u.user_name FROM QUESTIONS Q LEFT JOIN ANSWERS A on Q.id = A.question_id LEFT JOIN USERS U on U.id = A.created_by')
  .then(result => {
      var questions = mapToResultJson(result);
      res.send(questions);
  })
//   .finally(db.$pool.end);
});

app.post("/details", (req, res) => {
  console.log(res.body.info);
});
app.listen(PORT, () => console.log(`server started on port: ${PORT}`));