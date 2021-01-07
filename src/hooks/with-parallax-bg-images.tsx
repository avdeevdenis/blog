import { useEffect, useState } from "react";

const backgroundItemsCount = 3;
const BG_TOGGLE_TIMEOUT = 5000;

let timer: NodeJS.Timer | null = null;

export const withParallaxBgImages = (Component: React.FC) => (props: any) => {
    const [backgroundValue, setBackground] = useState(1);

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
