const express = require('express');

const app = express();

const port = 5001;

const loggerMiddleware = (req, res, next);

app.listen(port, () => {
    console.log(`Server started on port ${port}}`);
});