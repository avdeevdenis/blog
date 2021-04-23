import React, { useState } from 'react';

import PageTemplate from '../../components/PageTemplate';

import styles from './index.module.scss';

const cls = (className: string) => '.' + className;

const Page: React.FC = React.memo(() => {
    const [hidden, setHidden] = useState(false);

    if (typeof (window) !== 'undefined') {
        import('./eye-script.js' as string).then(result => {
            const initialize = result && result.default;

            if (initialize) {
                initialize({
                    containerClass: cls(styles.Eye),
                    canvasClass: cls(styles['Eye-Canvas'])
                });
            }

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
        <PageTemplate>
            <div className={styles.Eye}>
                <canvas className={styles['Eye-Canvas']} hidden={hidden}></canvas>
            </div>
        </PageTemplate>
    );
});

export default Page;
