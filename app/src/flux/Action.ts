import ActionTypes from "./ActionTypes";
import Dispatcher from "./Dispatcher";

const Actions = {
    changeValue(id: string, value?: string): string | null {
        return Dispatcher.dispatch(
            id,
            ActionTypes.CHANGE_VALUE,
            value);
    },
};

export default Actions;