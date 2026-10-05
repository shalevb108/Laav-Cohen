/**
 * Gallery-only update — replaces the gallery collection with the team/office
 * photos bundled in the frontend (frontend/public/images/gallery-*.jpeg).
 * Does NOT touch services / testimonials / faq / site-info.
 *
 * Usage:  npm run update-gallery     (from the backend/ directory)
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { GalleryItem, galleryConnection } from './models/index';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lahav-cohen-law';

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

async function run() {
  console.log('מתחבר למסד הנתונים...');
  await mongoose.connect(MONGODB_URI);
  await galleryConnection.asPromise();

  await GalleryItem.deleteMany({});
  await GalleryItem.insertMany(galleryItems);
  console.log(`✓ ${galleryItems.length} פריטי גלריה עודכנו עם תמונות`);

  await mongoose.disconnect();
  await galleryConnection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('שגיאה:', err);
  process.exit(1);
});
