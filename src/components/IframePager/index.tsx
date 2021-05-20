import React, { useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './index.module.scss';
import { getClassName } from '../../helpers/get_classname';

export interface IIframeProps {
    src: string;
    fixedWidth?: boolean;
}

// Задержанная загрузка, чтобы создать эмуляцию загрузки показом loader'а
const DELAYED_LOAD = 150;

// Если iframe не загрузился через ERROR_TIMEOUT - показываем ошибку
const ERROR_TIMEOUT = 10000;

let errorTimer: NodeJS.Timer | null = null;

const IframePager: React.FC<IIframeProps> = React.memo(({ src, fixedWidth }) => {
    const [loaded, setLoaded] = React.useState(false);
    const [isError, setError] = React.useState(false);

    useEffect(() => {
        errorTimer = setTimeout(() => {
            !loaded && setError(true);
        }, ERROR_TIMEOUT);

        return () => {
            clearTimeout(errorTimer as NodeJS.Timer);
        };
    }, []);

    const onLoad = () => {
        setTimeout(() => {
            setLoaded(true);

            clearTimeout(errorTimer as NodeJS.Timer);
        }, DELAYED_LOAD);
    }

    const onError = () => {
        setError(true);
    };

    const className = getClassName([
        styles.IframePager,
        !loaded && styles['IframePager_hidden'],
        fixedWidth && styles['IframePager_fixedWidth']
    ]);

    if (isError) {
        return (
            <div className={styles.IframePager__error}>Произошла ошибка, попробуйте еще раз.</div>
        );
    }

    return (
        <>
            {!loaded && <CircularProgress className={styles['IframePager-Loader']} size={40} />}
            <iframe
                onLoad={onLoad}
                onError={onError}
                frameBorder="no"
                allowFullScreen={true}
                className={className}
                sandbox='allow-scripts allow-same-origin allow-popups'
                src={src}
                loading='lazy'
            ></iframe>
        </>
    );
});

export default IframePager;
