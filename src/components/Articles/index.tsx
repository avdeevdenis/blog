import React, { CSSProperties } from 'react';
import Link from 'next/link';

import styles from './index.module.scss';

import { articlesData } from '../../data/articles';

import { AppWrapper } from '..';
export interface IArticleProps {
    // Заголовок статьи
    title: string;
    // Описание статьи
    description: string;
    // Дата написания
    createdAt?: string;
    // Ссылка на статью
    link: string;
    // Фавиконка страницы со статьей
    faviconLink?: string;
    // Текст на кнопке
    buttonText?: string;
    // Параметр открытия ссылки
    target?: '_blank';
}

export const Article: React.FC<IArticleProps> = ({
    title, description, createdAt, link, faviconLink, buttonText, target
}) => {
    const titleWrapped = title.trim();
    const faviconStyle: CSSProperties | undefined = faviconLink ? { backgroundImage: `url(${faviconLink})` } : undefined;

    const buttonTextContent = buttonText || 'Read More';

    return (
        <div className={styles.Article}>
            <div className={styles['Article-Title']}>
                <b>{titleWrapped.slice(0, 1)}</b>{titleWrapped.slice(1)}
            </div>
            <div className={styles['Article-Description']}>{description}</div>
            <div className={styles['Article-Bottom']}>
                <Link href={link}>
                    <a href={link} target={target} title='Открыть в новой вкладке' className={styles['Article-ReadButton']}>
                        <div style={faviconStyle} className={styles['Article-Favicon']} />
                        {buttonTextContent}
                    </a>
                </Link>
                {createdAt && <div className={styles['Article-CreatedAt']}>{createdAt}</div>}
            </div>
        </div>
    )
}

const Articles: React.FC = React.memo(() => {
    return (
        <div className={styles['ArticleList-Wrapper']}>
            <AppWrapper>
                <div className={styles.ArticleList}>
                    {articlesData.map((articleData) => {
                        return <Article key={articleData.title} {...articleData} />
                    })}
                </div>
            </AppWrapper>
        </div>
    );
});

export default Articles;
