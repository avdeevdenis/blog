import React, { useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './index.module.scss';
import { getClassName } from '../../helpers/get-classname';

export interface IIframeProps {
    src: string;
}

// Задержанная загрузка, чтобы создать эмуляцию загрузки показом loader'а
const DELAYED_LOAD = 300;

// Если iframe не загрузился через ERROR_TIMEOUT - показываем ошибку
const ERROR_TIMEOUT = 10000;

let errorTimer: NodeJS.Timer | null = null;

const IframePager: React.FC<IIframeProps> = React.memo(({ src }) => {
    const [loaded, setLoaded] = React.useState(false);
    const [iframeSrc, setIframeSrc] = React.useState(src);

    useEffect(() => {
        errorTimer = setTimeout(() => {
            !loaded && setError();
        }, ERROR_TIMEOUT);

        return () => {
            clearTimeout(errorTimer as NodeJS.Timer);
        };
    });

    const onLoad = () => {
        setTimeout(() => {
            setLoaded(true);

            clearTimeout(errorTimer as NodeJS.Timer);
        }, DELAYED_LOAD);
    }

    const setError = () => setIframeSrc('/error');
    const onError = () => setError();

    const className = getClassName([
        styles.IframePager,
        !loaded && styles['IframePager_hidden']
    ]);

    return (
        <>
            {!loaded && <CircularProgress className={styles['IframePager-Loader']} size={40} />}
            <iframe
                onLoad={onLoad}
                onError={onError}
                className={className}
                sandbox='allow-scripts allow-same-origin allow-popups'
                src={iframeSrc}
                loading='lazy'
            ></iframe>
        </>
    );
});

export default IframePager;
