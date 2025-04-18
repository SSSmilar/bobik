import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: "ssr-gt-f01",
    name: "SSR GT F01",
    description: "Легкосплавные диски SSR GT F01 с плоским черным покрытием",
    price: 25000,
    images: [
      "/wheels/ssr-gt-f01-1.jpg",
      "/wheels/ssr-gt-f01-2.jpg",
      "/wheels/ssr-gt-f01-3.jpg"
    ],
    specs: {
      diameter: ["17", "18"],
      width: "7.5",
      pcd: "5x114.3",
      et: ["45"],
      dia: "73.1"
    },
    variants: [
      {
        id: "ssr-gt-f01-17-45",
        diameter: "17",
        width: "7.5",
        et: "45",
        price: 25000,
        stock: 4
      },
      {
        id: "ssr-gt-f01-18-45",
        diameter: "18",
        width: "7.5",
        et: "45",
        price: 27000,
        stock: 4
      }
    ],
    reviews: [
      {
        id: "ssr-review-1",
        author: "Алексей К.",
        rating: 5,
        date: "2023-12-15",
        text: "Отличные диски, лёгкие и прочные. Поставил на свою Silvia S15, смотрятся просто бомба! Особенно радует плоское чёрное покрытие - минимум внимания при уходе, максимум стиля на дороге.",
        avatar: "/avatars/user1.jpg",
        images: ["/reviews/ssr-review-1.jpg"]
      },
      {
        id: "ssr-review-2",
        author: "Дмитрий В.",
        rating: 4,
        date: "2023-11-20",
        text: "Взял комплект на свою Subaru. Качество на высоте, как и ожидалось от SSR. Снял одну звезду за не самую простую очистку после зимних поездок, но это мелочи по сравнению с тем, как они преобразили мою машину.",
        avatar: "/avatars/user2.jpg"
      },
      {
        id: "ssr-review-3",
        author: "Максим Л.",
        rating: 5,
        date: "2023-10-05",
        text: "Уже второй комплект SSR. Первый отходил 5 лет без нареканий. Новые диски - это просто шедевр. Машина стала заметно отзывчивее в поворотах. Всем рекомендую!",
        avatar: "/avatars/user3.jpg",
        images: ["/reviews/ssr-review-3-1.jpg", "/reviews/ssr-review-3-2.jpg"]
      }
    ],
    rating: 4.7
  },
  {
    id: "work-emotion-cr-kiwami",
    name: "BBS Cast flow formed FI",
    description: "Легкосплавные диски BBS Cast flow formed FI с премиальной отделкой",
    price: 32000,
    images: [
      "/wheels/work-emotion-1.jpg",
      "/wheels/work-emotion-2.jpg",
      "/wheels/work-emotion-3.jpg"
    ],
    specs: {
      diameter: ["18"],
      width: "8.5",
      pcd: "5x114.3",
      et: ["38"],
      dia: "73.1"
    },
    variants: [
      {
        id: "bbs-fi-18-38",
        diameter: "18",
        width: "8.5",
        et: "38",
        price: 32000,
        stock: 4
      }
    ],
    reviews: [
      {
        id: "work-review-1",
        author: "Игорь М.",
        rating: 5,
        date: "2023-12-10",
        text: "WORK всегда славились качеством, и эти диски - не исключение. Матовый чёрный цвет выглядит очень сдержанно и элегантно. Машина стала выглядеть совершенно по-другому. Очень доволен!",
        avatar: "/avatars/user4.jpg",
        images: ["/reviews/work-review-1.jpg"]
      },
      {
        id: "work-review-2",
        author: "Евгений Н.",
        rating: 5,
        date: "2023-11-18",
        text: "Купил эти диски для своей Honda. Качество изготовления безупречное, диски идеально сбалансированы. Вес ощутимо меньше стоковых. Получаю комплименты от других автолюбителей постоянно!",
        avatar: "/avatars/user5.jpg"
      },
      {
        id: "work-review-3",
        author: "Сергей Т.",
        rating: 4,
        date: "2023-09-30",
        text: "Отличные диски, но есть небольшой нюанс - в сильный дождь на дисках остаются пятна, которые потом сложно оттереть. А так - дизайн супер, качество на высоте. Рекомендую.",
        avatar: "/avatars/user6.jpg",
        images: ["/reviews/work-review-3.jpg"]
      }
    ],
    rating: 4.7
  },
  {
    id: "rays-te37",
    name: "BBS Cast flow formed RX (Ended)",
    description: "Премиальные диски BBS Cast flow formed RX в лимитированной серии",
    price: 45000,
    images: [
      "/wheels/rays-te37-1.jpg",
      "/wheels/rays-te37-2.jpg",
      "/wheels/rays-te37-3.jpg"
    ],
    specs: {
      diameter: ["18", "19"],
      width: ["8.5", "9.0"],
      pcd: "5x114.3",
      et: ["35"],
      dia: "73.1"
    },
    variants: [
      {
        id: "bbs-rx-18-35",
        diameter: "18",
        width: "8.5",
        et: "35",
        price: 45000,
        stock: 4
      },
      {
        id: "bbs-rx-19-35",
        diameter: "19",
        width: "9.0",
        et: "35",
        price: 48000,
        stock: 4
      }
    ],
    reviews: [
      {
        id: "rays-review-1",
        author: "Антон К.",
        rating: 5,
        date: "2023-12-05",
        text: "TE37 - это классика, которая никогда не выйдет из моды. Наконец-то смог купить оригинал вместо реплик. Разница колоссальная! Бронзовый цвет идеально подходит к моей белой Evo X. Не жалею ни о одной потраченной копейке.",
        avatar: "/avatars/user7.jpg",
        images: ["/reviews/rays-review-1-1.jpg", "/reviews/rays-review-1-2.jpg"]
      },
      {
        id: "rays-review-2",
        author: "Валентин Д.",
        rating: 5,
        date: "2023-11-22",
        text: "Купил эти диски по совету друга и не прогадал. Несмотря на высокую цену, они стоят каждой копейки. Машина стала заметно легче в управлении, расход топлива немного снизился. Легендарные диски - легендарное качество!",
        avatar: "/avatars/user8.jpg"
      },
      {
        id: "rays-review-3",
        author: "Николай Р.",
        rating: 4,
        date: "2023-10-15",
        text: "Мечтал об этих дисках много лет. Качество соответствует цене, но хочу предупредить - будьте аккуратны с нашими дорогами. Пару раз чуть не словил сердечный приступ, проезжая через ямы. В остальном - полный восторг!",
        avatar: "/avatars/user9.jpg",
        images: ["/reviews/rays-review-3.jpg"]
      }
    ],
    rating: 4.7
  },
  {
    id: "advan-racing-gt",
    name: "ADVAN Racing GT 9.0x19 PCD5x120 ET22 DIA 72.5 Machining & Racing Metal Black",
    description: "Премиальные кованые диски ADVAN Racing GT с комбинированной отделкой",
    price: 52000,
    images: [
      "/wheels/advan-gt-1.jpg",
      "/wheels/advan-gt-2.jpg",
      "/wheels/advan-gt-3.jpg"
    ],
    specs: {
      diameter: ["19"],
      width: "9.0",
      pcd: "5x120",
      et: ["22"],
      dia: "72.5"
    },
    variants: [
      {
        id: "advan-gt-19-22",
        diameter: "19",
        width: "9.0",
        et: "22",
        price: 52000,
        stock: 4
      }
    ],
    reviews: [
      {
        id: "advan-review-1",
        author: "Владимир П.",
        rating: 5,
        date: "2023-12-01",
        text: "Поставил на свою BMW M4. Выглядит просто потрясающе! Машина как будто съехала с постера. Качество изготовления на высочайшем уровне. ADVAN GT - это эталон в мире дисков.",
        avatar: "/avatars/user10.jpg",
        images: ["/reviews/advan-review-1.jpg"]
      },
      {
        id: "advan-review-2",
        author: "Михаил З.",
        rating: 5,
        date: "2023-11-05",
        text: "Очень долго выбирал между разными топовыми моделями и остановился на ADVAN GT. Сделал правильный выбор! Диски очень лёгкие, прочные и выглядят шикарно. Отдельное спасибо магазину за быструю доставку!",
        avatar: "/avatars/user11.jpg",
        images: ["/reviews/advan-review-2-1.jpg", "/reviews/advan-review-2-2.jpg"]
      },
      {
        id: "advan-review-3",
        author: "Константин У.",
        rating: 4,
        date: "2023-10-20",
        text: "Великолепные диски, но цена кусается. Хотя, учитывая их вес и прочность, это вполне оправдано. Выразительный дизайн привлекает внимание даже когда машина просто стоит на парковке. Единственный минус - долго ждал доставку из Японии.",
        avatar: "/avatars/user12.jpg"
      }
    ],
    rating: 4.7
  },
  {
    id: "bbs-lm",
    name: "BBS LM 8.5x19 PCD5x112 ET32 DIA 66.5 Diamond Black",
    description: "Культовые диски BBS LM с алмазно-черной отделкой",
    price: 48000,
    images: [
      "/wheels/bbs-lm-1.jpg",
      "/wheels/bbs-lm-2.jpg",
      "/wheels/bbs-lm-3.jpg"
    ],
    specs: {
      diameter: ["19"],
      width: "8.5",
      pcd: "5x112",
      et: ["32"],
      dia: "66.5"
    },
    variants: [
      {
        id: "bbs-lm-19-32",
        diameter: "19",
        width: "8.5",
        et: "32",
        price: 48000,
        stock: 3
      }
    ],
    reviews: [
      {
        id: "bbs-review-1",
        author: "Андрей К.",
        rating: 5,
        date: "2023-11-25",
        text: "BBS LM - это классика, не подвластная времени. Установил на свой Audi RS6, смотрится просто невероятно. Качество на высоте, как всегда у BBS. Рекомендую всем, кто ценит немецкое качество и стиль!",
        avatar: "/avatars/user13.jpg",
        images: ["/reviews/bbs-review-1.jpg"]
      },
      {
        id: "bbs-review-2",
        author: "Павел Ф.",
        rating: 4,
        date: "2023-10-30",
        text: "Отличные диски для тех, кто хочет выделиться из толпы. Единственное, за чем нужно следить - это за сколами. Лак довольно нежный, и на наших дорогах требует бережного отношения. В остальном - только положительные эмоции!",
        avatar: "/avatars/user14.jpg",
        images: ["/reviews/bbs-review-2.jpg"]
      },
      {
        id: "bbs-review-3",
        author: "Илья Г.",
        rating: 5,
        date: "2023-10-05",
        text: "Наконец-то сбылась мечта - поставил BBS LM на свой Golf R. То чувство, когда диски стоят как половина машины, но оно того стоит! Управляемость заметно улучшилась благодаря меньшему весу. Буду советовать всем друзьям.",
        avatar: "/avatars/user15.jpg",
        images: ["/reviews/bbs-review-3-1.jpg", "/reviews/bbs-review-3-2.jpg"]
      }
    ],
    rating: 4.7
  }
]; 