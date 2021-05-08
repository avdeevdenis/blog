import React, { useState } from 'react';

import PageTemplate from '../../components/PageTemplate';
import { getClassName } from '../../helpers/get-classname';

import styles from './index.module.scss';

const cls = (className: string) => '.' + className;

const NotFoundText: React.FC<{ isVisible404Text: boolean }> = React.memo(({ isVisible404Text }) => {
    const className = getClassName([
        styles['Eye-Text'],
        isVisible404Text && styles['Eye-Text_visible']
    ]);

    return (
        <div className={className}>404 - Not Found</div>
    );
});

const Canvas404: React.FC<{ hidden: boolean }> = React.memo(({ hidden }) => {
    return (
        <canvas className={styles['Eye-Canvas']} hidden={hidden}></canvas>
    );
})

const Page: React.FC = React.memo(() => {
    const [hidden, setHidden] = useState(false);
    const [isVisible404Text, setVisible404Text] = useState(false);
    const [inited, setInited] = useState(false);

    if (typeof (window) !== 'undefined' && !inited) {
        import('./eye-script.js' as string).then(result => {
            const initialize = result && result.default;

            if (initialize) {
                initialize({
                    containerClass: cls(styles.Eye),
                    canvasClass: cls(styles['Eye-Canvas'])
                });

                setInited(true);
            }

            setTimeout(() => {
                setVisible404Text(true);
            }, 3000);

            window.addEventListener('orientationchange', () => {
                setHidden(true);

                /**
                 * Костыль, чтобы не перерисовывать canvas - обновляем страницу
                 */
                setTimeout(() => {
                    location.reload();
                });
            });
        });
    }

    return (
        <PageTemplate title='404 - Not Found'>
            <div className={styles.Eye}>
                <Canvas404 hidden={hidden}/>
                <NotFoundText isVisible404Text={isVisible404Text} />
            </div>
        </PageTemplate>
    );
});

export default Page;
