require('dotenv').config({path: `${process.cwd()}/.env`});
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRouter = require('./route/authRoute');
const proejctRouter = require('./route/projectRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const app = express();
app.use(express.json());
const PORT = process.env.APP_PORT || 4000;

// Swagger setup
const swaggerOptions = {
    // swaggerDefinition: {
    //   myapi: '3.0.0',
    //   info: {
    //     title: 'Marcos APIS',
    //     version: '1.0.0',
    //     description: 'API documentation',
    //   },
    //   servers: [
    //     {
    //       url: 'http://localhost:4040',
    //     },
    //   ],
    // },
    definition: {
        openapi: "3.1.0",
        info: {
          title: "Marcos APIS",
          version: "0.1.0",
          description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
          {
            url: "http://localhost:4040",
          },
        ],
      },
    apis: ['./route/*.js'], // files containing annotations as above
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// all routes will be here
// app.use('/',(req, res)=>{
//     res.status(200).json({
//         status:200,
//         message:'Server is up and running'
//     })
//     console.log('Hello World!')
// })
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', proejctRouter);
/// this is for any invalid route which is not defined
app.use("*", catchAsync (async (req, res, next)=>{
    // this works when this callback is not async (but using the catchAsync we can make it work)
    throw new AppError(`Cannot find ${req.originalUrl} on this server`, 404)  

    // if we call the next() without any arguments it will call the next middleware
    // if we call the next() with argument (which is an error object) it will call the global error handler

    //this works when this callback is async
    // return next(new Error('This is error'))

    // res.status(404).json({
    //     status: '404',
    //     message: 'Route not found',
    // })
}));

app.use(globalErrorHandler)

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
})