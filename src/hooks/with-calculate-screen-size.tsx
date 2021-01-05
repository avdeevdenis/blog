import { useCallback, useEffect } from 'react';

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

        window.addEventListener('resize', setCorrectVh);

        return () => {
            window.removeEventListener('resize', setCorrectVh);
        };
    }, []);

    return <Component {...props} />
};
