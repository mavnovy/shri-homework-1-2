const express = require('express');
const events = require('./events.json');
const app = express();
const port = 8000;
let dateStart;

app.get('/status', (req,res) => {
    res.send(formatDate());
});

app.get('/api/events', (req,res) => {
    let type = req.query.type;
    const result = getEvents(type);
    res.status(result.status).send(result.send);
});

app.use(function(req, res, next) {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    dateStart = Date.now();
    console.log(`server is listening on ${port} in ${new Date()}`);
});

const formatDate = () => {
    const msecSec = 1000;
    const msecMin = 60 * msecSec;
    const msecHour = 24 * msecMin * msecSec;
    let hh = 0,
        mm = 0,
        ss = 0;
    let diff = Date.now() - dateStart;

    hh = Math.floor(diff / msecHour); // часы
    diff = diff - hh*msecHour;

    if(diff > 0) {
        mm = Math.floor(diff / msecMin); // минуты
        diff = diff - mm*msecMin;

        if(diff > 0) {
            ss = Math.floor(diff / msecSec); // секунды
        }
    }

    return `${hh}:${mm}:${ss}`;
};

const getEvents = (type) => {
    if(!type)
        return {status: 200, send: events};

    const types = type.split(':');
    const isFindTypes = [];
    const file = events.events.filter((card) => {// фильтрую events по типам
        if (types.indexOf(card.type) > -1){
            if (isFindTypes.indexOf(card.type) === -1)// для проверки все ли типы использованны
                isFindTypes.push(card.type);
            return true;
        }
        return false;
    });

    if(types.length > isFindTypes.length)
        return {status: 400, send: 'incorrect type'};

    return {status: 200, send: file};

};