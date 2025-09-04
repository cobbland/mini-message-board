const express = require("express");
const router = express.Router();

const path = require("node:path");
const messages = require("../db.js");

router.get("/", (req, res) => {
    res.render("index", { title: "Mini Message Board", messages: messages });
});

router.get("/new", (req, res) => {
    res.render("form", { title: "New Message", nextId: messages.length });
});
router.post("/new", (req, res) => {
    messages.push({ 
        text: req.body.message,
        user: req.body.name,
        added: new Date(),
        id: req.body.id,
    });
    res.redirect("/");
});

router.get("/message", (req, res) => {
    res.render("message", { title: "Message", message: messages[req.query.id] });
});

module.exports = router;