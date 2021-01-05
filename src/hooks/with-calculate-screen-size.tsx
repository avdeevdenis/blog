import { useCallback, useEffect } from 'react';

import isMobile from '../helpers/is-mobile';

export const withCalculateScreenSize = (Component: React.FC) => (props: any) => {
    const setCorrectVh = useCallback(() => {
        // Сначала получаем высоту окна просмотра
        // и умножаем ее на 1%
        const vh = window.innerHeight * 0.01;

        // Затем устанавливаем значение свойства --vh
        // для корневого элемента
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);

    useEffect(() => {
        setCorrectVh();

        !isMobile && window.addEventListener('resize', setCorrectVh);
        isMobile && window.addEventListener('orientationchange', setCorrectVh);

        return () => {
            !isMobile && window.removeEventListener('resize', setCorrectVh);
            isMobile && window.removeEventListener('orientationchange', setCorrectVh);
        };
    }, []);

    return <Component {...props} />
};
