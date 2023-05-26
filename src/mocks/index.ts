// export const calendarOptions = ['Сегодня', 'Вчера', 'Последние 4 дня', 'Пользовательский']
import {formatDate} from '../utils/helpers/date'

import Qwe from '@static/images/add-key-hover.svg'

const oneDayAgo = new Date()
oneDayAgo.setDate(oneDayAgo.getDate() - 1)

const fourDayAgo = new Date()
fourDayAgo.setDate(fourDayAgo.getDate() - 3)

export const calendarOptions = [
  {id: 1, title: 'Сегодня', date: formatDate(new Date(), 'MMM DD, YYYY'), data: new Date()},
  {id: 2, title: 'Вчера', date: formatDate(oneDayAgo, 'MMM DD, YYYY'), data: oneDayAgo},
  {
    id: 3,
    title: 'Последние 4 дня',
    date: `${formatDate(fourDayAgo, 'MMM DD, YYYY')} - ${formatDate(new Date(), 'MMM DD, YYYY')}`,
    data: [new Date()]
  },
  {id: 4, title: 'Пользовательский', date: null}
]

export const menuButtons = [
  {
    title: 'Поддержка',
    icon: '/assets/icons/help.svg',
    iconHover: '/assets/icons/helpHover.svg',
    href: '/support',
  },
]

export const cities = [
  {
    id: 1, name: 'Москва', pvz: [
      {id: 1, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 2, name: 'Бульвар Маршала Рокоссовского 6к18'},
      {id: 3, name: 'Змитрока Бядули, Змитрока Бядули'},
    ]
  },
  {
    id: 2, name: 'Санкт-Петербуг', pvz: [
      {id: 1, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 2, name: 'Бульвар Маршала Рокоссовского 6к18'},
      {id: 3, name: 'Змитрока Бядули, Змитрока Бядули'},
      {id: 4, name: 'Яблочкова 24, переулок 5'},
      {id: 5, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 6, name: 'Бульвар Маршала Рокоссовского 6к18'},
      {id: 7, name: 'Змитрока Бядули, Змитрока Бядули'},
      {id: 8, name: 'Яблочкова 24, переулок 5'},
    ]
  },
  {
    id: 3, name: 'Казань', pvz: [
      {id: 1, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 2, name: 'Бульвар Маршала Рокоссовского 6к18'},
      {id: 3, name: 'Змитрока Бядули, Змитрока Бядули'},
      {id: 4, name: 'Яблочкова 24, переулок 5'},
    ]
  },
  {
    id: 4, name: 'Екатеринбург', pvz: [
      {id: 1, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 2, name: 'Бульвар Маршала Рокоссовского 6к18'},
      {id: 3, name: 'Змитрока Бядули, Змитрока Бядули'},
      {id: 4, name: 'Яблочкова 24, переулок 5'},
      {id: 5, name: 'Балашиха, Проспект Ленина 23/5'},
    ]
  },
  {
    id: 5, name: 'Новосибирск', pvz: [
      {id: 1, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 2, name: 'Бульвар Маршала Рокоссовского 6к18'},
      {id: 3, name: 'Змитрока Бядули, Змитрока Бядули'},
      {id: 4, name: 'Яблочкова 24, переулок 5'},
      {id: 5, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 6, name: 'Бульвар Маршала Рокоссовского 6к18'},
    ]
  },
  {
    id: 6, name: 'Новосибирск', pvz: [
      {id: 1, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 2, name: 'Бульвар Маршала Рокоссовского 6к18'},
      {id: 3, name: 'Змитрока Бядули, Змитрока Бядули'},
      {id: 4, name: 'Яблочкова 24, переулок 5'},
      {id: 5, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 6, name: 'Бульвар Маршала Рокоссовского 6к18'},
    ]
  },
  {
    id: 7, name: 'Новосибирск', pvz: [
      {id: 1, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 2, name: 'Бульвар Маршала Рокоссовского 6к18'},
      {id: 3, name: 'Змитрока Бядули, Змитрока Бядули'},
      {id: 4, name: 'Яблочкова 24, переулок 5'},
      {id: 5, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 6, name: 'Бульвар Маршала Рокоссовского 6к18'},
    ]
  },
  {
    id: 6, name: 'Александровск-сахалинский-волгоград', pvz: [
      {id: 1, name: 'Балашиха, Проспект Ленина 23/5'},
      {id: 2, name: 'Бульвар Маршала Рокоссовского 6к18'},
      {id: 3, name: 'Змитрока Бядули, Змитрока Бядули'},
    ]
  },
]

export const articleDescription = 'Куртка косуха кожаная...Куртка косуха кожаная...Куртка косуха кожаная...Куртка косуха кожаная...Куртка косуха кожаная...Куртка косуха кожаная...'


export const tableArticleOptions: IArticleOption[] = [
  {id: 1, name: 'Добавить ключ'},
  {id: 2, name: 'Экспортировать'},
  {id: 3, name: 'Удалить артикул'},
]

export const keys = {
  'query': [
    {
      'key': 'куртка зимняя куртка зимняякуртка зимняякуртка зимняя',
      'data': [
        {
          'address': 'Москва, Яблочкова 25к4',
          'position': [
            {
              'date': '5/16/2023',
              'position': 122,
              'prevPosition': '+38'
            },
            {
              'date': '5/17/2023',
              'position': 2,
              'prevPosition': '-146'
            },
            {
              'date': '5/18/2023',
              'position': 3,
              'prevPosition': null
            },
            {
              'date': '5/19/2023',
              'position': 4
            },
          ]
        },
        {
          'address': 'Москва, Новоостаповская 4к2',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Балашиха, Проспект Ленина 23/5',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Бульвар Маршала Рокоссовского 6к18',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        },
        {
          'address': 'Москва, Лобачевского 100к1',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва Николаева 33, Электросталь',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Чертановская 40',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Люберцы (Московская область), улица Кирова, д. 51',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        },
        {
          'address': 'Санкт-Петербург, улица Победы, д. 13',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Санкт-Петербург, м Садовая, пр-кт. Английский, 31',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Санкт-Петербург, Серебристый бульвар, д. 21к1',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Казань',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Новосибирск',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Екатеринбург',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Нижний Новгород',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Волгоград',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        },
        {
          'address': 'Самара',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Краснодар',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Владивосток',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        }
      ]
    },
    {
      'key': 'куртка летняя',
      'data': [
        {
          'address': 'Москва, Яблочкова 25к4',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Новоостаповская 4к2',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Балашиха, Проспект Ленина 23/5',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Бульвар Маршала Рокоссовского 6к18',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        },
        {
          'address': 'Москва, Лобачевского 100к1',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва Николаева 33, Электросталь',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Чертановская 40',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Люберцы (Московская область), улица Кирова, д. 51',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        },
        {
          'address': 'Санкт-Петербург, улица Победы, д. 13',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Санкт-Петербург, м Садовая, пр-кт. Английский, 31',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Санкт-Петербург, Серебристый бульвар, д. 21к1',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Казань',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Новосибирск',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Екатеринбург',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Нижний Новгород',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Волгоград',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        },
        {
          'address': 'Самара',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Краснодар',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Владивосток',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        }
      ]
    },
    {
      'key': 'штаны',
      'data': [
        {
          'address': 'Москва, Яблочкова 25к4',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Новоостаповская 4к2',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Балашиха, Проспект Ленина 23/5',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Бульвар Маршала Рокоссовского 6к18',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        },
        {
          'address': 'Москва, Лобачевского 100к1',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва Николаева 33, Электросталь',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Москва, Чертановская 40',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Люберцы (Московская область), улица Кирова, д. 51',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        },
        {
          'address': 'Санкт-Петербург, улица Победы, д. 13',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Санкт-Петербург, м Садовая, пр-кт. Английский, 31',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Санкт-Петербург, Серебристый бульвар, д. 21к1',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Казань',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Новосибирск',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Екатеринбург',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Нижний Новгород',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Волгоград',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        },
        {
          'address': 'Самара',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Краснодар',
          'position': [
            {
              'date': '5/16/2023',
              'position': 1
            }
          ]
        },
        {
          'address': 'Владивосток',
          'position': [
            {
              'date': '5/16/2023',
              'position': 2
            }
          ]
        }
      ]
    }
  ]
}

export const mainServices = [
  {
    image: '/images/header/main-services-1-icon.png',
    title: 'Мониторинг позиций',
    subtitle: 'Сравнение позиций по ПВЗ + расширенный отчет',
    link: '',
    isDraft: false,
  },
  {
    image: '/images/header/main-services-2-icon.png',
    title: 'Поиск и подбор ключевых слов',
    subtitle: 'Для SEO-оптимизации карточек товаров',
    link: '',
    isDraft: true,
  },
]

export const telegramBots = [
  {
    name: 'Мониторинг позиций по ПВЗ',
    link: '',
  },
  {
    name: 'СПП калькулятор',
    link: '',
  },
  {
    name: 'Шпион за чужими артикулами',
    link: '',
  },
]

export const mainHubs = [
  {
    image: '/images/header/main-services-1-icon.png',
    title: 'Фулфилмент',
    subtitle: 'Расширенный с сравнением позиций по ПВЗ',
    link: '',
    isDraft: false,
  },
  {
    image: '/images/header/main-services-1-icon.png',
    title: 'Финансы',
    subtitle: 'Расширенный поиск ключевых слов',
    link: '',
    isDraft: false,
  },
  {
    image: '/images/header/main-services-1-icon.png',
    title: 'Дизайнеры',
    subtitle: 'Расширенный поиск ключевых слов',
    link: '',
    isDraft: false,
  },
  {
    image: '/images/header/main-services-1-icon.png',
    title: 'Менеджеры маркетплейсов',
    subtitle: 'Расширенный с сравнением позиций по ПВЗ',
    link: '',
    isDraft: true,
  },
  {
    image: '/images/header/main-services-1-icon.png',
    title: 'SEO-Хаб',
    subtitle: 'Расширенный поиск ключевых слов',
    link: '',
    isDraft: false,
  },
]

export const mainCatalog = [
  {
    id: '1',
    name: 'Специалисты',
    link: '',
    services: [
      {
        image: '/images/header/main-services-1-icon.png',
        title: 'Дизайнеры карточек товара',
        subtitle: 'Закажите карточки товаров с высокой конверсией и узнаваемостью',
        link: '',
        isDraft: false,
      },
      {
        image: '/images/header/main-services-1-icon.png',
        title: 'Менеджеры личного кабинета',
        subtitle: 'Сотрудничайте с опытными специалистами для роста продаж и масштабирования',
        link: '',
        isDraft: false,
      },
      {
        image: '/images/header/main-services-1-icon.png',
        title: 'SEO-специалисты',
        subtitle: 'Выводите карточки в топ выдачи вместе с профессионалами',
        link: '',
        isDraft: false,
      },
    ],
    otherServices: [
      {
        name: 'Фотографы товаров',
        link: '',
      },
      {
        name: 'Организаторы фотосетов товаров под ключ',
        link: '',
      },
      {
        name: 'Дизайнеры упаковки',
        link: '',
      },
      {
        name: 'Таргетологи для маркетплейсов',
        link: '',
      },
      {
        name: 'Фотомодели для товаров',
        link: '',
      },
      {
        name: 'Специалисты видео продакшна товаров',
        link: '',
      },
    ]
  },
  {
    id: '2',
    name: 'Услуги',
    link: '',
    services: [
      {
        image: '/images/header/main-services-1-icon.png',
        title: 'Фулфилменты',
        subtitle: 'Лучшие компании для партнерства с честным прайсом и рейтингом',
        link: '',
        isDraft: false,
      },
      {
        image: '/images/header/main-services-1-icon.png',
        title: 'Финансовые организации',
        subtitle: 'Сделают ваши карточку товара узнаваемой и более конверсионной',
        link: '',
        isDraft: true,
      },
    ]
  },
  {
    id: '3',
    name: 'Товары',
    link: '',
    services: [
      {
        image: '/images/header/main-services-1-icon.png',
        title: 'Фулфилменты',
        subtitle: 'Лучшие компании для партнерства с честным прайсом и рейтингом',
        link: '',
        isDraft: false,
      },
    ]
  },
  {
    id: '4',
    name: 'Инструменты',
    link: '',
    services: [
      {
        image: '/images/header/main-services-1-icon.png',
        title: 'Фулфилменты',
        subtitle: 'Лучшие компании для партнерства с честным прайсом и рейтингом',
        link: '',
        isDraft: false,
      },
      {
        image: '/images/header/main-services-1-icon.png',
        title: 'Финансовые организации',
        subtitle: 'Сделают ваши карточку товара узнаваемой и более конверсионной',
        link: '',
        isDraft: true,
      },
    ]
  },
  {
    id: '5',
    name: 'Информация',
    link: '',
    services: [
      {
        image: '/images/header/main-services-1-icon.png',
        title: 'Фулфилменты',
        subtitle: 'Лучшие компании для партнерства с честным прайсом и рейтингом',
        link: '',
        isDraft: false,
      },
    ]
  },
]

export const userInitial = {
  email: '',
  telegramId: '',
  towns: [],
  _id: ''
}
export const chosenCityInitial = {
  _id: '',
  city: '',
  pwz: []
}

export interface IArticleOption{
  id: number
  name: string
}

export interface IJustCity{
  id: number,
  name: string
}

export interface IPVZ{
  id: number,
  name: string
}
