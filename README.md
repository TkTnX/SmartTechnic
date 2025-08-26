## SmartTechnic — интернет‑магазин техники

Полнофункциональное веб‑приложение: витрина товаров, карточки продуктов со спецификациями и отзывами, избранное и сравнение, корзина и оформление заказов, раздел новостей и промо, личный кабинет пользователя, а также административная панель для управления каталогом.

### Содержание
- О проекте
- Архитектура и технологии
- Функциональность (модули и страницы)
- API и данные
- Установка и запуск (локально и через Docker)
- Переменные окружения
- Скрипты и команды

## О проекте
SmartTechnic — e‑commerce платформа для продажи бытовой и электронной техники. Проект включает публичную часть сайта (каталог, контентные страницы, оформление заказа) и закрытые разделы: личный кабинет пользователя и админ‑панель для контента и товаров.

## Архитектура и технологии

Монорепозиторий из двух приложений:
- `client/` — фронтенд на React + TypeScript + Vite
  - Сторонние библиотеки: React Router v7, TanStack Query, React Hook Form, Zod, Zustand, React Toastify, Swiper, Lucide Icons, Markdown (react-markdown, remark-gfm), `vite-plugin-svgr`.
  - Архитектура по фичам: `shared/`, `entities/`, `features/`, `widgets/`.
  - Стили — SCSS.
- `backend/` — бэкенд на NestJS + TypeScript
  - ORM: Prisma (PostgreSQL)
  - Сессии и авторизация: `express-session` + Redis, cookie‑based, middleware для проверки администратора
  - Валидация DTO: class-validator/class-transformer
  - Почта: Resend
  - Платежи: YooKassa (`@a2seven/yoo-checkout`)
  - Хранение файлов: раздача `/uploads`

Инфраструктура:
- Docker Compose для PostgreSQL и Redis (`backend/docker-compose.yml`)
- ESLint + Prettier, TypeScript конфигурации для обоих приложений

## Функциональность и страницы

Публичные страницы (`client/src/main.tsx`):
- `/` — Главная
- `/catalog` — Каталог с фильтрами, сортировкой и пагинацией
- `/product/:productId` — Карточка товара: галерея, описание, спецификации, отзывы, добавление в корзину/избранное/сравнение
- `/about` — О компании
- `/service` — Сервис и гарантия
- `/contacts` — Контакты
- `/installment` — Покупка в рассрочку
- `/wholesale` — Опт
- `/dropshipping` — Дропшиппинг
- `/promos` — Промо‑акции (список)
- `/promos/:promoId` — Детальная промо‑страница
- `/vacancies` — Вакансии
- `/news` — Новости (список)
- `/news/:newsId` — Новость
- `/compare` — Сравнение товаров

Аутентификация и восстановление:
- `/auth/verify-email/:token` — подтверждение email
- `/auth/new-password` — запрос на смену пароля и установка нового

Личный кабинет (требуется вход):
- `/profile` — Профиль
- `/profile/personal` — Личные данные и адреса
- `/profile/history` — История заказов
- `/profile/favorites` — Избранное
- `/profile/new-password` — Смена пароля

Корзина (требуется вход):
- `/cart` — Корзина и оформление заказа

Админ‑панель (требуется роль Admin):
- `/dashboard` — Главная админки
- `/dashboard/products` — Управление товарами
- `/dashboard/categories` — Категории
- `/dashboard/specifications` — Характеристики
- `/dashboard/news` — Новости
- `/dashboard/promos` — Промо‑материалы

Ключевые возможности фронтенда:
- Реактивные списки и кэш запросов (TanStack Query)
- Формы с валидацией (React Hook Form + Zod)
- Глобальное состояние (Zustand)
- Уведомления (React Toastify)
- Слайдеры (Swiper)
- Маршрутизация и защищённые роуты (React Router + `AuthMiddleware`)

Ключевые модули бэкенда (`backend/src/app.module.ts`):
- Auth, User — регистрация, логин, подтверждение email, восстановление пароля, роли
- Product, Category, Specification — каталог, характеристики
- Review — отзывы
- Favorite, Compare — избранное и сравнение
- CartProduct, Order, Payment — корзина, заказы, платежи (YooKassa)
- News, Promo, Vacancy — контентные сущности
- Mail — письма (Resend)
- Prisma — доступ к БД

Данные и модели (Prisma, `backend/prisma/schema.prisma`):
- Пользователи, роли, токены (подтверждение email/сброс пароля/2FA)
- Товары, категории, спецификации, отзывы, статусы товара
- Избранное, сравнение
- Корзина, заказы, элементы заказа, статусы и способы доставки/оплаты
- Новости, промо, вакансии

## API и интеграции
- REST API на NestJS, глобальные `ValidationPipe` и CORS
- Сессии: Redis‑хранилище через `connect-redis`, cookie c доменом/флагами из env
- Статика: `/uploads` раздаётся сервером

## Установка и запуск

Требования:
- Node.js LTS, npm
- Docker (для локальной БД и Redis) или собственные PostgreSQL и Redis

1) Запуск инфраструктуры (PostgreSQL и Redis):
```bash
cd backend
docker compose up -d
```

2) Настройка переменных окружения:
Создайте `.env` в `backend/` со значениями (примеры ниже). Для фронтенда добавьте `.env` при необходимости (например, `VITE_API_URL`).

Пример `backend/.env`:
```env
PORT=3000
CLIENT_URL=http://localhost:5173

DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public

REDIS_URI=redis://default:your_redis_password@localhost:6379
REDIS_PASSWORD=your_redis_password

SESSION_SECRET=super_secret
SESSION_NAME=smarttechnic.sid
SESSION_DOMAIN=localhost
SESSION_MAX_AGE=7d
SESSION_HTTP_ONLY=true
SESSION_SECURE=false
SESSION_PREFIX=st:

RESEND_API_KEY=your_resend_key
YOOKASSA_SHOP_ID=your_shop_id
YOOKASSA_SECRET_KEY=your_secret_key
```

Пример `client/.env` (при использовании):
```env
VITE_API_URL=http://localhost:3000
```

3) Установка зависимостей и миграции:
```bash
# backend
cd backend
npm install
npx prisma migrate dev
npx prisma generate

# client
cd ../client
npm install
```

4) Запуск приложений в dev‑режиме:
```bash
# backend
cd backend
npm run start:dev

# client (в отдельном терминале)
cd client
npm run dev
```

Сервисы будут доступны по адресам:
- Клиент: `http://localhost:5173`
- API: `http://localhost:3000`

5) Сборка и запуск продакшн‑версии:
```bash
# backend
cd backend
npm run build
npm run start:prod

# client
cd client
npm run build
npm run preview
```

## Переменные окружения (обзор)
- `PORT` — порт API
- `CLIENT_URL` — адрес фронтенда для CORS
- `DATABASE_URL` — строка подключения PostgreSQL
- `REDIS_URI`, `REDIS_PASSWORD` — доступ к Redis
- `SESSION_*` — настройки cookie‑сессии (домен, флаги безопасности, префикс)
- `RESEND_API_KEY` — ключ почтового сервиса
- `YOOKASSA_*` — параметры YooKassa
- `VITE_API_URL` — базовый URL API для фронтенда

## Скрипты

Фронтенд (`client/package.json`):
- `dev` — запуск Vite dev server
- `build` — сборка
- `preview` — предпросмотр сборки
- `lint` — линтинг

Бэкенд (`backend/package.json`):
- `start` / `start:dev` / `start:prod` — запуск NestJS
- `build` — сборка
- `test*` — тестирование (Jest)
- `lint`, `format` — качество кода

## Примечания по разработке
- Раздача загруженных файлов: `GET /uploads/*`
- Глобальные pipes и CORS включены
- Защищённые роуты на фронтенде строятся через `AuthMiddleware` и layout‑компоненты

## Лицензия
Проект предназначен для учебных и внутренних целей. Все торговые марки принадлежат их владельцам.
