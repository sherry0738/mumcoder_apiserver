
let app = express();
let cors = require('cors');
const PORT = process.env.PORT || 3000;
let express = require('express');

app.use(cors());



app.get('/details', (req, res) => {
    res.json({info: 'message from express!'});
});

app.listen(PORT, () => console.log('server started on port: ${PORT}'));