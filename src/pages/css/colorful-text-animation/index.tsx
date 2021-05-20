import React from 'react';

import PageTemplate from '../../../../src/components/PageTemplate';
import { IframePager } from '../../../components';

const Page: React.FC = React.memo(() => {
  return (
    <PageTemplate blackBg faviconPath={'//avdeevdenis.github.io//favicon.ico'}>
      <IframePager fixedWidth src={'https://codepen.io/hendrysadrak/embed/VLMOMJ?theme-id=dark&default-tab=result'} />
    </PageTemplate>
  )
});

export default Page;
