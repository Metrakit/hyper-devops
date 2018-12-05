// @flow
import { WRITE_TO_TERMINAL } from './store/actions';

export default (win: Object) => {
    win.rpc.on(WRITE_TO_TERMINAL, ({ uid, command }) => {
        win.sessions.get(uid).write(command);
    });
};
