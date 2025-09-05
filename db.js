require('dotenv/config');
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function addToDB({ id, text, user, added }) {

    try {
        console.log('Connection established');

        // Insert a message
        await sql`
        INSERT INTO messages (id, userName, messageContent, dateAdded)
        VALUES (${id}, ${user}, ${text}, ${added});
        `;
        console.log('Inserted message.');

    } catch (err) {
        console.error('Connection failed.', err);
    }
}

async function getAllMessages() {
    try {
        console.log('Connection established');
        const messagesData = await sql`
            SELECT * FROM messages
            ORDER BY id DESC;
        `;
        return messagesData.map((message) => ({
            text: message.messagecontent,
            user: message.username,
            added: message.dateadded,
            id: message.id,
        }));
    } catch (err) {
        console.error('Connection failed.', err);
    }
}

async function getNextId() {
    try {
        console.log('Connection established');
        let nextId = await sql`
            SELECT MAX(id) FROM messages;
        `;
        const maxId = nextId[0]?.max || 0;
        return maxId + 1;
    } catch (err) {
        console.error('Connection failed.', err);
    }
}

async function getMessage(id) {
    try {
        console.log('Connection established');
        let result = await sql`
            SELECT * FROM messages
            WHERE id=${id};
        `;
        const message = result[0];
        return {
            text: message.messagecontent,
            user: message.username,
            added: message.dateadded,
            id: message.id,
        };
    } catch (err) {
        console.error('Connection failed.', err);
    }
}

module.exports = { addToDB, getAllMessages, getNextId, getMessage };