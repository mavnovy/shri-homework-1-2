import * as express from 'express';
import * as events from '../events.json';
import {Utils} from './utils';

const app = express();
const port = 8000;

let dateStart: number;

app.get('/status', (req, res) => {
    res.send(Utils.formatDate(dateStart));
});

app.get('/api/events', (req, res) => {
    let type: string = req.query.type;
    const result = Utils.getEvents(type, events);

    res.status(result.status).send(result.send);
});

app.use(function(req, res) {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(port, (err: Error) => {
    if (err) {
        return console.error(err);
    }
    dateStart = Date.now();
    console.log(`server is listening on ${port} in ${new Date()}`);
});