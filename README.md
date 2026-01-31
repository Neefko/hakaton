# 🚀 Hakaton

Добро пожаловать в репозиторий **Hakaton** — многофункциональный проект, объединяющий несколько компонентов для хакатон‑разработки: API, фронтенд на Tauri, сайт на Flask и мобильные фичи. Этот проект является стартовой базой для командных проектов и быстрого прототипирования.  

---

## 🧠 О проекте

**Hakaton** — сборник сервисов для участия в хакатонах и прототипирования MVP.  
Репозиторий включает:

- 📡 hakatonAPI — backend API на Python/Flask  
- 🪟 hakatonSiteFlask — веб‑сайт на Flask  
- 🧰 hakatonCapacitor — кроссплатформенное мобильное приложение  
- 🌀 hakatonTauri — десктоп-приложение на Tauri  
- ⚙️ CI/CD и автоматизация сборок

Проект использует смешанный стек: **Python, JavaScript, HTML, CSS, Rust** (через Tauri).  

---

## 📦 Структура репозитория

- .github/workflows — CI/CD и автоматизация  
- hakatonAPI — Backend API  
- hakatonCapacitor — Мобильный модуль  
- hakatonSiteFlask — Веб-сайт на Flask  
- hakatonTauri — Десктоп-приложение на Tauri  
- .gitignore  
- README.md — Этот файл

---

## 🚀 Установка & Запуск

1. Клонируйте репозиторий:  
```
   git clone https://github.com/Neefko/hakaton.git  
   cd hakaton
   ```

2. Запуск API:  
```
   cd hakatonAPI  
   pip install -r requirements.txt  
   python app.py
   ```

3. Запуск сайта:  
```
   cd ../hakatonSiteFlask  
   pip install -r requirements.txt  
   flask run
   ```

4. Запуск Tauri (десктоп):  
```
   cd ../hakatonTauri  
   yarn install  
   yarn tauri dev
   ```

5. Запуск Capacitor (мобильный):  
```
   cd ../hakatonCapacitor  
   npm install  
   npx cap open
   ```

---

## 💡 Возможности

- Быстрый старт MVP для хакатонов  
- Использование компонентов по отдельности  
- Расширение функционала и участие в Open Source  

---

## 🤝 Вклад в проект

1. Создайте fork репозитория  
2. Создайте ветку с фичей (feature/awesome)  
3. Внесите код и улучшения  
4. Сделайте pull request  

Обсуждения и идеи оформляйте через Issues или Discussions на GitHub.

---

## 📜 Лицензия

Проект использует лицензию MIT.
