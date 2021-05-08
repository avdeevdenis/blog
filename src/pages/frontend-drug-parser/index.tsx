import React from 'react';

import PageTemplate from '../../../src/components/PageTemplate';
import { IframePager } from '../../components';

const Page: React.FC = React.memo(() => {
    return (
        <PageTemplate title={'Frontend Drug Parser'} faviconPath={'//avdeevdenis.github.io/frontend-drug-parser/favicon.ico'}>
            <IframePager src={'//avdeevdenis.github.io/frontend-drug-parser/'} />
        </PageTemplate>
    );
});

export default Page;
