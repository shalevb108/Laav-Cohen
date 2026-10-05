import { useNavigate } from 'react-router-dom';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, ClockCircleOutlined, BankOutlined } from '@ant-design/icons';
import { useSiteInfo } from '../../context/SiteInfoContext';
import styles from './Footer.module.scss';

const navLinks = [
  { label: 'דף הבית', path: '/' },
  { label: 'תחומי התמחות', path: '/services' },
  { label: 'גלריה', path: '/gallery' },
  { label: 'אודות', path: '/about' },
  { label: 'המלצות', path: '/testimonials' },
  { label: 'צור קשר', path: '/contact' },
];

export default function Footer() {
  const navigate = useNavigate();
  const info = useSiteInfo();

  return (
    <footer className={styles.footer}>
      <div className={styles.wave}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z" fill="#f5f7fa" />
        </svg>
      </div>

      <div className={styles.content}>
        <div className={`${styles.col} ${styles.brand}`}>
          <div className={styles.logo}>
            <div className={styles.icon}><BankOutlined /></div>
            <span className={styles.name}>להב את כהן</span>
          </div>
          <p>
            חברת עורכי דין המתמחה בנזיקין ונזקי גוף. ליווי משפטי אישי ומקצועי מול המוסד לביטוח לאומי, משרד הביטחון וחברות הביטוח — באשקלון וכל אזור הדרום.
          </p>
        </div>

        <div className={styles.col}>
          <h3>ניווט מהיר</h3>
          <ul className={styles.links}>
            {navLinks.map((item) => (
              <li key={item.path} onClick={() => navigate(item.path)}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3>תחומי התמחות</h3>
          <ul className={styles.links}>
            <li>נזקי גוף ותאונות</li>
            <li>תאונות עבודה</li>
            <li>תאונות דרכים</li>
            <li>ביטוח לאומי</li>
            <li>נכי צה"ל ומשרד הביטחון</li>
            <li>רשלנות רפואית</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3>צור קשר</h3>
          <div className={styles.contactItem}>
            <PhoneOutlined className={styles.icon} />
            <a href={`tel:${info.phone}`}>{info.phone}</a>
          </div>
          <div className={styles.contactItem}>
            <MailOutlined className={styles.icon} />
            <a href={`mailto:${info.email}`}>{info.email}</a>
          </div>
          <div className={styles.contactItem}>
            <EnvironmentOutlined className={styles.icon} />
            <span>{info.address}</span>
          </div>
          <div className={styles.contactItem}>
            <ClockCircleOutlined className={styles.icon} />
            <span>{info.businessHours}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} להב את כהן - חברת עורכי דין - כל הזכויות שמורות</span>
        <span className={styles.license}>ח.פ {info.licenseNumber}</span>
      </div>
    </footer>
  );
}
