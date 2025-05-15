# 🎧 Tune Manager

**Tune Manager** — це веб-додаток для керування музичними треками, створений як тестове завдання для відбору на курс **Genesis Frontend**.

---

## 🔑 Основні можливості

- 🔍 Пошук треків за назвою, артистом і жанром
- 🎶 Створення, редагування, видалення треків
- 📤 Завантаження/заміна аудіофайлів
- ▶️ Кастомний аудіоплеєр з контролем гучності, перемоткою, чергою відтворення
- 📱 Повна адаптивність (десктоп/мобільні пристрої)
- 📂 Пагінація списку треків
- 🖼️ Fallback-зображення при відсутності обкладинки

---

## ⚙️ Технології

- **React + TypeScript**
- `react-player` — для відтворення аудіо
- React Context API — глобальний стан плеєра
- React router - маршрутизація
- SCSS Modules

---

## 📁 Робота з аудіофайлами

У поточній версії функціонал завантаження, оновлення та видалення аудіофайлів (`audioFile`) реалізовано **локально**.

> Якщо у вас є бекенд із відповідними ендпоінтами — розкоментуйте рядки з `TrackService.uploadTrackFile` та `TrackService.removeAudioFile` у коді, щоб увімкнути повноцінну інтеграцію.

---

## 🖼️ Інтерфейс

![img_4.png](public/img_4.png)

![img_3.png](public/img_3.png)

![img_5.png](public/img_5.png)

![img_6.png](public/img_6.png)

![img_7.png](public/img_7.png)

![img_8.png](public/img_8.png)

![img_9.png](public/img_9.png)

![img_10.png](public/img_10.png)

![img_11.png](public/img_11.png)

![img_12.png](public/img_12.png)

**Планшети / Телефони**

![img_13.png](public/img_13.png)

![img_14.png](public/img_14.png)

![img_15.png](public/img_15.png)