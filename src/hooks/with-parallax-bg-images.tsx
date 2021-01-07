import { useEffect, useState } from "react";

const backgroundItemsCount = 3;
const BG_TOGGLE_TIMEOUT = 5000;

let timer: NodeJS.Timer | null = null;

export const withParallaxBgImages = (Component: React.FC) => (props: any) => {
    const [backgroundValue, setBackground] = useState(1);

    // Preload background images
    useEffect(() => {
        const images = [
            require('../assets/images/castle-bg-2.jpg'),
            require('../assets/images/castle-bg-3.jpg'),
        ];

        images.forEach(src => {
            const image = new Image();
            image.src = src;
        })
    }, []);

    // Timeouted changing background images
    useEffect(() => {
        timer = setInterval(() => {
            const nextBackgroundValue = backgroundValue < backgroundItemsCount ? 
                backgroundValue + 1 : 1;

            setBackground(nextBackgroundValue);
        }, BG_TOGGLE_TIMEOUT);

        return () => {
            clearInterval(timer as NodeJS.Timer);
        };
    }, [backgroundValue]);

    return <Component {...props} background={backgroundValue} />
};
