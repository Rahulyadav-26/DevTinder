const express = require("express");

const app = express();

app.use((req , res) => {
    res.send("Hello from server again with nodemon");
})

app.listen(3000);