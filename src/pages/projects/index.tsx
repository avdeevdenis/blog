import React from 'react';

import PageTemplate from '../../../src/components/PageTemplate';
import { Articles } from '../../components';
import { PROJECTS_TITLE } from '../../consts/PAGE_TITLES';

const Page: React.FC = React.memo(() => {
    return (
        <PageTemplate title={PROJECTS_TITLE}>
            <Articles />
        </PageTemplate>
    );
});

export default Page;
