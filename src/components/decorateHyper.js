// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';

import IpDropdown from './IpDropdown';

export default (Hyper: ComponentType<*>) =>
    class DecorateHyper extends Component<*> {
        render() {
            return (
                <Hyper
                    {...this.props}
                    customChildren={<IpDropdown {...this.props} />}
                />
            );
        }
    };
