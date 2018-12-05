// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

import { executeCommand, PLUGIN } from '../store/actions';

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const selectStyles = {
    top: '5px',
    right: '5px',
    pointer: 'cursor',
    position: 'absolute',
};

const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

type Props = {
    config: Object,
    executeCommand: string => void,
};
class IpDropdown extends Component<Props> {
    state = {
        selectedIp: null,
    };

    onSelectIp(selectedOption) {
        this.setState({ selectedIp: null });
        const user = selectedOption.user ? selectedOption.user : 'root';
        const command = `ssh ${user}@${selectedOption.value}`;
        this.props.executeCommand(command);
        this.dropdownRef.blur();
    }

    onClickMasterServer(config) {
        const user = config.masterUser ? config.masterUser : 'root';
        const command = `ssh ${user}@${config.masterServer}`;
        this.props.executeCommand(command);
    }

    render() {
        const { config } = this.props;
        return (
            <div style={selectStyles}>
                {config.masterServer ? (
                    <button
                        className="btn-master"
                        onClick={this.onClickMasterServer.bind(this, config)}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faCloud} />
                    </button>
                ) : null}

                <Select
                    ref={ref => {
                        this.dropdownRef = ref;
                    }}
                    placeholder="Servers"
                    classNamePrefix="sip"
                    className="select-ip"
                    value={this.state.selectedIp}
                    options={config.servers}
                    onChange={this.onSelectIp.bind(this)}
                    formatGroupLabel={formatGroupLabel}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const config = state.ui?.[PLUGIN].config;
    return {
        config,
    };
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
    return bindActionCreators({ executeCommand }, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IpDropdown);
