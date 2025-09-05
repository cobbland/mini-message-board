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

module.exports = newDate;