# ShoeStore (React + TypeScript)

SPA-магазин обуви на React + TypeScript.

Функциональность:
- каталог товаров с поиском и сортировкой
- страница товара
- корзина (изменение количества, удаление, очистка)
- избранное (добавление и удаление)
- вход и регистрация (с проверкой длины пароля и подтверждением пароля)
- страница 404

## Стек
React, TypeScript, React Router, Vite, Jest, Testing Library, ESLint.

## Структура репозитория
- `apps/web` — приложение
- `packages/ui-library` — библиотека UI-компонентов

## Запуск (apps/web)
```bash
cd apps/web
npm install
npm run dev
```

## Проверки (все workspace)

Запускать из корня репозитория:
```bash
npm -ws run lint
npm -ws run test
npm -ws run build
```