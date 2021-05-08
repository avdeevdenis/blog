import React from 'react';
import { cn } from '@bem-react/classname';

import styles from './index.module.scss';
import { withParallaxBgImages } from '../../hooks/with-parallax-bg-images';
import { getClassName } from '../../helpers/get-classname';

export const cnLanding = cn('Landing');

interface ILandingProps {
    background?: string;
}

const LandingBase: React.FC<ILandingProps> = React.memo(({ background }) => {
    const className = getClassName([
        styles.Landing,
        background ? styles['Landing_background_' + background] : null
    ]);

    return (
        <div className={className} />
    );
});

const Landing = withParallaxBgImages(LandingBase);

export default Landing;
