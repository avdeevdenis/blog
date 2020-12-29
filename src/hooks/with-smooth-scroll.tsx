import { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

export const withSmoothScroll = (Component: React.FC) => (props: any) => {
    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    return <Component {...props} />
}
