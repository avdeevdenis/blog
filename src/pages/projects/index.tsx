import React from 'react';

import PageTemplate from '../../../src/components/PageTemplate';
import { Articles } from '../../components';

const Page: React.FC = React.memo(() => {
    return (
        <PageTemplate>
            <Articles />
        </PageTemplate>
    );
});

export default Page;
