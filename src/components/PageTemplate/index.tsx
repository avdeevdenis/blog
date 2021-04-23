import Head from 'next/head';
import React from 'react';

import {
    IPageTemplateProps,
} from './typings';

import { Header } from '..';

import styles from './index.module.scss'
import { withCalculateScreenSize } from '../../hooks/with-calculate-screen-size';
import { withSmoothScroll } from '../../hooks/with-smooth-scroll';
import { YandexMetrikaScript } from '../../helpers/yandex-metrika';

const FAVICON_DEFAULT = './favicon.ico';

const PageTemplateBase: React.FC<IPageTemplateProps> = React.memo(props => {
    const { faviconPath } = props;
    const favicon = faviconPath || FAVICON_DEFAULT;

    return (
        <div className={styles.App}>
            <Head>
                <title>Home &#10026; Avdeev Denis</title>
                <link rel='shortcut icon' href={favicon} />
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
