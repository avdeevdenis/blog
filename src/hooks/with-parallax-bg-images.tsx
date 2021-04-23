import { useEffect, useState } from 'react';

import styles from './with-parallax-bg-images.module.scss';

/**
 * Общее количество изображений, учавствующих в parallax
 */
const ITEMS_COUNT = 3;

/**
 * Время, через которое одна картинка сменяется другой 
 */
const BG_TOGGLE_TIMEOUT = 6000;

/**
 * Изображения, учавствующие в parallax
 */
const ASSET_PATHS = [
    require('../assets/images/castle-bg-2.jpg'),
    require('../assets/images/castle-bg-3.jpg'),
];

let changeTimer: NodeJS.Timer | null = null;

export const withParallaxBgImages = (Component: React.FC) => (props: any) => {
    const [backgroundValue, setBackground] = useState(1);

    /**
     * To make preload images once time per session
     */
    const isAlreadyLoaded = () => {
        const selector = '.' + styles.ImagePreloaderHidden;

        return Boolean(document.querySelectorAll(selector).length);
    }

    /**
     * Preload background images
     */
    useEffect(() => {
        if (isAlreadyLoaded()) return;

        ASSET_PATHS.forEach(src => {
            const imageElement = document.createElement('img');
            imageElement.src = src;
            imageElement.classList.add(styles.ImagePreloaderHidden);

            document.body.append(imageElement);
        });
    }, []);

    /**
     * Timeouted changing background images
     */
    useEffect(() => {
        changeTimer = setInterval(() => {
            const nextBackgroundValue = backgroundValue < ITEMS_COUNT ? 
                backgroundValue + 1 : 1;

            setBackground(nextBackgroundValue);
        }, BG_TOGGLE_TIMEOUT);

        return () => {
            clearInterval(changeTimer as NodeJS.Timer);
        };
    }, [backgroundValue]);

    return <Component {...props} background={backgroundValue} />
};
