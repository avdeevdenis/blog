import React from 'react';
import Link from 'next/link';

import BurgerIcon from '../BurgerIcon';

import styles from './index.module.scss';
import { AppWrapper } from '..';

const Header: React.FC = React.memo(() => {
    return (
        <div className={styles['Header-Wrapper']}>
            <AppWrapper>
                <div className={styles.Header}>
                    <ul className={styles['Header-Menu']}>
                        <li className={styles['Header-Burger']}>
                            <a href='#'><BurgerIcon white /></a>
                        </li>
                        {/* <li className={styles['Header-MenuItem']}>
                            <Link href='/about'>
                                <a className={styles['Header-MenuLink']}>About</a>
                            </Link>
                        </li> */}
                        <li className={styles['Header-MenuItem']}>
                            <Link href='/projects'>
                                <a className={styles['Header-MenuLink']}>Projects</a>
                            </Link>
                        </li>
                        {/* <li className={styles['Header-MenuItem']}>
                            <Link href='/contacts'>
                                <a className={styles['Header-MenuLink']}>Contacts</a>
                            </Link>
                        </li>
                        <li className={styles['Header-MenuItem']}>
                            <Link href='/jobs'>
                                <a className={styles['Header-MenuLink']}>Jobs</a>
                            </Link>
                        </li> */}
                    </ul>
                    <div className={styles['Header-Logo']}><Link href='/'>Home</Link></div>
                    <ul className={styles['Header-Menu']}>
                        <li className={styles['Header-MenuItem']}>
                            <a className={styles['Header-MenuLink']} target='_blank' title='Открыть профиль в телеграме' href='//t.me/avdeev_den'>Tg</a>
                        </li>
                        <li className={styles['Header-MenuItem']}>
                            <a className={styles['Header-MenuLink']} target='_blank' title='Открыть профиль Вконтакте' href='//vk.com/booomka'>Vk</a>
                        </li>
                        <li className={styles['Header-MenuItem']}>
                            <a className={styles['Header-MenuLink']} target='_blank' title='Открыть профиль в GitHub' href='//github.com/avdeevdenis'>Gh</a>
                        </li>
                        <div className={styles['Header-Avatar']}></div>
                    </ul>
                </div>
            </AppWrapper>
        </div>
    );
});

export default Header;
