import React, { useCallback, useEffect } from 'react';
import { cn } from '@bem-react/classname';

import './index.scss';

export const cnLanding = cn('Landing');
export const cnLandingScoll = cnLanding('Scroll');

const Landing: React.FC = React.memo(() => {
    const scrollToArticles = useCallback(() => {
        const articlelist = document.querySelector('.AricleList');

        articlelist?.scrollIntoView({
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        if (!window) return;

        const searchParams = new URL(window.location.href).searchParams;

        const needScroll = searchParams && searchParams.get('autoscroll') !== null;

        if (needScroll) {
            requestAnimationFrame(() => scrollToArticles());
        }
    }, []);

    return (
        <div className={cnLanding()}>
            <div onClick={scrollToArticles} className={cnLandingScoll}>Scroll</div>
        </div >
    );
});

export default Landing;
