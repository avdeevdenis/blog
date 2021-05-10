import { useCallback, useEffect } from 'react';

import isMobile from '../helpers/is_mobile';

export const withCalculateScreenSize = (Component: React.FC) => (props: object) => {
    const setCorrectVh = (wasOrientationChanged: boolean = false) => {
        /**
         * В зависимости от ориентации экрана нужно брать высоту/ширину
         */
        const correctScreenSize = wasOrientationChanged ? window.innerWidth :  window.innerHeight;

        /**
         * Сначала получаем высоту окна просмотра
         * и умножаем ее на 1%
         */
        const vh = correctScreenSize * 0.01 + 'px';

        /**
         * Затем устанавливаем значение свойства --vh
         * для корневого элемента
         */
        document.documentElement.style.setProperty('--vh', vh);
    };

    const onOrientationChange = useCallback(() => {
        const wasOrientationChanged = true;

        setCorrectVh(wasOrientationChanged);
    }, []);

    const onResize = useCallback(() => {
        setCorrectVh();
    }, []);

    useEffect(() => {
        setCorrectVh();

        !isMobile && window.addEventListener('resize', onResize);
        isMobile && window.addEventListener('orientationchange', onOrientationChange);

        return () => {
            !isMobile && window.removeEventListener('resize', onResize);
            isMobile && window.removeEventListener('orientationchange', onOrientationChange);
        };
    }, []);

    return <Component {...props} />
};
