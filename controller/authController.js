const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const body = req.body;

  if (!["1", "2"].includes(body.userType)) {
    throw new AppError("Invalid user type", 400);
  }

  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  if (!newUser) {
    throw new AppError("Failed to create the user", 400);
  }

  const result = newUser.toJSON();

  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  return res.status(201).json({
    status: 201,
    message: "User created successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  let result = await user.findOne({
    attributes:{
      exclude:['deletedAt', 'createdAt', 'updatedAt', 'id']
    },
    where: {
      email,
    },
  });

  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Invalid credentials", 401));
  }
  result = result.toJSON();
  delete result.password;
  
  result.token = generateToken({
    id: result.id,
  });

  return res.status(200).json({
    status: 200,
    message: "user signed in successfully",
    data: result,
  });
});

const authenticate = catchAsync(async (req, res, next)=>{
    // 1. get the token from headers
    let idToken = '';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        idToken = req.headers.authorization.split(" ")[1];
    }
    if(!idToken){
        return next(new AppError('Unauthorized', 401))
    }

    // 2. token verification 
    const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);


    // 3. get the user details from db and add to the req object
    const freshUser = await user.findByPk(tokenDetail.id);
    if(!freshUser){
        return next(new AppError('user no longer exists', 400))   
    }

    req.user = freshUser;
    return next();

})

const authorize = (...userType) =>{
    const checkPermission = (req, res, next)=>{
        if(!userType.includes(req.user.userType)){
            return next(new AppError("You don't have permission to perform this action", 403))
        }
        return next();
    }
    return checkPermission;
}

module.exports = { signup, login, authenticate, authorize };
