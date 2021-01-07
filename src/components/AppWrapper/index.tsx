import React from 'react';
import './index.scss';

const AppWrapper: React.FC = props => {
    return (
        <div className='App-Wrapper'>
            {props.children}
        </div>
    )
};

export default AppWrapper;
