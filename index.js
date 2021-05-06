
import bodyParser from 'body-parser'
import express from 'express'
import foetusfoodController from './app/controllers/foetusfood.controller.js'

const app = express();

// var corsOptions = {
//     origin: "http://localhost:4200"
// };
//
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to foetusfood application." });
});

var router = express.Router();
// Create a new Tutorial
router.get("/foetusfood", foetusfoodController.deploy);

app.use('/api/', router);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
