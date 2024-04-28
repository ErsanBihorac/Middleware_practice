const express = require('express');
const router = express.Router();
const app = express();
const port = 5001;

//Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application level middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date()} --- Request [${req.method}] [${req.url}]`);
    next();
};

app.use(loggerMiddleware);
//Third party middleware
//Router-level middleware
app.use('/api/users', router);

const fakeAuth = (req, res, next) => {
    const authStatus = true;
    if (authStatus) {
        console.log('User authStatus : ', authStatus);
        next();
    } else {
        res.status(401);
        throw new Error('User is not authorized');
    }
}

const getUsers = (req, res) => {
    res.json({ message: "Get all users" });
}

const createUser = (req, res) => {
    console.log('This is the request body received from client : ', req.body);
    res.json({ message: "Create new user" });
}

router.use(fakeAuth);//
router.route('/').get(getUsers).post(createUser);

//Error-Handling middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    switch (statusCode) {
        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message,
            });
            break;
        case 404:
            res.json({
                title: "Not Found",
                message: err.message,
            });
            break;
        case 500:
            res.json({
                title: "Server Error",
                message: err.message,
            });
            break;
        default:
            break;
    }
};

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server started on port ${port}}`);
});