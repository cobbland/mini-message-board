const express = require("express");
const path = require("node:path");

const routesPath = path.join(__dirname, "routes");
const indexRouter = require(path.join(routesPath, "indexRouter.js"));

const app = express();

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board running at http://localhost:${PORT}.`)
});