import React from 'react';

import PageTemplate from '../../../components/PageTemplate';
import { IframePager } from '../../../components';

const Page: React.FC = React.memo(() => {
    return (
        <PageTemplate faviconPath={'//avdeevdenis.github.io/lego-blocks/favicon.ico'}>
            <IframePager src={'//avdeevdenis.github.io/lego-blocks/'} />
        </PageTemplate>
    );
});

export default Page;
