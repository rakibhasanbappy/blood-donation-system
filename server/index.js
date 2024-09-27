// external dependencies
const express = require("express");
const cookieParser = require('cookie-parser');
require("dotenv").config();

// internal dependencies
const usersRouter = require("./routes/users");
const requestsRouter = require("./routes/requests");

// initialize express app
const app = express();

// This middleware parses JSON bodies of incoming requests
app.use(express.json());

// Use cookie-parser with the signing secret
app.use(cookieParser(process.env.COOKIE_SECRET));


// routes
app.use("/users", usersRouter);
app.use("/requests", requestsRouter);


// default route
app.get("/", (req, res) => {
    res.send("Welcome to the server");
});

// start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});