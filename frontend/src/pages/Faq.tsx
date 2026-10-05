import { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import type { FaqItem } from '../types';
import { getFaq } from '../services/api';
import { useSiteInfo } from '../context/SiteInfoContext';
import styles from './Faq.module.scss';

const defaults: FaqItem[] = [
  { _id: '1', question: 'האם הייעוץ הראשוני כרוך בתשלום?', answer: 'הפגישה הראשונית לבחינת התיק וזכויותיכם ניתנת ללא עלות וללא התחייבות. בפגישה נבחן יחד את נסיבות המקרה ואת סיכויי התביעה.', category: 'ייעוץ', order: 1, active: true },
  { _id: '2', question: 'כיצד נגבה שכר הטרחה?', answer: 'ברוב תיקי הנזיקין אנו פועלים בשיטת "ללא זכייה אין שכר טרחה" — כלומר שכר הטרחה נגבה רק בעת קבלת הפיצוי, כאחוז מהסכום שנפסק. הכל מעוגן בהסכם שקוף מראש.', category: 'שכר טרחה', order: 2, active: true },
  { _id: '3', question: 'כמה זמן נמשך הליך של תביעת נזיקין?', answer: 'משך ההליך משתנה בהתאם למורכבות התיק, היקף הנזק והגורם הנתבע. חלק מהתיקים מסתיימים בפשרה תוך חודשים, ואחרים מתבררים בבית המשפט לאורך זמן. נלווה אתכם ונעדכן בכל שלב.', category: 'הליך', order: 3, active: true },
  { _id: '4', question: 'תביעתי לביטוח לאומי נדחתה — האם ניתן לערער?', answer: 'בהחלט. ניתן להגיש ערר לוועדה הרפואית לעררים וכן לפנות לבית הדין לעבודה. אנו מייצגים מבוטחים בוועדות ובעררים ופועלים להגדלת אחוזי הנכות וההכרה.', category: 'ביטוח לאומי', order: 4, active: true },
  { _id: '5', question: 'נפצעתי בתאונת עבודה — מה מגיע לי?', answer: 'נפגעי תאונת עבודה עשויים להיות זכאים לדמי פגיעה, קצבת נכות מעבודה, וכן לתביעת נזיקין נגד הגורם האחראי. חשוב למצות את מלוא הזכויות מול ביטוח לאומי ומול המעסיק/המבטח.', category: 'תאונות עבודה', order: 5, active: true },
  { _id: '6', question: 'אני נכה צה"ל וערעורי נדחה — האם כדאי להמשיך להיאבק?', answer: 'כן. פעמים רבות ניתן להגדיל אחוזי נכות מוכרים או לקבל הכרה בפגיעה גם לאחר דחיות. ליווינו לקוחות שאחוזי הנכות שלהם הוגדלו משמעותית לאחר ערעור מול משרד הביטחון.', category: 'משרד הביטחון', order: 6, active: true },
  { _id: '7', question: 'באילו אזורים אתם מייצגים?', answer: 'משרדנו ממוקם באשקלון ואנו מייצגים לקוחות בכל אזור הדרום והארץ: אשקלון, קריית גת, נתיבות, שדרות, אופקים, באר שבע ואשדוד.', category: 'שירות', order: 7, active: true },
  { _id: '8', question: 'כיצד יוצרים קשר דחוף?', answer: 'ניתן להתקשר אלינו בשעות הפעילות או לשלוח הודעת וואטסאפ בכל עת, ונחזור אליכם בהקדם. בפניות דחופות נשתדל לתת מענה מהיר.', category: 'יצירת קשר', order: 8, active: true },
];

export default function Faq() {
  const [items, setItems] = useState<FaqItem[]>(defaults);
  const info = useSiteInfo();

  useEffect(() => {
    getFaq().then(d => { if (d.length > 0) setItems(d); }).catch(() => {});
  }, []);

  const collapseItems = items.map(item => ({
    key: item._id,
    label: item.question,
    children: <p>{item.answer}</p>,
  }));

  return (
    <>
      <section className={styles.hero}>
        <h1>שאלות <span>נפוצות</span></h1>
        <p>תשובות לשאלות הנפוצות ביותר שאנו מקבלים מלקוחותינו</p>
      </section>

      <section className={styles.section}>
        <div className={styles.layout}>
          <div className={styles.accordion}>
            <Collapse
              items={collapseItems}
              accordion
              expandIconPosition="start"
            />
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3>אזורי שירות</h3>
              <ul>
                {['אשקלון', 'קריית גת', 'נתיבות', 'שדרות', 'אופקים', 'באר שבע', 'יבנה', 'אשדוד'].map(city => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>

            <div className={styles.sideCard}>
              <h3>שעות פעילות</h3>
              <p>{info.businessHours}</p>
              <p style={{ marginTop: 8, color: '#0F2A4A', fontWeight: 600 }}>
                מענה בוואטסאפ גם מעבר לשעות הפעילות
              </p>
            </div>

            <div className={styles.ctaCard}>
              <h3>לא מצאתם תשובה?</h3>
              <p>פשוט התקשרו אלינו ונשמח לעזור</p>
              <a href={`tel:${info.phone}`}>
                <PhoneOutlined /> {info.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
