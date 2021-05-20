import React from 'react';
import Link from 'next/link';

import PageTemplate from '../../../src/components/PageTemplate';
import styles from './index.module.scss';
import { CSS_TITLE } from '../../consts/PAGE_TITLES';

export interface CSSArticleItem {
  name: string;
  link: string
}

export const CSSArticles: CSSArticleItem[] = [{
  name: 'Chromatic-triangle',
  link: '/css/chromatic-triangle'
}, {
  name: 'Newton\'s Cradle Loader',
  link: '/css/newtons-cradle-loader'
}, {
  name: 'Image revealing from text on hover',
  link: 'css/image-revealing-from-text-on-hover'
}, {
  name: 'Css perspective text hover',
  link: 'css/css-perspective-text-hover'
}, {
  name: 'Auto generate circular text',
  link: 'css/auto-generate-circular-text'
}, {
  name: 'Colorful text animation',
  link: 'css/colorful-text-animation'
}, {
  name: 'Floating swim text',
  link: 'css/floating-swim-text'
}];

const Page: React.FC = React.memo(() => {
  return (
    <PageTemplate title={CSS_TITLE} faviconPath={'//avdeevdenis.github.io//favicon.ico'}>
      <ul className={styles.cssList}>
        {CSSArticles.map(({ name, link }) => (
          <li key={link} className={styles.cssList__item}>
            <Link href={link}>
              <a className={styles.cssList__link} href={link}>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </PageTemplate>
  )
});

export default Page;
