export enum hrefEnum {
    academy = '/academy',
    blog = '/blog',
    catalog = '/catalog',
    main = '/',
    me = '/user/me',
    paidOptions = '/paid-options',
    payment = '/payment',
    privacy = '/privacy-policy',
    soon = '/soon',
    support = '/support',
    user = '/user',
    userAgreement = '/user-agreement',
    userEdit = '/user/edit'
}

export const serviceCategoriesNav = [
    {
        id: 1,
        title: 'Специалисты',
        icon: 'people',
        items: [
            {
                id: 101,
                title: 'Дизайнеры карточек товара',
                href: '/offers/',
            },
            {
                id: 102,
                title: 'Дизайнер упаковок',
                href: '/offers/',
            },
            {
                id: 103,
                title: 'Менеджеры ЛК',
                href: '/offers/',
            },
            {
                id: 104,
                title: 'Таргетологи для маркетплелйсов',
                href: '/offers/',
            },
            {
                id: 105,
                title: 'Организаторы фотосетов товаров под ключ',
                href: '/offers/',
            },
        ],
        banners: [
            {
                id: 1,
                title: 'Курс про инфографику на WB и OZON',
                image: '/images/banner/banner.jpg',
                href: 'https://course.sellershub.ru/',
                target: '_blank',
            },
        ],
        note: 'В этом разделе предоставлены специалисты по разработке продающего дизайна карточек товаров на WB или OZON.',
    },
    {
        id: 2,
        title: 'Товары',
        icon: 'bag',
        items: [
            {
                id: 201,
                title: 'Дизайнеры карточек товара',
                href: '/offers/',
            },
            {
                id: 202,
                title: 'Дизайнер упаковок',
                href: '/offers/',
            },
            {
                id: 203,
                title: 'Менеджеры ЛК',
                href: '/offers/',
            },
            {
                id: 204,
                title: 'Таргетологи для маркетплелйсов',
                href: '/offers/',
            },
        ],
    },
    {
        id: 3,
        title: 'Услуги',
        icon: 'category',
        items: [
            {
                id: 301,
                title: 'Дизайнеры карточек товара',
                href: '/offers/',
            },
            {
                id: 302,
                title: 'Дизайнер упаковок',
                href: '/offers/',
            },
            {
                id: 303,
                title: 'Менеджеры ЛК',
                href: '/offers/',
            },
        ],
    },
    {
        id: 4,
        title: 'Инструменты',
        icon: 'tool',
        items: [
            {
                id: 401,
                title: 'Дизайнеры карточек товара',
                href: '/offers/',
            },
            {
                id: 402,
                title: 'Дизайнер упаковок',
                href: '/offers/',
            },
            {
                id: 403,
                title: 'Менеджеры ЛК',
                href: '/offers/',
            },
        ],
    },
    {
        id: 5,
        title: 'Информация',
        icon: 'book',
        items: [
            {
                id: 501,
                title: 'Дизайнеры карточек товара',
                href: '/offers/',
            },
            {
                id: 502,
                title: 'Дизайнер упаковок',
                href: '/offers/',
            },
            {
                id: 503,
                title: 'Менеджеры ЛК',
                href: '/offers/',
            },
        ],
    },
]

export const footerNav = [
    {
        id: 1,
        large: false,
        title: 'Продукт',
        items: [
            {
                id: 101,
                title: 'Каталог',
                href: hrefEnum.catalog,
            },
            {
                id: 102,
                title: 'Вопросы и ответы',
                href: '/soon?reference=/questions',
            },
            {
                id: 103,
                title: 'Поддержка',
                href: '/support',
            },
        ],
    },
    {
        id: 2,
        large: true,
        title: 'Категории',
        items: [
            {
                id: 201,
                title: 'Специалисты',
                href: `${hrefEnum.catalog}/profi`,
            },
            {
                id: 202,
                title: 'Инструменты',
                href: `${hrefEnum.catalog}/tools`,
                // href: '/soon?reference=/catalog/tools',
            },
            {
                id: 203,
                title: 'Товары',
                href: `${hrefEnum.catalog}/product`,
                // href: '/soon?reference=/catalog/product',
            },
            {
                id: 204,
                title: 'Информация',
                href: `${hrefEnum.catalog}/info`,
                // href: '/soon?reference=/catalog/info',
            },
            {
                id: 206,
                title: 'Услуги',
                href: `${hrefEnum.catalog}/services`,
                // href: '/soon?reference=/catalog/services',
            },
        ],
    },
]

export const stubCards = [
    {id: 0, image: '/images/stubCards/stub1.png', title: 'Закреп вашей услуги на первой строке в каталоге'},
    {id: 1, image: '/images/stubCards/stub2.svg', title: 'Гарантированное увеличение просмотров'},
    {id: 2, image: '/images/stubCards/stub3.png', title: 'Больше информации, чтобы привлечь внимание'},
    {id: 3, image: '/images/stubCards/stub1.png', title: 'Закреп вашей услуги на первой строке в каталоге'},
    {id: 4, image: '/images/stubCards/stub2.svg', title: 'Гарантированное увеличение просмотров'},
    {id: 5, image: '/images/stubCards/stub3.png', title: 'Больше информации, чтобы привлечь внимание'},
    {id: 6, image: '/images/stubCards/stub1.png', title: 'Закреп вашей услуги на первой строке в каталоге'},
    {id: 7, image: '/images/stubCards/stub2.svg', title: 'Гарантированное увеличение просмотров'},
    {id: 8, image: '/images/stubCards/stub3.png', title: 'Больше информации, чтобы привлечь внимание'},
    {id: 9, image: '/images/stubCards/stub1.png', title: 'Закреп вашей услуги на первой строке в каталоге'},
]