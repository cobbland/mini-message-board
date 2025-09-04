const express = require("express");

const app = express();

app.get ("/", (req, res) => {
    res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board running! Go to http://localhost:${PORT}.`)
});