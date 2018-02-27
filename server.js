let express = require('express');
let app = express();
let cors = require('cors');
const PORT = process.env.PORT || 3000;

let bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());


app.get('/details', (req, res) => {
    res.json(
        {
            "questions": [
                {
                    "title": "abc",
                    "description": "abc",
                    "answers": [
                        { "usera": "a1" },
                        { "userb": "a2" },
                        { "userc": "a3" }
                    ]
                },
                {
                    "title": "efg",
                    "description": "abc",
                    "answers": [
                        { "user1": "b1" },
                        { "user2": "b2" },
                        { "user3": "b2" }
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