
let app = express();
let cors = require('cors');
const PORT = process.env.PORT || 3000;
let express = require('express');
let bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());


app.get('/details', (req, res) => {
    res.json({info: 'message from express!'});
});

app.post('/details', (req, res) => {
    console.log(res.body.info)
})
app.listen(PORT, () => console.log('server started on port: ${PORT}'));