export namespace Utils {

    export function formatDate(dateStart: number): string {
        const msecSec = 1000;
        const msecMin = 60 * msecSec;
        const msecHour = 60 * msecMin;
        let hh: number,
            mm = 0,
            ss = 0;
        let diff = Date.now() - dateStart;

        hh = Math.floor(diff / msecHour); // часы
        diff = diff - hh * msecHour;

        if (diff > 0) {
            mm = Math.floor(diff / msecMin); // минуты
            diff = diff - mm * msecMin;

            if (diff > 0) {
                ss = Math.floor(diff / msecSec); // секунды
            }
        }

        return `${hh}:${mm}:${ss}`;
    }

    export function getEvents(type: string, events: any){
        if (!type)
            return {status: 200, send: events};

        const types = type.split(':');
        const isFindTypes: string[] = [];

        const file = events.events.filter((card: any) => {// фильтрую events по типам
            if (types.indexOf(card.type) > -1){
                if (isFindTypes.indexOf(card.type) === -1)// для проверки все ли типы использованны
                    isFindTypes.push(card.type);
                return true;
            }
            return false;
        });

        if (types.length > isFindTypes.length)
            return {status: 400, send: 'incorrect type'};

        return {status: 200, send: file};

    }
}