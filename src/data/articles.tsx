import { IArticleProps } from '../components/Articles';

const createFaviconLink = (siteUrl: string) => {
    return `//www.google.com/s2/favicons?domain=${siteUrl}&sz=48`
};

const STATIC_PAGES = '/pages/';

export const articlesData: IArticleProps[] = [{
    title: 'Falling Lego Blocks',
    description: 'Анимация соединения деталей лего при скролле страницы с помощью CSS и JS.',
    createdAt: '18 Oct 2019',
    link: STATIC_PAGES + 'lego-blocks/',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/lego-blocks')
}, {
    title: 'Web Wikipedia Parser',
    description: 'Парсер слов с различных страниц Википедии с морфологическим преобразованием, фильтрацией и ранжированием по частоте употребления каждого слова.',
    link: STATIC_PAGES + 'web-wiki-parser/',
    createdAt: '20 Oct 2019',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/web-wiki-parser')
}, {
    title: 'Circles Animation',
    description: 'Анимация маленьких кружочков вариативного количества и размера из которых выстраиваются простые геометрические фигуры.',
    link: '//avdeevdenis.github.io/circles-animation',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/circles-animation'),
    createdAt: 'todo',
}, {
    title: 'SberLenta Parser',
    description: 'Парсер ассортимента магазина Лента (sbermarket.ru/lenta) с промежуточным сохранением результатов в БД.',
    link: STATIC_PAGES + 'sberlenta-parser',
    // faviconLink: createFaviconLink('//avdeevdenis.github.io/sberlenta-parser'),
    createdAt: 'todo',
}, {
    title: 'Frontend Drug Parser',
    description: 'TODO',
    link: STATIC_PAGES + 'frontend-drug-parser',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/frontend-drug-parser'),
    createdAt: 'todo'
}, {
    title: 'Vk Parser',
    description: 'TODO',
    link: STATIC_PAGES + 'vk-parser',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/vk-parser'),
    createdAt: 'todo'
}, {
    title: 'Waxon',
    description: 'TODO',
    link: STATIC_PAGES + 'waxon',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/waxon'),
    createdAt: 'todo'
}, {
    title: 'React VK',
    description: 'TODO',
    link: STATIC_PAGES + 'react-vk',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/react-vk'),
    createdAt: 'todo'
}, {
    title: 'Header Line',
    description: 'TODO',
    link: STATIC_PAGES + 'header-line',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/header-line'),
    createdAt: 'todo'
}, {
    title: 'Progress Circle Loader',
    description: 'TODO',
    link: STATIC_PAGES + 'progress',
    faviconLink: createFaviconLink('//avdeevdenis.github.io/progress'),
    createdAt: 'todo'
}];
