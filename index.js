require('./db/connect')
const express = require('express');
const cors = require('cors')
const AppError = require('./utility/appError')
const globalErrorHandler = require('./controllers/errorController')
const food = require('./routes/Food');
const invoice = require('./routes/invoice');
const menu = require('./routes/menu');
const order = require('./routes/order');
const orderItem = require('./routes/orderItems');
const table = require('./routes/table');
const user = require('./routes/user');
const roles = require('./routes/roles')
const authorize = require('./utility/authorization')


const app = express();

const swaggerJSDoc =  require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const option = {

    definition:{
        openapi:'3.0.0',
        info:{
            title:'restorent management',
            version:'1.0.0'
        },
        servers:[
            {
                url:"http://localhost:3200/"
            }
        ]
    },
    apis:['./index.js']
}

const swaggerSpec = swaggerJSDoc(option)
app.use(cors({origin:'*'}))
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

// if (!config.get('jwtPrivateKey')) {
//     console.error('Error:jwtprivate1key is not defined')
//     process.exit(0);
// }

app.use(express.json())


// app.use(authorize)
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

// continue from herer  https://www.youtube.com/watch?v=wGplIsZm95Q&list=PLx6gGOAOEqGHqDaIjFhwnojD4Lhf4kU_N&index=111


const port = process.env.port || 3200;

app.listen(port, () => console.log(`listning on ${port}...`));