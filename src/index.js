export { default as decorateHyper } from './components/decorateHyper';
export { reduceSessions, reduceUI } from './store/reducers';
export { default as onWindow } from './onWindow';

export const decorateConfig = config => {
    return {
        ...config,
        css: `
            ${config.termCSS || ''}
            
            .btn-master {
                padding: 3px 5px;
                background: transparent;
                border: 0;
                color: #ffffff;
                padding: 0;
                font-size: 14px;
                outline: none;
            }
            .btn-master:hover {
                cursor: pointer;
                color: rgba(255, 140, 0,1);
            }

            .select-ip {
                width: 160px;
                display: inline-block;
                margin-left: 10px;
                color: #444444;
                font-family: Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace;
                font-size: 12px;
                outline: none;
            }

            .sip__control {
                min-height: 28px;
                border: 0;
                box-shadow: none;
            }

            .sip__control.sip__control--is-focused {
                border: 0;
                box-shadow: none;
            }

            .sip__dropdown-indicator {
                padding: 4px;
            }
                
            .sip__option:hover, .sip__option--is-focused {
                background-color: rgba(255, 140, 0,1);
                    color: #ffffff;
            }
        `,
    };
};
