const express = require('express');
const app = express();
const config = require('./config.json');
 
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const router = express.Router()

app.use(bodyParser.json())

app.use(expressValidator())
app.use('/news', router)

require('./models');
var newsCtrl = require('./controller/newsController');
var newsValidator = require('./validator/newsValidator');

app.get("/", (req, resp)=>{
    resp.send("Home Page");
});

// ************ All Routes ****************************************

// to fetch all the news according to the requirement 
router.get(
    '/getAll',
    newsValidator.validate('getAllNews'), 
    newsCtrl.getAllNews,
)

// additional api to fetch the detail of each news article
router.get(
    '/detail', 
    newsValidator.validate('getNewsDetail'), 
    newsCtrl.getNewsById,
)

// to add news article
router.post(
    '/add', 
    newsValidator.validate('addNews'), 
    newsCtrl.addNews,
)

// to update new article specially to update read_status from unread to read
router.put(
    '/update-news', 
    newsValidator.validate('updateNews'), 
    newsCtrl.updateNews,
)

// to delete any article by its id
router.delete(
    '/delete', 
    newsValidator.validate('deleteNews'), 
    newsCtrl.deleteNews,
)

app.listen(config.PORT,()=>{
    console.log(`app is listening at http://localhost:${config.PORT}`);
})