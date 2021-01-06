import React from 'react';
import PageTemplate from '../src/components/PageTemplate';

import { Landing, Articles } from '../src/components';

export default function Home() {
  return (
    <PageTemplate>
      <Landing />
      <Articles />
    </PageTemplate>
  )
}
