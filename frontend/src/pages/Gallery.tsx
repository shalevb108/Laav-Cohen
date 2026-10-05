import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { PictureOutlined, CloseOutlined } from '@ant-design/icons';
import type { GalleryItem } from '../types';
import { getGallery, resolveImageUrl } from '../services/api';
import styles from './Gallery.module.scss';

// Placeholder items shown until the gallery is populated. The live gallery is
// served from the dedicated gallery database (GALLERY_MONGODB_URI on the
// backend) — upload the firm's Google Business photos there via the admin panel.
const defaults: GalleryItem[] = [
  { _id: '1', imageUrl: '/images/gallery-1.jpeg', title: 'השותפים וצוות המשרד', description: 'עו"ד ירון להב ועו"ד אסף כהן עם צוות הקבלה', category: 'הצוות', order: 1 },
  { _id: '2', imageUrl: '/images/gallery-2.jpeg', title: 'עו"ד ירון להב ועו"ד אסף כהן', description: 'שותפי המשרד המייסדים', category: 'הצוות', order: 2 },
  { _id: '3', imageUrl: '/images/gallery-3.jpeg', title: 'יום גיבוש צוותי', description: 'טיול צוות המשרד בטבע', category: 'אירועים', order: 3 },
  { _id: '4', imageUrl: '/images/gallery-4.jpeg', title: 'צוות המשרד', description: 'עורכי הדין והצוות המשפטי במשרד', category: 'הצוות', order: 4 },
  { _id: '5', imageUrl: '/images/gallery-5.jpeg', title: 'צוות המשרד המלא', description: 'כל צוות חברת עורכי הדין להב את כהן', category: 'הצוות', order: 5 },
  { _id: '6', imageUrl: '/images/gallery-6.jpeg', title: 'חלק מצוות המשרד', description: 'עורכי דין ואנשי צוות בכניסה למשרד', category: 'הצוות', order: 6 },
  { _id: '7', imageUrl: '/images/gallery-7.jpeg', title: 'השותפים המייסדים', description: 'עו"ד ירון להב ועו"ד אסף כהן', category: 'הצוות', order: 7 },
  { _id: '8', imageUrl: '/images/gallery-8.jpeg', title: 'אזור הקבלה', description: 'דלפק הקבלה וחדרי המשרד', category: 'המשרד', order: 8 },
  { _id: '9', imageUrl: '/images/gallery-9.jpeg', title: 'פינת ההמתנה', description: 'אזור ההמתנה ללקוחות במשרד', category: 'המשרד', order: 9 },
];

const categories = ['הכל', 'הצוות', 'המשרד', 'אירועים'];

const gradients = [
  'linear-gradient(135deg, #0F2A4A, #1C4269)',
  'linear-gradient(135deg, #081B33, #0F2A4A)',
  'linear-gradient(135deg, #C8A24B, #DDBE77)',
  'linear-gradient(135deg, #1C4269, #2A5688)',
  'linear-gradient(135deg, #081B33, #1C4269)',
  'linear-gradient(135deg, #B8860B, #C8A24B)',
];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(defaults);
  const [filter, setFilter] = useState('הכל');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    getGallery().then(d => { if (d.length > 0) setItems(d); }).catch(() => {});
  }, []);

  const filtered = filter === 'הכל' ? items : items.filter(i => i.category === filter);

  return (
    <>
      <section className={styles.hero}>
        <h1>גלריית <span>המשרד</span></h1>
        <p>הצצה אל המשרד, הצוות וחלק מההישגים המשפטיים שלנו</p>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.filterBar}>
            {categories.map(c => (
              <button
                key={c}
                className={`${styles.filterBtn} ${filter === c ? styles.active : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className={styles.masonry}>
            {filtered.map((item, idx) => (
              <div key={item._id} className={styles.item} onClick={() => setSelected(item)}>
                {item.imageUrl ? (
                  <img src={resolveImageUrl(item.imageUrl)} alt={item.title} loading="lazy" />
                ) : (
                  <div
                    className={styles.placeholder}
                    style={{ background: gradients[idx % gradients.length] }}
                  >
                    <PictureOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />
                  </div>
                )}
                <div className={styles.overlay}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={null}
        width={600}
        className={styles.modal}
        closeIcon={<CloseOutlined />}
        destroyOnClose
      >
        {selected && (
          <>
            {selected.imageUrl ? (
              <img src={resolveImageUrl(selected.imageUrl)} alt={selected.title} />
            ) : (
              <div style={{
                height: 300,
                background: gradients[0],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                color: 'rgba(255,255,255,0.4)',
              }}>
                <PictureOutlined />
              </div>
            )}
            <div className={styles.modalInfo}>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <p style={{ color: '#0F2A4A', fontWeight: 600, marginTop: 8 }}>
                קטגוריה: {selected.category}
              </p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
