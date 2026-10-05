import { useEffect, useState } from 'react';
import {
  BankOutlined, CarOutlined, MedicineBoxOutlined,
  SafetyCertificateOutlined, SafetyOutlined, FileProtectOutlined,
  SolutionOutlined, ToolOutlined, ThunderboltOutlined, PhoneOutlined,
} from '@ant-design/icons';
import type { Service } from '../types';
import { getServices } from '../services/api';
import { useSiteInfo } from '../context/SiteInfoContext';
import styles from './Services.module.scss';

const defaults: Service[] = [
  { _id: '1', title: 'נזקי גוף ותאונות', description: 'ייצוג נפגעי גוף מכל סוג — מהרגע הראשון ועד למיצוי מלא של הזכויות והפיצויים מול הגורמים האחראים וחברות הביטוח.', icon: 'injury', order: 1, active: true },
  { _id: '2', title: 'תאונות עבודה', description: 'טיפול בתביעות נפגעי תאונות עבודה מול המוסד לביטוח לאומי והמעסיק, לרבות קביעת אחוזי נכות ותביעות נזיקין נגד הגורם האחראי.', icon: 'work', order: 2, active: true },
  { _id: '3', title: 'תאונות דרכים', description: 'ייצוג נפגעי תאונות דרכים לפי חוק הפיצויים לנפגעי תאונות דרכים (פלת"ד) מול חברות הביטוח ו"קרנית", עד לקבלת הפיצוי המלא.', icon: 'traffic', order: 3, active: true },
  { _id: '4', title: 'ביטוח לאומי וועדות רפואיות', description: 'ליווי וייצוג בוועדות רפואיות של המוסד לביטוח לאומי — נכות כללית, נכות מעבודה, מחלות מקצוע ואובדן כושר עבודה.', icon: 'national', order: 4, active: true },
  { _id: '5', title: 'נכי צה"ל ומשרד הביטחון', description: 'הגשת תביעות וערעורים מול אגף השיקום ומשרד הביטחון, הכרה בנכות והגדלת אחוזי נכות מוכרים, לרבות זכאות לתגמולים.', icon: 'defense', order: 5, active: true },
  { _id: '6', title: 'רשלנות רפואית', description: 'בחינת תיקים רפואיים וייצוג נפגעי רשלנות רפואית מול בתי חולים, קופות חולים ורופאים, בליווי חוות דעת של מומחים רפואיים.', icon: 'medical', order: 6, active: true },
  { _id: '7', title: 'תביעות נכות ואובדן כושר עבודה', description: 'מיצוי זכויות מול חברות הביטוח בתביעות נכות, אובדן כושר עבודה וקרנות פנסיה, כולל ליווי עד לתשלום.', icon: 'disability', order: 7, active: true },
  { _id: '8', title: 'תביעות ביטוח ופוליסות פרט', description: 'ייצוג מבוטחים מול חברות הביטוח בתביעות על פי פוליסות פרט, ביטוחי בריאות, תאונות אישיות ותגמולים.', icon: 'insurance', order: 8, active: true },
  { _id: '9', title: 'תאונות ספורט ותאונות עירוניות', description: 'טיפול בנפגעי תאונות ספורט ובתביעות נגד רשויות מקומיות בגין מפגעים ונזקי גוף במרחב הציבורי.', icon: 'sport', order: 9, active: true },
];

const iconMap: Record<string, React.ReactNode> = {
  injury: <SafetyCertificateOutlined />,
  work: <ToolOutlined />,
  traffic: <CarOutlined />,
  national: <BankOutlined />,
  defense: <SafetyOutlined />,
  medical: <MedicineBoxOutlined />,
  disability: <FileProtectOutlined />,
  insurance: <SolutionOutlined />,
  sport: <ThunderboltOutlined />,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>(defaults);
  const info = useSiteInfo();

  useEffect(() => {
    getServices().then(d => { if (d.length > 0) setServices(d); }).catch(() => {});
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>תחומי <span>ההתמחות</span></h1>
          <p>ליווי משפטי מקצועי בדיני נזיקין ונזקי גוף — באשקלון וכל אזור הדרום</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {services.map((s) => (
            <div key={s._id} className={styles.card}>
              <div className={styles.icon}>
                {iconMap[s.icon] || <BankOutlined />}
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <a href={`tel:${info.phone}`} className={styles.callBtn}>
                <PhoneOutlined /> התקשרו לייעוץ
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>זקוקים לייעוץ משפטי?</h2>
        <a href={`tel:${info.phone}`}>
          <PhoneOutlined /> {info.phone} - התקשרו עכשיו
        </a>
      </section>
    </>
  );
}
