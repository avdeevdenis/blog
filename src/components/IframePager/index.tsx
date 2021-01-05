import { cn } from '@bem-react/classname';
import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

export const cnIframePager = cn('IframePager');
export const cnIframePagerLoader = cnIframePager('Loader');

import './index.scss';

export interface IIframeProps {
    src: string;
}

// Задержанная загрузка, чтобы создать эмуляцию загрузки показом loader'а
const DELAYED_LOAD = 300;

// Если iframe не загрузился через ERROR_TIMEOUT - показываем ошибку
const ERROR_TIMEOUT = 20000;

const IframePager: React.FC<IIframeProps> = React.memo(({ src }) => {
    const [loaded, setLoaded] = React.useState(false);
    const [iframeSrc, setIframeSrc] = React.useState(src);

    const onLoad = () => {
        setTimeout(() => {
            setLoaded(true);
        }, DELAYED_LOAD);
    }

    const setError = () => setIframeSrc('/error');

    setTimeout(() => {
        setError();
    }, ERROR_TIMEOUT);

    const onError = () => setError();

    return (
        <>
            {!loaded && <CircularProgress className={cnIframePagerLoader} size={40} />}
            <iframe
                onLoad={onLoad}
                onError={onError}
                className={cnIframePager({ hidden: !loaded })}
                sandbox="allow-scripts"
                src={iframeSrc}
                loading="lazy"
            ></iframe>
        </>
    );
});

export default IframePager;
