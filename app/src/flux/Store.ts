import ActionTypes from "./ActionTypes";

class Store{
    constructor() {
    }

    private static storage(key: string, value?: string): string | null {
        if (!value)
            return localStorage.getItem(key);

        localStorage.setItem(key, value);
        return value;
    }

    reduce(action: any, value?: string): string | null {
        switch (action.type) {
            case ActionTypes.CHANGE_VALUE:
                const key = action.type + action.id;
                return Store.storage(key, value);
            default:
                return null;
        }
    }
}

export default new Store();