// external dependencies
const express = require("express");
require("dotenv").config();

// internal dependencies
const usersRouter = require("./routes/users");
const requestsRouter = require("./routes/requests");

// initialize express app
const app = express();

// This middleware parses JSON bodies of incoming requests
app.use(express.json());


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