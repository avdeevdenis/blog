// import React, { useCallback } from 'react';
import React from 'react';

import PageTemplate from '../../../src/components/PageTemplate';
import { moduleLoader } from '../../../src/utils/module-loader';

import './assets/index.scss';

import Blue1 from './assets/images/blue1.svg';
import Blue2 from './assets/images/blue2.svg';
import Blue3 from './assets/images/blue3.svg';

import White1 from './assets/images/white1.svg';
import White2 from './assets/images/white2.svg';
import White3 from './assets/images/white3.svg';

import Green1 from './assets/images/green1.svg';
import Green2 from './assets/images/green2.svg';
import Green3 from './assets/images/green3.svg';

import Scroller from './assets/images/scroll.svg';

const Page: React.FC = React.memo(() => {
    moduleLoader(import('./assets/external-script.js'));

    return (
        <PageTemplate faviconPath={'../lego-blocks-favicon.ico'}>
            <div className='lego-blocks'>
                <Scroller className="scroller" />
                <div className="blocks blocks_transition">
                    <Blue1 className='block blue-1' />
                    <Blue2 className='block blue-2 block-center' />
                    <Blue3 className='block blue-3' />

                    <White1 className='block white-1' />
                    <White2 className='block white-2 block-center' />
                    <White3 className='block white-3' />

                    <Green1 className='block green-1' />
                    <Green2 className='block green-2 block-center' />
                    <Green3 className='block green-3' />
                </div>
            </div>
        </PageTemplate>
    );
});

export default Page;
