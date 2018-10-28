"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils;
(function (Utils) {
    function formatDate(dateStart) {
        var msecSec = 1000;
        var msecMin = 60 * msecSec;
        var msecHour = 60 * msecMin;
        var hh, mm, ss;
        var diff = Date.now() - dateStart;
        hh = Math.floor(diff / msecHour); // часы
        diff = diff - hh * msecHour;
        if (diff > 0) {
            mm = Math.floor(diff / msecMin); // минуты
            diff = diff - mm * msecMin;
            if (diff > 0) {
                ss = Math.floor(diff / msecSec); // секунды
            }
        }
        return hh + ":" + mm + ":" + ss;
    }
    Utils.formatDate = formatDate;
    ;
    function getEvents(type, events) {
        if (!type)
            return { status: 200, send: events };
        var types = type.split(':');
        var isFindTypes = [];
        var file = events.events.filter(function (card) {
            if (types.indexOf(card.type) > -1) {
                if (isFindTypes.indexOf(card.type) === -1) // для проверки все ли типы использованны
                    isFindTypes.push(card.type);
                return true;
            }
            return false;
        });
        if (types.length > isFindTypes.length)
            return { status: 400, send: 'incorrect type' };
        return { status: 200, send: file };
    }
    Utils.getEvents = getEvents;
    ;
})(Utils = exports.Utils || (exports.Utils = {}));
//# sourceMappingURL=utils.js.map