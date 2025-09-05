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


require("dotenv").config();

const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(version);
};

http.createServer(requestHandler).listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});



app.use("/", indexRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board running at http://localhost:${PORT}.`)
});