import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// The gallery media (photos — e.g. imported from the firm's Google Business
// profile) lives in its own MongoDB database/cluster so it can be managed
// separately from the rest of the site content. Point GALLERY_MONGODB_URI at
// that dedicated repo; until it is created, it transparently falls back to the
// main database so nothing breaks.
const GALLERY_MONGODB_URI =
  process.env.GALLERY_MONGODB_URI ||
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/lahav-cohen-law';

export const galleryConnection = mongoose.createConnection(GALLERY_MONGODB_URI);

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
}

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'tool' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Service = mongoose.model<IService>('Service', ServiceSchema);

export interface IGalleryItem extends Document {
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

const GallerySchema = new Schema<IGalleryItem>({
  // Optional: items may be text/placeholder entries (rendered as a gradient)
  // until a real photo is uploaded.
  imageUrl: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  category: { type: String, default: 'כללי' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Bound to the dedicated gallery connection (see galleryConnection above).
export const GalleryItem = galleryConnection.model<IGalleryItem>('GalleryItem', GallerySchema);

export interface IGalleryImage extends Document {
  data: Buffer;
  contentType: string;
}

const GalleryImageSchema = new Schema<IGalleryImage>({
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
}, { timestamps: true });

// Stored alongside the gallery items in the dedicated gallery connection.
export const GalleryImage = galleryConnection.model<IGalleryImage>('GalleryImage', GalleryImageSchema);

export interface ITestimonial extends Document {
  name: string;
  text: string;
  rating: number;
  city: string;
  date: string;
  active: boolean;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  city: { type: String, default: 'אשקלון' },
  date: { type: String, default: '' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export interface IPriceItem extends Document {
  service: string;
  price: string;
  category: string;
  note: string;
  order: number;
}

const PriceSchema = new Schema<IPriceItem>({
  service: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, default: 'כללי' },
  note: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const PriceItem = mongoose.model<IPriceItem>('PriceItem', PriceSchema);

export interface IFaqItem extends Document {
  question: string;
  answer: string;
  category: string;
  order: number;
  active: boolean;
}

const FaqSchema = new Schema<IFaqItem>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'כללי' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const FaqItem = mongoose.model<IFaqItem>('FaqItem', FaqSchema);

export interface ISiteInfo extends Document {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  businessHours: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  licenseNumber: string;
  yearsExperience: number;
  projectsCompleted: number;
  happyClients: number;
}

const SiteInfoSchema = new Schema<ISiteInfo>({
  phone: { type: String, default: '072-2555516' },
  whatsapp: { type: String, default: '97272555516' },
  email: { type: String, default: 'office@lahav-cohen.co.il' },
  address: { type: String, default: 'רחוב הגדוד העברי 10, אשקלון' },
  city: { type: String, default: 'אשקלון' },
  businessHours: { type: String, default: 'ראשון-חמישי 09:00-18:00' },
  heroTitle: { type: String, default: 'להב את כהן - חברת עורכי דין' },
  heroSubtitle: { type: String, default: 'ליווי משפטי מקצועי ואישי בתחום הנזיקין, נזקי גוף, ביטוח לאומי ותביעות נכות — באשקלון והדרום' },
  aboutText: { type: String, default: 'חברת עורכי הדין להב את כהן, בראשות עו"ד ירון להב ועו"ד אסף כהן, מתמחה בדיני נזיקין ונזקי גוף: תאונות עבודה, תאונות דרכים, רשלנות רפואית, תביעות מול המוסד לביטוח לאומי, נכי צה"ל ומשרד הביטחון וחברות הביטוח. אנו מעניקים ליווי אישי, מקצועי וצמוד לכל לקוח — מהרגע הראשון ועד למיצוי מלא של הזכויות והפיצויים המגיעים לו.' },
  licenseNumber: { type: String, default: '515952208' },
  yearsExperience: { type: Number, default: 15 },
  projectsCompleted: { type: Number, default: 1000 },
  happyClients: { type: Number, default: 800 },
}, { timestamps: true });

export const SiteInfo = mongoose.model<ISiteInfo>('SiteInfo', SiteInfoSchema);

export interface IContactMessage extends Document {
  name: string;
  phone: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
