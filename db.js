const newDate = () => {
    const nowDate = new Date();
    let returnDate = '';
    returnDate = 
        returnDate + nowDate.getMonth() +
        '/' + nowDate.getDate() + '/' +
        nowDate.getFullYear() + ' at ' +
        nowDate.getHours() + ':' +
        nowDate.getMinutes()
    return returnDate;
};

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: newDate(),
        id: 0,
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: newDate(),
        id: 1,
    }
];

module.exports = { messages, newDate };