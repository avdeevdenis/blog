import { useEffect } from 'react';

export const withCalculateScreenSize = (Component: React.FC) => (props: any) => {
    useEffect(() => {
        // Сначала получаем высоту окна просмотра
        // и умножаем ее на 1%
        let vh = window.innerHeight * 0.01;

        // Затем устанавливаем значение свойства --vh
        // для корневого элемента
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);

    return <Component {...props} />
};
