import React from 'react';
import { getClassName } from '../../helpers/get_classname';

import styles from './index.module.scss';

export interface IBurgerIconProps {
    white?: boolean;
}

const BurgerIcon: React.FC<IBurgerIconProps> = React.memo(props => {
    const { white } = props;

    const [isActive, toggle] = React.useState(false);
    const toggleCallback = React.useCallback(() => {
        toggle(!isActive);
    }, [isActive]);

    const className = getClassName([
        styles.BurgerIcon,
        isActive && styles.BurgerIcon_active,
    ]);

    if (white) {
        return (
            <svg className={className} onClick={toggleCallback} fill='#fff' height='28' viewBox='0 0 28 28' width='28' xmlns='http://www.w3.org/2000/svg'>
                <path className={styles['BurgerIcon-Top']} d='M4 7C4 6.44771 4.44772 6 5 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H5C4.44772 8 4 7.55229 4 7Z' fill='#fff' />
                <path className={styles['BurgerIcon-Middle']} d='M4 13.9998C4 13.4475 4.44772 12.9997 5 12.9997L16 13C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15L5 14.9998C4.44772 14.9998 4 14.552 4 13.9998Z' fill='#fff' />
                <path className={styles['BurgerIcon-Bottom']} d='m4 21.000792c0 -0.55229 0.44772 -1 1 -1l19 0c0.5523 0 1 0.44771 1 1c0 0.55229 -0.4477 1 -1 1l-19 0c-0.55228 0 -1 -0.44771 -1,-1z' fill='#fff'/>
            </svg>
        );
    }

    return null;
});

export default BurgerIcon;
