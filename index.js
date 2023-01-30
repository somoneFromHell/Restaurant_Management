require('./db/connect')
const express = require('express');
const config = require('config')
const AppError = require('./utility/appError')
const globalErrorHandler = require('./controllers/errorController')
const food = require('./routes/Food');
const invoice = require('./routes/invoice');
const menu = require('./routes/menu');
const order = require('./routes/order');
const orderItem = require('./routes/orderItems');
const table = require('./routes/table');
const user = require('./routes/user');
const { required } = require('joi');


const app = express();

// if (!config.get('jwtPrivateKey')) {
//     console.error('Error:jwtprivate1key is not defined')
//     process.exit(0);
// }

app.use(express.json())


app.use('/api/food', food);
app.use('/api/invoice', invoice);
app.use('/api/menu', menu);
app.use('/api/order', order);
app.use('/api/orderitem', orderItem);
app.use('/api/table', table);
app.use('/api/user', user);


app.all('*',(req,res,next)=>{
    next(new AppError(`cant find on ${req.originalUrl} on this server`,400))
});

app.use(globalErrorHandler)

// continue from herer  https://www.youtube.com/watch?v=wGplIsZm95Q&list=PLx6gGOAOEqGHqDaIjFhwnojD4Lhf4kU_N&index=111


const port = process.env.port || 3200;

app.listen(port, () => console.log(`listning on ${port}...`));