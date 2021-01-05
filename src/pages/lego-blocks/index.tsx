import React from 'react';

import PageTemplate from '../../../src/components/PageTemplate';
import { IframePager } from '../../components';

import './assets/index.scss';

const Page: React.FC = React.memo(() => {
    return (
        <PageTemplate faviconPath={'../lego-blocks-favicon.ico'}>
            <IframePager src={'https://avdeevdenis.github.io/lego-blocks/'} />
        </PageTemplate>
    );
});

export default Page;
