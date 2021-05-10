import React from 'react';

import { AppWrapper, Code } from '../../../components';

import PageTemplate from '../../../components/PageTemplate';
import { withHightlightCode } from '../../../hooks/with-highlight-code';

const code1 =
    `[...document.getElementsByTagName('*')].forEach(elem => {
    elem.style.outline='1px solid #'+(~~(Math.random()*(1<<24))).toString(16)
})`;

const code2 = `'#'+((1<<24)*Math.random()|0).toString(16)`;
const code3 = `Math.random().toString(16).substr(-6)`;

const PageBase: React.FC = React.memo(() => {
    return (
        <PageTemplate>
            <AppWrapper>
                <br />
                JS Helpers
                <ul>
                    <li>
                        <p>Выделить визуально все элементы на странице.</p>
                        <Code code={code1} />
                    </li>
                    <li>
                        <p>Генератор #HEX цветов.</p>
                        <Code code={code2} />
                        <Code code={code3} />
                    </li>
                </ul>
            </AppWrapper>
        </PageTemplate>
    );
});

const Page = withHightlightCode(PageBase);

export default Page;
