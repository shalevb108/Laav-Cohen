/**
 * Seed script — inserts the site's default content into MongoDB so the database
 * becomes the single source of truth (the frontend then reads it from the API).
 *
 * Usage:  npm run seed     (from the backend/ directory)
 *
 * It REPLACES the content collections (services, testimonials, faq, gallery,
 * site-info) with the data below. Re-running it is safe and idempotent.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {
  Service, Testimonial, FaqItem, GalleryItem, SiteInfo, galleryConnection,
} from './models/index';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lahav-cohen-law';

const services = [
  { title: 'נזקי גוף ותאונות', description: 'ייצוג נפגעי גוף מכל סוג — מהרגע הראשון ועד למיצוי מלא של הזכויות והפיצויים מול הגורמים האחראים וחברות הביטוח.', icon: 'injury', order: 1, active: true },
  { title: 'תאונות עבודה', description: 'טיפול בתביעות נפגעי תאונות עבודה מול המוסד לביטוח לאומי והמעסיק, לרבות קביעת אחוזי נכות ותביעות נזיקין נגד הגורם האחראי.', icon: 'work', order: 2, active: true },
  { title: 'תאונות דרכים', description: 'ייצוג נפגעי תאונות דרכים לפי חוק הפיצויים לנפגעי תאונות דרכים (פלת"ד) מול חברות הביטוח ו"קרנית", עד לקבלת הפיצוי המלא.', icon: 'traffic', order: 3, active: true },
  { title: 'ביטוח לאומי וועדות רפואיות', description: 'ליווי וייצוג בוועדות רפואיות של המוסד לביטוח לאומי — נכות כללית, נכות מעבודה, מחלות מקצוע ואובדן כושר עבודה.', icon: 'national', order: 4, active: true },
  { title: 'נכי צה"ל ומשרד הביטחון', description: 'הגשת תביעות וערעורים מול אגף השיקום ומשרד הביטחון, הכרה בנכות והגדלת אחוזי נכות מוכרים, לרבות זכאות לתגמולים.', icon: 'defense', order: 5, active: true },
  { title: 'רשלנות רפואית', description: 'בחינת תיקים רפואיים וייצוג נפגעי רשלנות רפואית מול בתי חולים, קופות חולים ורופאים, בליווי חוות דעת של מומחים רפואיים.', icon: 'medical', order: 6, active: true },
  { title: 'תביעות נכות ואובדן כושר עבודה', description: 'מיצוי זכויות מול חברות הביטוח בתביעות נכות, אובדן כושר עבודה וקרנות פנסיה, כולל ליווי עד לתשלום.', icon: 'disability', order: 7, active: true },
  { title: 'תביעות ביטוח ופוליסות פרט', description: 'ייצוג מבוטחים מול חברות הביטוח בתביעות על פי פוליסות פרט, ביטוחי בריאות, תאונות אישיות ותגמולים.', icon: 'insurance', order: 8, active: true },
  { title: 'תאונות ספורט ותאונות עירוניות', description: 'טיפול בנפגעי תאונות ספורט ובתביעות נגד רשויות מקומיות בגין מפגעים ונזקי גוף במרחב הציבורי.', icon: 'sport', order: 9, active: true },
];

const testimonials = [
  { name: 'יוסי כהן', text: 'נפצעתי בתאונת עבודה והמשרד ליווה אותי מול ביטוח לאומי עד לקבלת אחוזי נכות ופיצוי מלא. יחס אישי ומקצועי לאורך כל הדרך. ממליץ בחום!', rating: 5, city: 'אשקלון', date: '05/2024', active: true },
  { name: 'רחל לוי', text: 'הערעור שלי במשרד הביטחון נדחה פעם אחר פעם, ובזכות עו"ד כהן אחוזי הנכות שלי הוגדלו משמעותית. תודה על ההתמדה והמסירות!', rating: 5, city: 'קריית גת', date: '04/2024', active: true },
  { name: 'דוד אברהם', text: 'ליווי מצוין בתביעת רשלנות רפואית. הסבירו לי כל שלב, היו זמינים לכל שאלה והשיגו תוצאה מצוינת. מקצוענים אמיתיים.', rating: 5, city: 'שדרות', date: '03/2024', active: true },
  { name: 'מיכל שפירא', text: 'אחרי תאונת דרכים לא ידעתי מה מגיע לי. המשרד טיפל בכל מול חברת הביטוח והגיע לפיצוי הוגן בלי שהייתי צריכה לדאוג לכלום.', rating: 5, city: 'אופקים', date: '02/2024', active: true },
  { name: 'אבי מזרחי', text: 'ייצגו אותי בוועדה רפואית של ביטוח לאומי בצורה מרשימה. ההכנה לוועדה הייתה יסודית והתוצאה דיברה בעד עצמה. תודה רבה!', rating: 5, city: 'באר שבע', date: '01/2024', active: true },
  { name: 'שרה ביטון', text: 'יחס אנושי, זמינות מלאה ומענה מהיר בוואטסאפ לכל שאלה. הרגשתי שמלווים אותי באמת ולא רק מנהלים תיק. ממליצה בלב שלם.', rating: 5, city: 'אשקלון', date: '12/2023', active: true },
];

const faqs = [
  { question: 'האם הייעוץ הראשוני כרוך בתשלום?', answer: 'הפגישה הראשונית לבחינת התיק וזכויותיכם ניתנת ללא עלות וללא התחייבות. בפגישה נבחן יחד את נסיבות המקרה ואת סיכויי התביעה.', category: 'ייעוץ', order: 1, active: true },
  { question: 'כיצד נגבה שכר הטרחה?', answer: 'ברוב תיקי הנזיקין אנו פועלים בשיטת "ללא זכייה אין שכר טרחה" — כלומר שכר הטרחה נגבה רק בעת קבלת הפיצוי, כאחוז מהסכום שנפסק. הכל מעוגן בהסכם שקוף מראש.', category: 'שכר טרחה', order: 2, active: true },
  { question: 'כמה זמן נמשך הליך של תביעת נזיקין?', answer: 'משך ההליך משתנה בהתאם למורכבות התיק, היקף הנזק והגורם הנתבע. חלק מהתיקים מסתיימים בפשרה תוך חודשים, ואחרים מתבררים בבית המשפט לאורך זמן. נלווה אתכם ונעדכן בכל שלב.', category: 'הליך', order: 3, active: true },
  { question: 'תביעתי לביטוח לאומי נדחתה — האם ניתן לערער?', answer: 'בהחלט. ניתן להגיש ערר לוועדה הרפואית לעררים וכן לפנות לבית הדין לעבודה. אנו מייצגים מבוטחים בוועדות ובעררים ופועלים להגדלת אחוזי הנכות וההכרה.', category: 'ביטוח לאומי', order: 4, active: true },
  { question: 'נפצעתי בתאונת עבודה — מה מגיע לי?', answer: 'נפגעי תאונת עבודה עשויים להיות זכאים לדמי פגיעה, קצבת נכות מעבודה, וכן לתביעת נזיקין נגד הגורם האחראי. חשוב למצות את מלוא הזכויות מול ביטוח לאומי ומול המעסיק/המבטח.', category: 'תאונות עבודה', order: 5, active: true },
  { question: 'אני נכה צה"ל וערעורי נדחה — האם כדאי להמשיך להיאבק?', answer: 'כן. פעמים רבות ניתן להגדיל אחוזי נכות מוכרים או לקבל הכרה בפגיעה גם לאחר דחיות. ליווינו לקוחות שאחוזי הנכות שלהם הוגדלו משמעותית לאחר ערעור מול משרד הביטחון.', category: 'משרד הביטחון', order: 6, active: true },
  { question: 'באילו אזורים אתם מייצגים?', answer: 'משרדנו ממוקם באשקלון ואנו מייצגים לקוחות בכל אזור הדרום והארץ: אשקלון, קריית גת, נתיבות, שדרות, אופקים, באר שבע ואשדוד.', category: 'שירות', order: 7, active: true },
  { question: 'כיצד יוצרים קשר דחוף?', answer: 'ניתן להתקשר אלינו בשעות הפעילות או לשלוח הודעת וואטסאפ בכל עת, ונחזור אליכם בהקדם. בפניות דחופות נשתדל לתת מענה מהיר.', category: 'יצירת קשר', order: 8, active: true },
];

const galleryItems = [
  { imageUrl: '/images/gallery-1.jpeg', title: 'השותפים וצוות המשרד', description: 'עו"ד ירון להב ועו"ד אסף כהן  ', category: 'הצוות', order: 1 },
  { imageUrl: '/images/gallery-2.jpeg', title: 'עו"ד ירון להב ועו"ד אסף כהן', description: 'שותפי המשרד המייסדים', category: 'הצוות', order: 2 },
  { imageUrl: '/images/gallery-3.jpeg', title: 'יום גיבוש צוותי', description: 'טיול צוות המשרד בטבע', category: 'אירועים', order: 3 },
  { imageUrl: '/images/gallery-4.jpeg', title: 'צוות המשרד', description: 'עורכי הדין והצוות המשפטי במשרד', category: 'הצוות', order: 4 },
  { imageUrl: '/images/gallery-5.jpeg', title: 'צוות המשרד המלא', description: 'כל צוות חברת עורכי הדין להב את כהן', category: 'הצוות', order: 5 },
  { imageUrl: '/images/gallery-6.jpeg', title: 'חלק מצוות המשרד', description: 'עורכי דין ואנשי צוות בכניסה למשרד', category: 'הצוות', order: 6 },
  { imageUrl: '/images/gallery-7.jpeg', title: 'השותפים המייסדים', description: 'עו"ד ירון להב ועו"ד אסף כהן', category: 'הצוות', order: 7 },
  { imageUrl: '/images/gallery-8.jpeg', title: 'אזור הקבלה', description: 'דלפק הקבלה וחדרי המשרד', category: 'המשרד', order: 8 },
  { imageUrl: '/images/gallery-9.jpeg', title: 'פינת ההמתנה', description: 'אזור ההמתנה ללקוחות במשרד', category: 'המשרד', order: 9 },
];

const siteInfo = {
  phone: '072-2555516',
  whatsapp: '97272555516',
  email: 'office@lahav-cohen.co.il',
  address: 'רחוב הגדוד העברי 10, אשקלון',
  city: 'אשקלון',
  businessHours: 'ראשון-חמישי 09:00-18:00',
  heroTitle: 'להב את כהן - חברת עורכי דין',
  heroSubtitle: 'ליווי משפטי מקצועי ואישי בתחום הנזיקין, נזקי גוף, ביטוח לאומי ותביעות נכות — באשקלון והדרום',
  aboutText: 'חברת עורכי הדין להב את כהן, בראשות עו"ד ירון להב ועו"ד אסף כהן, מתמחה בדיני נזיקין ונזקי גוף: תאונות עבודה, תאונות דרכים, רשלנות רפואית, תביעות מול המוסד לביטוח לאומי, נכי צה"ל ומשרד הביטחון וחברות הביטוח. אנו מעניקים ליווי אישי, מקצועי וצמוד לכל לקוח — מהרגע הראשון ועד למיצוי מלא של הזכויות והפיצויים המגיעים לו.',
  licenseNumber: '515952208',
  yearsExperience: 15,
  projectsCompleted: 1000,
  happyClients: 800,
};

async function seed() {
  console.log('מתחבר למסד הנתונים...');
  await mongoose.connect(MONGODB_URI);
  await galleryConnection.asPromise();
  console.log('✓ מחובר');

  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log(`✓ ${services.length} תחומי התמחות`);

  await Testimonial.deleteMany({});
  await Testimonial.insertMany(testimonials);
  console.log(`✓ ${testimonials.length} המלצות`);

  await FaqItem.deleteMany({});
  await FaqItem.insertMany(faqs);
  console.log(`✓ ${faqs.length} שאלות נפוצות`);

  await GalleryItem.deleteMany({});
  await GalleryItem.insertMany(galleryItems);
  console.log(`✓ ${galleryItems.length} פריטי גלריה`);

  await SiteInfo.deleteMany({});
  await SiteInfo.create(siteInfo);
  console.log('✓ הגדרות אתר');

  await mongoose.disconnect();
  await galleryConnection.close();
  console.log('הסתיים בהצלחה! 🎉');
  process.exit(0);
}

seed().catch((err) => {
  console.error('שגיאה ב-seed:', err);
  process.exit(1);
});
