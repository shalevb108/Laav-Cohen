import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { SiteInfo } from '../types';
import { getSiteInfo } from '../services/api';

// Fallback values mirror the backend SiteInfo schema defaults, so the site
// renders correctly even before the API responds (or if it fails).
export const defaultSiteInfo: SiteInfo = {
  phone: '072-2555516',
  whatsapp: '97272555516',
  email: 'office@lahav-cohen.co.il',
  address: 'רחוב הגדוד העברי 10, אשקלון',
  city: 'אשקלון',
  businessHours: 'ראשון-חמישי 09:00-18:00',
  heroTitle: 'להב את כהן - חברת עורכי דין',
  heroSubtitle: 'ליווי משפטי מקצועי ואישי בתחום הנזיקין, נזקי גוף, ביטוח לאומי ותביעות נכות — באשקלון והדרום',
  aboutText:
    'חברת עורכי הדין להב את כהן, בראשות עו"ד ירון להב ועו"ד אסף כהן, מתמחה בדיני נזיקין ונזקי גוף: תאונות עבודה, תאונות דרכים, רשלנות רפואית, תביעות מול המוסד לביטוח לאומי, נכי צה"ל ומשרד הביטחון וחברות הביטוח. אנו מעניקים ליווי אישי, מקצועי וצמוד לכל לקוח — מהרגע הראשון ועד למיצוי מלא של הזכויות והפיצויים המגיעים לו.',
  licenseNumber: '515952208',
  yearsExperience: 15,
  projectsCompleted: 1000,
  happyClients: 800,
};

const SiteInfoContext = createContext<SiteInfo>(defaultSiteInfo);

export function SiteInfoProvider({ children }: { children: ReactNode }) {
  const [info, setInfo] = useState<SiteInfo>(defaultSiteInfo);

  useEffect(() => {
    getSiteInfo()
      .then((data) => {
        // Merge over defaults so any missing field keeps a sensible fallback.
        if (data) setInfo({ ...defaultSiteInfo, ...data });
      })
      .catch(() => {});
  }, []);

  return <SiteInfoContext.Provider value={info}>{children}</SiteInfoContext.Provider>;
}

export function useSiteInfo() {
  return useContext(SiteInfoContext);
}
