import React from 'react';

import PageTemplate from '../../../components/PageTemplate';
import { IframePager } from '../../../components';

const Page: React.FC = React.memo(() => {
    return (
        <PageTemplate faviconPath={'//avdeevdenis.github.io/web-wiki-parser/favicon.ico'}>
            <IframePager src={'//avdeevdenis.github.io/web-wiki-parser/'} />
        </PageTemplate>
    );
});

export default Page;
