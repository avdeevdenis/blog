import Head from 'next/head';
import React, { useEffect } from 'react';

import {
    cnApp,
    cnAppPage,
} from './classes';

import {
    IPageTemplateProps,
} from './typings';

import { Header } from '..';

import './index.scss'

const FAVICON_DEFAULT = './favicon.ico';

const PageTemplate: React.FC<IPageTemplateProps> = React.memo(props => {
    const { faviconPath } = props;
    const favicon = faviconPath || FAVICON_DEFAULT;

    useEffect(() => {
        // Сначала получаем высоту окна просмотра 
        // и умножаем ее на 1%
        let vh = window.innerHeight * 0.01;

        // Затем устанавливаем значение свойства --vh
        // для корневого элемента
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);

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

export default PageTemplate;
