import Store from "./Store";

class Dispatcher {
    constructor(){
    }

    dispatch(id: string, type: string, value?: string): string | null {
        return Store.reduce({type: type, id: id}, value);
    }
}

export default new Dispatcher();