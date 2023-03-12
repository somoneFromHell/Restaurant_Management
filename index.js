require('./db/connect')
const express = require('express');
const cors = require('cors')
const AppError = require('./utility/appError')
const globalErrorHandler = require('./controllers/errorController')
require('dotenv').config({'path':'config.env'})


const food = require('./routes/Food');
const invoice = require('./routes/invoice');
const menu = require('./routes/menu');
const order = require('./routes/order');
const orderItem = require('./routes/orderItems');
const table = require('./routes/table');
const user = require('./routes/user');
const roles = require('./routes/roles')
var bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(cors({origin:'*'}))

// if (!config.get('jwtPrivateKey')) {
//     console.error('Error:jwtprivate1key is not defined')
//     process.exit(0);
// }

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//defining route for food images
app.use('/foodImages',express.static('public/image/food'))

app.use('/api/food', food);
app.use('/api/invoice', invoice);
app.use('/api/menu', menu);
app.use('/api/order', order);
app.use('/api/orderitem', orderItem);
app.use('/api/table', table);
app.use('/api/user', user);
app.use('/api/roles',roles)

app.all('*',(req,res,next)=>{
    next(new AppError(`cant find on ${req.originalUrl} on this server`,400))
});

app.use(globalErrorHandler)


const port = process.env.PORT || 3200;

app.listen(port, () => console.log(`listening on ${port}...`));