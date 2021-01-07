import React, { useCallback, useState } from 'react';
import { AppWrapper } from '..';

import './index.scss';

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

    return (
        <div className='Footer-Wrapper'>
            <AppWrapper>
                <div className='Footer'>
                    <div className={'Footer-Copy' + (animated ? ' Footer-Copy_animated' : '')} onClick={onFooterCopyClick}>Avdeev Denis 2020 &copy;</div>
                </div>
            </AppWrapper>
        </div >
    );
});

export default Footer;
