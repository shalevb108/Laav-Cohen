import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PhoneOutlined, BankOutlined, CarOutlined,
  CheckCircleOutlined, StarFilled, SafetyCertificateOutlined,
  SafetyOutlined, MedicineBoxOutlined, FileProtectOutlined,
  SolutionOutlined, ToolOutlined, ThunderboltOutlined,
  ClockCircleOutlined, TeamOutlined, TrophyOutlined,
} from '@ant-design/icons';
import type { Service, Testimonial } from '../types';
import { getServices, getTestimonials } from '../services/api';
import { useSiteInfo } from '../context/SiteInfoContext';
import styles from './Home.module.scss';

const defaultServices: Service[] = [
  { _id: '1', title: 'נזקי גוף ותאונות', description: 'ייצוג נפגעי גוף מכל סוג — מיצוי מלא של הזכויות והפיצויים מול הגורמים האחראים וחברות הביטוח.', icon: 'injury', order: 1, active: true },
  { _id: '2', title: 'תאונות עבודה', description: 'טיפול בתביעות נפגעי תאונות עבודה מול המוסד לביטוח לאומי והמעסיק, כולל קביעת אחוזי נכות.', icon: 'work', order: 2, active: true },
  { _id: '3', title: 'תאונות דרכים', description: 'ייצוג נפגעי תאונות דרכים לפי חוק הפלת"ד מול חברות הביטוח ו"קרנית", עד לפיצוי המלא.', icon: 'traffic', order: 3, active: true },
  { _id: '4', title: 'ביטוח לאומי וועדות רפואיות', description: 'ליווי וייצוג בוועדות רפואיות של ביטוח לאומי — נכות כללית, נכות מעבודה ומחלות מקצוע.', icon: 'national', order: 4, active: true },
  { _id: '5', title: 'נכי צה"ל ומשרד הביטחון', description: 'הגשת תביעות וערעורים מול אגף השיקום ומשרד הביטחון, והגדלת אחוזי נכות מוכרים.', icon: 'defense', order: 5, active: true },
  { _id: '6', title: 'רשלנות רפואית', description: 'בחינת תיקים רפואיים וייצוג נפגעי רשלנות רפואית מול מוסדות ורופאים, בליווי חוות דעת מומחים.', icon: 'medical', order: 6, active: true },
];

const defaultTestimonials: Testimonial[] = [
  { _id: '1', name: 'יוסי כהן', text: 'נפצעתי בתאונת עבודה והמשרד ליווה אותי מול ביטוח לאומי עד לקבלת אחוזי נכות ופיצוי מלא. יחס אישי ומקצועי לאורך כל הדרך.', rating: 5, city: 'אשקלון', date: '2024-05', active: true },
  { _id: '2', name: 'רחל לוי', text: 'הערעור שלי במשרד הביטחון נדחה פעם אחר פעם, ובזכות עו"ד כהן אחוזי הנכות שלי הוגדלו משמעותית. תודה על ההתמדה והמסירות!', rating: 5, city: 'קריית גת', date: '2024-04', active: true },
  { _id: '3', name: 'דוד אברהם', text: 'ליווי מצוין בתביעת רשלנות רפואית. הסבירו לי כל שלב, היו זמינים לכל שאלה והשיגו תוצאה מצוינת. ממליץ בחום!', rating: 5, city: 'שדרות', date: '2024-03', active: true },
];

const serviceIcons: Record<string, React.ReactNode> = {
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

export default function Home() {
  const navigate = useNavigate();
  const info = useSiteInfo();
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  // heroTitle may be "name - tagline"; show the tagline as the accent line.
  const [heroMain, ...heroRest] = info.heroTitle.split(' - ');
  const heroAccent = heroRest.join(' - ');

  useEffect(() => {
    getServices().then(d => { if (d.length > 0) setServices(d); }).catch(() => {});
    getTestimonials().then(d => { if (d.length > 0) setTestimonials(d.slice(0, 3)); }).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <SafetyCertificateOutlined />
            חברי לשכת עורכי הדין בישראל
          </div>
          <h1 className={styles.heroTitle}>
            {heroMain}
            {heroAccent && <span>{heroAccent}</span>}
          </h1>
          <p className={styles.heroSubtitle}>
            {info.heroSubtitle}
          </p>
          <div className={styles.heroActions}>
            <a href={`tel:${info.phone}`} className={styles.heroBtnPrimary}>
              <PhoneOutlined /> התקשרו עכשיו
            </a>
            <button className={styles.heroBtnSecondary} onClick={() => navigate('/services')}>
              <BankOutlined /> תחומי ההתמחות
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{info.yearsExperience}<span className={styles.statSuffix}>+</span></span>
            <span className={styles.statLabel}>שנות ניסיון</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{info.projectsCompleted}<span className={styles.statSuffix}>+</span></span>
            <span className={styles.statLabel}>תיקים שטופלו</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <h2 className="section-title">
            <span>תחומי</span> ההתמחות שלנו
          </h2>
          <p className="section-subtitle">מגוון תחומי התמחות משפטיים בדיני נזיקין ונזקי גוף</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.slice(0, 6).map((s) => (
            <div key={s._id} className={styles.serviceCard} onClick={() => navigate('/services')}>
              <div className={styles.cardIcon}>
                {serviceIcons[s.icon] || <BankOutlined />}
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className={styles.whyUs}>
        <div className={styles.whyGrid}>
          <div className={styles.whyContent}>
            <h2>למה לבחור ב<span>להב את כהן</span>?</h2>
            <p>
              עם ניסיון משולב של שנים רבות בתחום הנזיקין, אנו מלווים את לקוחותינו ביד מקצועית ואישית — מהגשת התביעה ועד למיצוי מלא של הפיצויים המגיעים להם.
            </p>
            <ul className={styles.whyList}>
              {[
                { title: 'ללא זכייה אין שכר טרחה', desc: 'בתיקי נזיקין — שכר הטרחה משולם רק לאחר קבלת הפיצוי', icon: <SafetyCertificateOutlined /> },
                { title: 'ייעוץ ראשוני ללא התחייבות', desc: 'פגישת ייעוץ ראשונה לבחינת זכויותיכם, ללא עלות', icon: <CheckCircleOutlined /> },
                { title: 'ליווי אישי וצמוד', desc: 'זמינים עבורכם לאורך כל הדרך, כולל מענה בוואטסאפ', icon: <TeamOutlined /> },
                { title: 'ניסיון וותק', desc: 'שנים מול ביטוח לאומי, משרד הביטחון וחברות הביטוח', icon: <TrophyOutlined /> },
              ].map((item, i) => (
                <li key={i} className={styles.whyItem}>
                  <div className={styles.checkIcon}>{item.icon}</div>
                  <div className={styles.whyText}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.whyImageBox}>
            <div className={styles.bigIcon}><BankOutlined /></div>
            <h3>להב את כהן - חברת עורכי דין</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
              ח.פ {info.licenseNumber}<br />
              חברי לשכת עורכי הדין בישראל
            </p>
            <div className={styles.statsInner}>
              <div className={styles.innerStat}>
                <div className={styles.num}>{info.yearsExperience}+</div>
                <div className={styles.lbl}>שנות ניסיון</div>
              </div>
              <div className={styles.innerStat}>
                <div className={styles.num}>{info.projectsCompleted}+</div>
                <div className={styles.lbl}>תיקים</div>
              </div>
              <div className={styles.innerStat}>
                <div className={styles.num}>5⭐</div>
                <div className={styles.lbl}>דירוג בגוגל</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <h2 className="section-title">מה אומרים עלינו <span>הלקוחות</span>?</h2>
          <p className="section-subtitle">לקוחותינו מספרים על הליווי המשפטי שקיבלו</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t) => (
            <div key={t._id} className={styles.testimonialCard}>
              <div className={styles.stars}>
                {Array.from({ length: t.rating }, (_, i) => <StarFilled key={i} />)}
              </div>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.name[0]}</div>
                <div className={styles.info}>
                  <h4>{t.name}</h4>
                  <span>{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2>זקוקים לייעוץ משפטי?</h2>
          <p>
            פנו אלינו לפגישת ייעוץ ראשונית וללא התחייבות — נשמח לבחון את זכויותיכם.
          </p>
          <a href={`tel:${info.phone}`} className={styles.ctaBtn}>
            <PhoneOutlined /> <ClockCircleOutlined /> {info.phone}
          </a>
        </div>
      </section>
    </>
  );
}
