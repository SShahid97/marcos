const AppError = require("../utils/appError");

const sendErrorDev= (error, res)=>{
    const statusCode = error.statusCode || 500;
    const status = error.statusCode || 500;
    const message = error.message || 'Something went wrong';
    const stack = error.stack;

    console.log(error.name, error.message, stack)
    return res.status(statusCode).json({
        status,
        message,
        stack
    })
}

const sendErrorProd= (error, res)=>{
    const statusCode = error.statusCode || 500;
    const status = error.statusCode || 500;
    const message = error.message || 'Something went wrong';
    const stack = error.stack;

    if(error.isOperational){
        return res.status(statusCode).json({
            status,
            message,
        })
    }

    console.log(error.name, error.message, stack)
    return res.status(500).json({
        status: 500,
        message: 'Something went wrong',
    })
}

const globalErrorHandler = (err, req, res, next) => {
    if(err.name === 'JsonWebTokenError'){
        err = new AppError('invalid token', 401);
    }
    if(err.name === 'SequelizeValidationError'){
        err = new AppError(err.errors[0].message, 400);
    }
    if(err.name === 'SequelizeUniqueConstraintError'){
        err = new AppError(err.errors[0].message, 400);
    }
    if(process.env.NODE_ENV == 'development'){
        sendErrorDev(err, res);
    }

    sendErrorProd(err, res);
}

module.exports = globalErrorHandler;