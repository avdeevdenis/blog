import Head from 'next/head';
import React, { useEffect } from 'react';

import {
    IPageTemplateProps,
} from './typings';

import { Header } from '..';

import styles from './index.module.scss';
import { withCalculateScreenSize } from '../../hooks/with-calculate-screen-size';
import { YandexMetrikaScript } from '../../helpers/ya_metrika';
import isMobile from '../../helpers/is_mobile';

const FAVICON_DEFAULT = './favicon_y_cyka.png';

const PageTemplateBase: React.FC<IPageTemplateProps> = React.memo(props => {
    const { faviconPath, title } = props;
    const favicon = faviconPath || FAVICON_DEFAULT;

    const titleText = title || 'Home ✪ Avdeev Denis';

    useEffect(() => {
        const platform = isMobile ? 'ua-mobile' : 'ua-desktop';

        document.documentElement.dataset.platform = platform;
    }, []);

    return (
        <div className={styles.App}>
            <Head>
                <title>{titleText}</title>
                <link rel='shortcut icon' href={favicon} type='image/png'/>
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                {YandexMetrikaScript()}
            </Head>

            <Header />

            <div className={styles['App-Page']}>
                {props.children}
            </div>

            {/* <Footer /> */}
        </div>
    )
});

const PageTemplate: React.FC<IPageTemplateProps> = withCalculateScreenSize(PageTemplateBase);

export default PageTemplate;
