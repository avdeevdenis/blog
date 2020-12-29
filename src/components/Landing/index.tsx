import React, { useCallback } from 'react';
import { cn } from '@bem-react/classname';

import './index.scss';

export const cnLanding = cn('Landing');
export const cnLandingScoll = cnLanding('Scroll');

const Landing: React.FC = React.memo(() => {
    const onScrollClick = useCallback(() => {
        const articlelist = document.querySelector('.AricleList');
        
        articlelist?.scrollIntoView({
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className={cnLanding()}>
            <div onClick={onScrollClick} className={cnLandingScoll}>Scroll</div>
        </div >
    );
});

export default Landing;
