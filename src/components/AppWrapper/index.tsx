import React from 'react';
import styles from './index.module.scss';

export interface IAppWrapperProps {
    fullSize?: boolean;
}

const AppWrapper: React.FC<IAppWrapperProps> = props => {
    const className = [
        styles['App-Wrapper'],
        props.fullSize && styles['App-Wrapper_fullSize']
    ].filter(Boolean).join(' ');

    return (
        <div className={className}>
            {props.children}
        </div>
    )
};

export default AppWrapper;
