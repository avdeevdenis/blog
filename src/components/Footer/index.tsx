import React, { useCallback, useState } from 'react';
import { AppWrapper } from '..';
import { getClassName } from '../../helpers/get-classname';

import styles from './index.module.scss';

let timeout: NodeJS.Timeout | null = null;

const Footer = React.memo(() => {
    const [animated, switchAnimated] = useState(false);
    const onFooterCopyClick = useCallback(() => {
        timeout && clearTimeout(timeout);
        switchAnimated(true);

        timeout = setTimeout(() => {
            switchAnimated(false);
        }, 1000);
    }, [animated]);

    const className = getClassName([
        styles['Footer-Copy'],
        animated && styles['Footer-Copy_animated']
    ]);

    return (
        <div className={styles['Footer-Wrapper']}>
            <AppWrapper>
                <div className={styles.Footer}>
                    <div className={className} onClick={onFooterCopyClick}>Avdeev Denis 2020 &copy;</div>
                </div>
            </AppWrapper>
        </div >
    );
});

export default Footer;
