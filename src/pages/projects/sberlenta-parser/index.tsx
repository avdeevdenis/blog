import React from 'react';

import PageTemplate from '../../../components/PageTemplate';
import { IframePager } from '../../../components';

const Page: React.FC = React.memo(() => {
    return (
        <PageTemplate faviconPath={'//avdeevdenis.github.io/tools-parser-api/favicon.ico'}>
            <IframePager src={'//avdeevdenis.github.io/tools-parser-api/'} />
        </PageTemplate>
    );
});

export default Page;
