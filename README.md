# להב את כהן — חברת עורכי דין

אתר תדמית מלא לחברת עורכי הדין **להב את כהן** (נזיקין ונזקי גוף, אשקלון), כולל ממשק ניהול.

## מבנה הפרויקט

```
template/
├── frontend/    # React + Vite + TypeScript + SCSS + Ant Design
└── backend/     # Node.js + Express + MongoDB + TypeScript
```

## דרישות מוקדמות

- Node.js 18+
- MongoDB (מקומי או MongoDB Atlas)

## התקנה והפעלה

### Backend

```bash
cd backend
npm install
# ערוך את קובץ .env לפי הצורך
npm run dev
```

השרת יעלה על פורט 5000.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

האתר יעלה על http://localhost:5173

## משתני סביבה (backend/.env)

| משתנה | תיאור | ברירת מחדל |
|-------|-------|------------|
| `MONGODB_URI` | כתובת MongoDB הראשית | `mongodb://localhost:27017/lahav-cohen-law` |
| `GALLERY_MONGODB_URI` | כתובת MongoDB נפרדת לגלריית התמונות. אם ריק — נעשה שימוש ב-`MONGODB_URI` | *(ריק)* |
| `ADMIN_PASSWORD` | סיסמת מנהל | `admin123` |
| `JWT_SECRET` | מפתח JWT | `lahav-cohen-super-secret-jwt-key-2024` |
| `PORT` | פורט שרת | `5000` |
| `FRONTEND_URL` | URL הפרונטאנד (CORS) | `http://localhost:5173` |

> **גלריה במסד נפרד:** פריטי הגלריה והתמונות נשמרים בחיבור MongoDB נפרד (`galleryConnection`),
> כך שניתן לנהל אותם במסד/קלאסטר ייעודי. להצבעה על מסד הגלריה שייווצר בהמשך — הגדירו את
> `GALLERY_MONGODB_URI`. עד אז החיבור נופל חזרה אוטומטית ל-`MONGODB_URI` ושום דבר לא נשבר.

## גישה לפאנל הניהול

- כתובת: http://localhost:5173/admin/login
- סיסמה: ערך `ADMIN_PASSWORD` ב-.env

## תכונות

### פרונטאנד
- דף הבית עם Hero, סטטיסטיקות, תחומי התמחות, ו-CTA
- עמוד תחומי התמחות (נזיקין, תאונות עבודה/דרכים, ביטוח לאומי, נכי צה"ל, רשלנות רפואית ועוד)
- גלריה עם סינון קטגוריות ו-Lightbox (נתונים ממסד נפרד)
- עמוד אודות עם סיפור המשרד והשותפים
- המלצות לקוחות עם דירוג כוכבים
- שאלות נפוצות עם accordion
- טופס יצירת קשר עם ולידציה
- כפתור WhatsApp צף
- תמיכה מלאה ב-RTL עברית

### פאנל ניהול
- ניהול תחומי התמחות (CRUD)
- ניהול גלריה (CRUD)
- ניהול המלצות (CRUD)
- ניהול שאלות נפוצות (CRUD)
- הגדרות אתר (טלפון, אימייל, טקסטים)
- צפייה ומחיקת הודעות מטופס יצירת קשר

## Build לפרודקשן

```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```
