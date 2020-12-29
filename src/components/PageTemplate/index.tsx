import Head from 'next/head';
import React, { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import {
    cnApp,
    cnAppPage,
} from './classes';

import {
    IPageTemplateProps,
} from './typings';

import { Header } from '..';

import './index.scss'
import { withCalculateScreenSize } from '../hooks/with-calculate-screen-size';

const FAVICON_DEFAULT = './favicon.ico';

const PageTemplateBase: React.FC<IPageTemplateProps> = React.memo(props => {
    const { faviconPath } = props;
    const favicon = faviconPath || FAVICON_DEFAULT;

    return (
        <div className={cnApp()}>
            <Head>
                <title>Homepage | Avdeev Denis</title>
                <link rel="shortcut icon" href={favicon} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>

            <Header />

            <div className={cnAppPage}>
                {props.children}
            </div>
        </div>
    )
});

const withSmoothScroll = (Component: React.FC) => (props: any) => {
    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    return <Component {...props} />
}

const PageTemplate = withSmoothScroll(withCalculateScreenSize(PageTemplateBase));

export default PageTemplate;
