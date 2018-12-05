// @flow
import {
    INPUT_STORAGE_PATH,
    SESSION_ADD,
    PLUGIN,
    CONFIG_LOAD,
} from './actions';

export function reduceSessions(state: Object, action: Object) {
    switch (action.type) {
        case SESSION_ADD:
            if (state[INPUT_STORAGE_PATH]) {
                return state.setIn([INPUT_STORAGE_PATH, action.uid], '');
            }
            return state.set(INPUT_STORAGE_PATH, { [action.uid]: '' });
        default:
            return state;
    }
}

const pluginUIInitialState = {
    config: { servers: [], masterServer: null, masterUser: null },
};
export function reduceUI(state: Object, action: Object) {
    switch (action.type) {
        case '@@INIT':
        case '@@redux/INIT':
            return state.set(PLUGIN, pluginUIInitialState);
        case CONFIG_LOAD: {
            const config = action.config?.[PLUGIN] || {};
            const mergedUIState = state[PLUGIN].config.merge(config);
            return state.setIn([PLUGIN, 'config'], mergedUIState);
        }
        default:
            return state;
    }
}
