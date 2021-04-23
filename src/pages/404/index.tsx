import React from 'react';

import PageTemplate from '../../components/PageTemplate';

import styles from './index.module.scss';

const cls = (className: string) => '.' + className;

const Page: React.FC = React.memo(() => {
    if (typeof (window) !== 'undefined') {
        import('./eye-script.js' as string).then(result => {
            const initialize = result && result.default;

            if (initialize) {
                initialize({
                    containerClass: cls(styles.Eye),
                    emptyClass: cls(styles['Eye-Empty']),
                    canvasClass: cls(styles['Eye-Canvas'])
                });
            }
        });
    }

    return (
        <PageTemplate>
            <div className={styles.Eye}>
                <div className={styles['Eye-Empty']} />
                <canvas className={styles['Eye-Canvas']}></canvas>
            </div>
        </PageTemplate>
    );
});

export default Page;
