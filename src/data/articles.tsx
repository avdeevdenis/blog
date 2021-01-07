import { IArticleProps } from '../components/Articles';

const createFaviconLink = (siteUrl: string) => {
    return `//www.google.com/s2/favicons?domain=${siteUrl}&sz=48`
};

const STATIC_PAGES = '/pages/';

export const articlesData: IArticleProps[] = [{
    title: 'JS helpers',
    description: 'Вспомогательные приемы в JS.',
    link: STATIC_PAGES + 'js-helpers'
}, {
    title: 'Frontend Drug Parser',
    description: 'Парсер предельных цен на лекарства по названию лекарства.',
    link: STATIC_PAGES + 'frontend-drug-parser',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/frontend-drug-parser'),
    createdAt: '10 Sep 2020'
}, {
    title: 'SberLenta Parser',
    description: 'Парсер ассортимента магазина Лента (sbermarket.ru/lenta) с промежуточным сохранением результатов в БД.',
    link: STATIC_PAGES + 'sberlenta-parser',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/tools-parser-api'),
    createdAt: '14 Aug 2020',
}, {
    title: 'Web Wikipedia Parser',
    description: 'Парсер слов с различных страниц Википедии с морфологическим преобразованием, фильтрацией и ранжированием по частоте употребления каждого слова.',
    link: STATIC_PAGES + 'web-wiki-parser/',
    createdAt: '20 Oct 2019',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/web-wiki-parser')
}, {
    title: 'Falling Lego Blocks',
    description: 'Анимация соединения деталей лего при скролле страницы с помощью CSS и JS.',
    createdAt: '18 Oct 2019',
    link: STATIC_PAGES + 'lego-blocks/',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/lego-blocks')
}, {
    title: 'Circles Animation',
    description: 'Анимация маленьких кружочков вариативного количества и размера из которых выстраиваются простые геометрические фигуры.',
    link: STATIC_PAGES + 'circles-animation/',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/circles-animation'),
    createdAt: '28 Sep 2019',
}, {
    title: 'Waxon',
    description: 'Pixel perfect верстка по готовому макету.',
    link: STATIC_PAGES + 'waxon',
    createdAt: '24 Oct 2018'
}];
