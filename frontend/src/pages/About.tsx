import {
  SafetyCertificateOutlined, StarOutlined, ThunderboltOutlined,
  HeartOutlined, TeamOutlined, ClockCircleOutlined, CheckCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useSiteInfo } from '../context/SiteInfoContext';
import styles from './About.module.scss';

export default function About() {
  const info = useSiteInfo();

  return (
    <>
      <section className={styles.hero}>
        <h1>אודות <span>להב את כהן</span></h1>
        <p>הכירו את חברת עורכי הדין שלכם</p>
      </section>

      <section className={styles.bio}>
        <div className={styles.bioGrid}>
          <div className={styles.bioImage}>
            <img
              src="/images/logo.jpeg"
              alt="צוות חברת עורכי הדין להב את כהן"
              className={styles.teamPhoto}
            />
            <h2>להב את כהן</h2>
            <p className={styles.role}>חברת עורכי דין לנזיקין ונזקי גוף</p>
            <div className={styles.badges}>
              <span className={styles.badge}>נזיקין</span>
              <span className={styles.badge}>ביטוח לאומי</span>
              <span className={styles.badge}>נכי צה"ל</span>
              <span className={styles.badge}>אשקלון</span>
            </div>
          </div>

          <div className={styles.bioContent}>
            <h2>מי אנחנו <span>ולמה לבחור בנו</span>?</h2>
            <p>{info.aboutText}</p>
            <p>
              המשרד נוסד בשנת 2019 מתוך מיזוג ניסיונם של עו"ד ירון להב ועו"ד אסף כהן, ומאז צמח לחברת עורכי דין מובילה בתחום הנזיקין בדרום. אנו מתמחים בייצוג נפגעי גוף מול המוסד לביטוח לאומי, משרד הביטחון וחברות הביטוח, ומלווים כל לקוח ביחס אישי עד למיצוי מלא של זכויותיו.
            </p>

            <div className={styles.credentials}>
              {[
                { icon: <SafetyCertificateOutlined />, text: 'חברי לשכת עורכי הדין בישראל' },
                { icon: <TrophyOutlined />, text: `ניסיון משולב של מעל ${info.yearsExperience} שנה בדיני נזיקין` },
                { icon: <CheckCircleOutlined />, text: 'ליווי אישי וצמוד בכל שלבי התביעה' },
                { icon: <StarOutlined />, text: 'דירוג 5 כוכבים מלקוחות בגוגל' },
              ].map((c, i) => (
                <div key={i} className={styles.credItem}>
                  <span className={styles.icon}>{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">המספרים <span>מדברים</span></h2>
        </div>
        <div className={styles.statsGrid}>
          {[
            { num: info.yearsExperience, suf: '+', lbl: 'שנות ניסיון' },
            { num: info.projectsCompleted, suf: '+', lbl: 'תיקים שטופלו' },
          ].map((s, i) => (
            <div key={i} className={styles.statCard}>
              <span className={styles.num}>{s.num}<span className={styles.suf}>{s.suf}</span></span>
              <span className={styles.lbl}>{s.lbl}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.values}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">הערכים <span>שלנו</span></h2>
        </div>
        <div className={styles.valuesGrid}>
          {[
            { icon: <ThunderboltOutlined />, title: 'מקצועיות ללא פשרות', desc: 'ידע משפטי מעמיק וליווי צמוד בכל תיק ותיק.' },
            { icon: <HeartOutlined />, title: 'יחס אישי', desc: 'כל לקוח מקבל יחס אישי, קשוב וזמין לאורך כל הדרך.' },
            { icon: <SafetyCertificateOutlined />, title: 'ניסיון מוכח', desc: 'שנות ניסיון מול ביטוח לאומי, משרד הביטחון וחברות הביטוח.' },
            { icon: <TeamOutlined />, title: 'עבודת צוות', desc: 'צוות עורכי דין, מתמחים ומזכירות משפטית לכל אורך התיק.' },
            { icon: <ClockCircleOutlined />, title: 'זמינות ומענה', desc: 'זמינים עבורכם לכל שאלה, כולל מענה מהיר בוואטסאפ.' },
            { icon: <CheckCircleOutlined />, title: 'מיצוי מלא של הזכויות', desc: 'נלחמים עד לקבלת הפיצוי המלא המגיע לכם.' },
          ].map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.icon}>{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
