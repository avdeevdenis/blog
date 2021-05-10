import React from 'react';

import PageTemplate from '../../../components/PageTemplate';
import { IframePager } from '../../../components';

const Page: React.FC = React.memo(() => {
    return (
        <PageTemplate>
            <IframePager src={'//avdeevdenis.github.io/waxon/'} />
        </PageTemplate>
    );
});

export default Page;
