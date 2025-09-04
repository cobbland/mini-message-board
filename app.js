const express = require("express");
const path = require("node:path");

const routesPath = path.join(__dirname, "routes");
const indexRouter = require(path.join(routesPath, "indexRouter.js"));
const newRouter = require(path.join(routesPath, "newRouter.js"));

const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/new", newRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board running at http://localhost:${PORT}.`)
});