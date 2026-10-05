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
  { imageUrl: '/images/gallery-1.jpeg', title: 'צוות להב את כהן', description: 'הצוות של חברת עורכי הדין', category: 'הצוות', order: 1 },
  { imageUrl: '/images/gallery-2.jpeg', title: 'הצוות שלנו', description: 'עורכי הדין והצוות המשפטי', category: 'הצוות', order: 2 },
  { imageUrl: '/images/gallery-3.jpeg', title: 'מפגש צוות', description: 'מהפעילות של המשרד', category: 'אירועים', order: 3 },
  { imageUrl: '/images/gallery-4.jpeg', title: 'אירוע משרדי', description: 'גיבוש צוות המשרד', category: 'אירועים', order: 4 },
  { imageUrl: '/images/gallery-5.jpeg', title: 'יום צוותי', description: 'מהפעילות של המשרד', category: 'אירועים', order: 5 },
  { imageUrl: '/images/gallery-6.jpeg', title: 'הצוות המשפטי', description: 'עורכי הדין והצוות של המשרד', category: 'הצוות', order: 6 },
  { imageUrl: '/images/gallery-7.jpeg', title: 'מאחורי הקלעים', description: 'מהיום-יום של המשרד', category: 'אירועים', order: 7 },
  { imageUrl: '/images/gallery-8.jpeg', title: 'צוות המשרד', description: 'הצוות של חברת עורכי הדין', category: 'הצוות', order: 8 },
  { imageUrl: '/images/gallery-9.jpeg', title: 'גיבוש צוות', description: 'מהפעילות של המשרד', category: 'אירועים', order: 9 },
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
