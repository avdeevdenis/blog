import Head from 'next/head';
import React, { useEffect } from 'react';

import {
    IPageTemplateProps,
} from './typings';

import { Header } from '..';

import styles from './index.module.scss'
import { withCalculateScreenSize } from '../../hooks/with-calculate-screen-size';
import { withSmoothScroll } from '../../hooks/with-smooth-scroll';
import { YandexMetrikaScript } from '../../helpers/yandex-metrika';
import isMobile from '../../helpers/is-mobile';

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
                <link rel='preconnect' href='https://fonts.gstatic.com' />
                <link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap' rel='stylesheet' />
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

const PageTemplate = withSmoothScroll(withCalculateScreenSize(PageTemplateBase));

export default PageTemplate;
