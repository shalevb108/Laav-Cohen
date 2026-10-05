import { useEffect, useState } from 'react';
import { Rate } from 'antd';
import type { Testimonial } from '../types';
import { getTestimonials } from '../services/api';
import styles from './Testimonials.module.scss';

// NOTE: These are representative placeholder reviews based on the firm's real
// areas of practice. Replace them with the actual Google Maps reviews via the
// admin panel (ניהול המלצות) once the live review text is available.
const defaults: Testimonial[] = [
  { _id: '1', name: 'יוסי כהן', text: 'נפצעתי בתאונת עבודה והמשרד ליווה אותי מול ביטוח לאומי עד לקבלת אחוזי נכות ופיצוי מלא. יחס אישי ומקצועי לאורך כל הדרך. ממליץ בחום!', rating: 5, city: 'אשקלון', date: '05/2024', active: true },
  { _id: '2', name: 'רחל לוי', text: 'הערעור שלי במשרד הביטחון נדחה פעם אחר פעם, ובזכות עו"ד כהן אחוזי הנכות שלי הוגדלו משמעותית. תודה על ההתמדה והמסירות!', rating: 5, city: 'קריית גת', date: '04/2024', active: true },
  { _id: '3', name: 'דוד אברהם', text: 'ליווי מצוין בתביעת רשלנות רפואית. הסבירו לי כל שלב, היו זמינים לכל שאלה והשיגו תוצאה מצוינת. מקצוענים אמיתיים.', rating: 5, city: 'שדרות', date: '03/2024', active: true },
  { _id: '4', name: 'מיכל שפירא', text: 'אחרי תאונת דרכים לא ידעתי מה מגיע לי. המשרד טיפל בכל מול חברת הביטוח והגיע לפיצוי הוגן בלי שהייתי צריכה לדאוג לכלום.', rating: 5, city: 'אופקים', date: '02/2024', active: true },
  { _id: '5', name: 'אבי מזרחי', text: 'ייצגו אותי בוועדה רפואית של ביטוח לאומי בצורה מרשימה. ההכנה לוועדה הייתה יסודית והתוצאה דיברה בעד עצמה. תודה רבה!', rating: 5, city: 'באר שבע', date: '01/2024', active: true },
  { _id: '6', name: 'שרה ביטון', text: 'יחס אנושי, זמינות מלאה ומענה מהיר בוואטסאפ לכל שאלה. הרגשתי שמלווים אותי באמת ולא רק מנהלים תיק. ממליצה בלב שלם.', rating: 5, city: 'אשקלון', date: '12/2023', active: true },
];

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(defaults);

  useEffect(() => {
    getTestimonials().then(d => { if (d.length > 0) setItems(d); }).catch(() => {});
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <h1>המלצות <span>לקוחות</span></h1>
        <p>מה אומרים עלינו הלקוחות שליווינו</p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {items.map((t) => (
            <div key={t._id} className={styles.card}>
              <div className={styles.stars}>
                <Rate disabled defaultValue={t.rating} />
              </div>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.name[0]}</div>
                <div className={styles.info}>
                  <h4>{t.name}</h4>
                  <span>{t.city}</span>
                </div>
                {t.date && <span className={styles.date}>{t.date}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.summary}>
        <h2>הנתונים שמספרים הכל</h2>
        <div className={styles.sumGrid}>
          <div className={styles.sumItem}>
            <span className={styles.num}>1000+</span>
            <span className={styles.lbl}>תיקים שטופלו</span>
          </div>
          <div className={styles.sumItem}>
            <span className={styles.num}>5⭐</span>
            <span className={styles.lbl}>דירוג ממוצע בגוגל</span>
          </div>
          <div className={styles.sumItem}>
            <span className={styles.num}>15+</span>
            <span className={styles.lbl}>שנות ניסיון</span>
          </div>
        </div>
      </section>
    </>
  );
}
