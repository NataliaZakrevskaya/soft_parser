// export const calendarOptions = ['Сегодня', 'Вчера', 'Последние 4 дня', 'Пользовательский']
import {formatDate} from '../helpers/date'

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
  // {id: 7, name: 'Казань', pvz: 12},
  // {id: 8, name: 'Екатеринбург', pvz: 94},
  // {id: 9, name: 'Новосибирск', pvz: 9},
]

export const justCities: IJustCity[] = [
  {id: 1, name: 'Москва'},
  {id: 2, name: 'Челябинск'},
  {id: 3, name: 'Красноярск'},
  {id: 4, name: 'Уфа'},
  {id: 5, name: 'Омск'},
  {id: 6, name: 'Краснодар'},
  {id: 7, name: 'Санкт-Петербург'},
  {id: 8, name: 'Новосибирск'},
  {id: 9, name: 'Екатеринбург'},
  {id: 10, name: 'Казань'},
  {id: 11, name: 'Москва'},
  {id: 12, name: 'Челябинск'},
  {id: 13, name: 'Красноярск'},
  {id: 14, name: 'Уфа'},
  {id: 15, name: 'Омск'},
  {id: 16, name: 'Краснодар'},
  {id: 17, name: 'Санкт-Петербург'},
  {id: 18, name: 'Новосибирск'},
  {id: 19, name: 'Екатеринбург'},
  {id: 20, name: 'Казань'},

]

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

export interface ICity{
  id: number,
  name: string,
  pvz: IPVZ[]
}