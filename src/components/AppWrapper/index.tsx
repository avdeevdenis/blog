import React from 'react';
import { getClassName } from '../../helpers/get_classname';
import styles from './index.module.scss';

export interface IAppWrapperProps {
    fullSize?: boolean;
}

const AppWrapper: React.FC<IAppWrapperProps> = props => {
    const className = getClassName([
        styles['App-Wrapper'],
        props.fullSize && styles['App-Wrapper_fullSize']
    ]);

    return (
        <div className={className}>
            {props.children}
        </div>
    )
};

export default AppWrapper;
