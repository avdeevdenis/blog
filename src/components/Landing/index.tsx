import React, { useCallback, useEffect } from 'react';
import { cn } from '@bem-react/classname';

import './index.scss';
import { withParallaxBgImages } from '../../hooks/with-parallax-bg-images';

export const cnLanding = cn('Landing');
export const cnLandingScoll = cnLanding('Scroll');

interface ILandingProps {
    background?: string;
}

const LandingBase: React.FC<ILandingProps> = React.memo(({ background }) => {
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
        <div className={cnLanding({ background })}>
            <div onClick={scrollToArticles} className={cnLandingScoll}>Scroll</div>
        </div >
    );
});

const Landing = withParallaxBgImages(LandingBase);

export default Landing;
