const express = require('express');
const app = express();
const cors = require('cors');
const middleware = require('./middleware/index');
const routes = require('./Routes/index');
app.use(cors());
app.use(express.json());
middleware();

app.use('/title', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is Up And Running.....")
})