const express = require("express");
const router = express.Router();

const path = require("node:path");
const newDate = require("../newDate.js");
const { addToDB, getAllMessages, getNextId, getMessage } = require('../db.js');

router.get("/", async (req, res) => {
    try {
        const messages = await getAllMessages();
        res.render("index", { title: "Mini Message Board", messages: messages });
    } catch (err) {
        console.error(err);
        res.render("index", { title: "Mini Message Board", messages: [] });
    };
    
});

router.get("/new", async (req, res) => {
    try {
        const nextId = await getNextId();
        res.render("form", { title: "New Message", nextId: nextId });
    } catch (err) {
        console.error(err);
        res.render("form", { title: "New Message", nextId: Math.random() * (10000 - 100) + 100 });
    };
});
router.post("/new", (req, res) => {
    const messageData = { 
        text: req.body.message,
        user: req.body.name,
        added: newDate(),
        id: req.body.id,
    };
    addToDB(messageData);
    setTimeout(() => {
        res.redirect("/");
    }, 200);
});

router.get("/message", async (req, res) => {
    try {
        const message = await getMessage(req.query.id);
        console.log(message);
        res.render("message", { title: "Message", message: message });
    } catch(err) {
        console.error(err);
        res.render("message", { title: "Message", message: {} });
    };
    
});

module.exports = router;