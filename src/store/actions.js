// @flow
export const PLUGIN = 'devops';
export const INPUT_STORAGE_PATH = `${PLUGIN}/userInputs`;
export const SESSION_ADD = 'SESSION_ADD';
export const CONFIG_LOAD = 'CONFIG_LOAD';

export const WRITE_TO_TERMINAL = `${PLUGIN}/write to terminal`;
export const EXECUTE_COMMAND = `${PLUGIN}/execute command`;
export const writeToTerminal = (command: string, uid: string) =>
    window.rpc.emit(WRITE_TO_TERMINAL, { command, uid });

function getCurrentInputAndUidPid(store) {
    const { activeUid, sessions } = store.sessions;
    const currentInput = store.sessions[INPUT_STORAGE_PATH][activeUid];
    const activePid = sessions[activeUid].pid;
    return { currentInput, activeUid, activePid };
}

export function executeCommand(command: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch({
            type: EXECUTE_COMMAND,
            effect() {
                const state = getState();
                const { currentInput, activeUid } = getCurrentInputAndUidPid(
                    state
                );
                console.log(currentInput, activeUid);
                writeToTerminal(
                    `${'\b'.repeat(currentInput.length)}${command}\r`,
                    activeUid
                );
            },
        });
    };
}
