"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var events = require("../events.json");
var utils_1 = require("./utils");
var app = express();
var port = 8000;
var dateStart;
app.get('/status', function (req, res) {
    res.send(utils_1.Utils.formatDate(dateStart));
});
app.get('/api/events', function (req, res) {
    var type = req.query.type;
    var result = utils_1.Utils.getEvents(type, events);
    res.status(result.status).send(result.send);
});
app.use(function (req, res) {
    res.status(404).send('<h1>Page not found</h1>');
});
app.listen(port, function (err) {
    if (err) {
        return console.error(err);
    }
    dateStart = Date.now();
    console.log("server is listening on " + port + " in " + new Date());
});
//# sourceMappingURL=index.js.map