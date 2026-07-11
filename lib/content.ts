import { client, hasSanity, urlFor } from '@/sanity/client';

export interface Coach {
  name: string;
  role: string;
  bio: string;
  highlights: string[];
  photoUrl: string | null;
}

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface Content {
  campName: string;
  presentedBy: string;
  headline: string;
  headlineRich: any[] | null;
  subheadline: string;
  heroImageUrl: string | null;
  headlineColor: string;
  lbaLogoUrl: string | null;
  qLogoUrl: string | null;
  experienceHeading: string;
  experienceIntro: string;
  experienceCards: { title: string; text: string }[];
  dates: string;
  dailyHours: string;
  location: string;
  ages: string;
  tuition: string;
  tuitionIncludes: string;
  maxEnrollment: string;
  bring: string;
  weatherPolicy: string;
  refundPolicy: string;
  contactEmail: string;
  motto: string;
  waiverUrl: string | null;
  registrationOpen: boolean;
  registrationClosedMessage: string;
  coaches: Coach[];
  schedule: ScheduleItem[];
}

export const FALLBACK: Content = {
  campName: 'Leesburg Baseball Academy Camp',
  presentedBy: 'Q Athletics',
  headline: 'Develop the Skills. Understand the Game. Compete with Confidence.',
  headlineRich: null,
  subheadline:
    'Train with accomplished college and high-level baseball players in a focused, energetic camp built to develop skills, baseball IQ and competitive confidence.',
  heroImageUrl: null,
  headlineColor: '#ffffff',
  lbaLogoUrl: null,
  qLogoUrl: null,
  experienceHeading: 'Four days. High-energy instruction. Real feedback.',
  experienceIntro:
    'Small-group coaching, competitive repetitions and individual feedback from experienced players — focused on hitting, fielding, throwing, baserunning and game awareness.',
  experienceCards: [
    { title: 'Professional Instruction', text: 'Small-group coaching and individual feedback from college-level players.' },
    { title: 'Skill Development', text: 'Hitting, defense, throwing, baserunning and baseball IQ — all in one camp.' },
    { title: 'Competitive Fun', text: 'Games, challenges and age-appropriate competitions all four days.' },
  ],
  dates: 'July 20–23, 2026',
  dailyHours: '8:30 a.m. – 2:00 p.m.',
  location: 'Leesburg, Virginia (field TBA)',
  ages: '9–14 (all skill levels)',
  tuition: '$275',
  tuitionIncludes:
    'Includes four days of instruction, a camp T-shirt, daily competitions and a written player-development summary.',
  maxEnrollment: '40 campers',
  bring: 'Glove, bat, helmet, cleats, sneakers, water, sunscreen, lunch',
  weatherPolicy:
    'Camp runs rain or shine; severe weather delays communicated by email.',
  refundPolicy:
    'Full refund up to 14 days before camp; 50% up to 7 days; none within a week.',
  contactEmail: 'leesburgbaseballacademy@gmail.com',
  motto: 'Defend · Compete · Win',
  waiverUrl: null,
  registrationOpen: true,
  registrationClosedMessage:
    'Camp is full! Registration has closed. Email us to be notified if a spot opens up or when future camps are announced.',
  coaches: [
    {
      name: 'Bobby Quarantillo',
      role: 'Speed & Agility · Founder, Q Athletics',
      bio: 'Founder of Q Athletics (2014), Bobby has helped student-athletes earn scholarships to Dartmouth, Virginia Tech, South Carolina, TCU, Maryland and Binghamton, among others. He brings nearly two decades of performance coaching to campers of every level.',
      highlights: ['Founder, Q Athletics', 'NSCA member · NFPT Certified Trainer', 'B.S., Buffalo State College'],
      photoUrl: null,
    },
    {
      name: 'Bauer Burkhart',
      role: 'Pitching & Position Coach · Presbyterian College',
      bio: 'A former All-State and All-Region selection, Bauer has competed at Presbyterian College and Marshall University. In 2026 he made 14 appearances on the mound at Presbyterian, including four starts and an opening-day win with 2.1 scoreless innings.',
      highlights: ['D1 pitcher, Presbyterian College', 'Former Marshall University baseball', 'All-State · All-Region selection'],
      photoUrl: null,
    },
    {
      name: 'Cole Keel',
      role: 'Pitching Coach · Bridgewater College',
      bio: 'Entering his senior season at Bridgewater College, Cole brings extensive high-school and collegiate experience. He specializes in pitching mechanics, arm care and the preparation and mindset needed to compete on the mound.',
      highlights: ['Senior pitcher, Bridgewater College', 'All-State · All-Region selection', 'Four-year varsity player'],
      photoUrl: null,
    },
    {
      name: 'Connor Quill',
      role: 'Hitting & Infield Coach · Roanoke College commit',
      bio: 'A 2026 graduate committed to Roanoke College, Connor was ranked the No. 1 third baseman in Virginia by Perfect Game. He helped lead his team to Dulles District championships in 2023 and 2024, two Region 4C championships and back-to-back state semifinal appearances.',
      highlights: ['Roanoke College commit', 'Perfect Game No. 1 3B in Virginia', 'All-District · 4-year varsity starter'],
      photoUrl: null,
    },
  ],
  schedule: [
    { time: '8:30 a.m.', activity: 'Camper check-in' },
    { time: '9:00 a.m.', activity: 'Dynamic warmup & throwing' },
    { time: '9:30 a.m.', activity: 'Defensive instruction' },
    { time: '10:30 a.m.', activity: 'Hitting stations' },
    { time: '11:30 a.m.', activity: 'Baserunning & baseball IQ' },
    { time: '12:00 p.m.', activity: 'Lunch' },
    { time: '12:30 p.m.', activity: 'Competitions & games' },
    { time: '1:45 p.m.', activity: 'Review & awards' },
    { time: '2:00 p.m.', activity: 'Pickup' },
  ],
};

export async function getContent(): Promise<Content> {
  if (!hasSanity || !client) return FALLBACK;
  try {
    const [settings, coaches, schedule] = await Promise.all([
      client.fetch(`*[_type == "campSettings"][0]{..., "waiverUrl": waiver.asset->url}`),
      client.fetch(`*[_type == "coach"] | order(order asc)`),
      client.fetch(`*[_type == "scheduleItem"] | order(order asc)`),
    ]);

    const s = settings || {};
    return {
      campName: s.campName || FALLBACK.campName,
      presentedBy: s.presentedBy || FALLBACK.presentedBy,
      headline: s.headline || FALLBACK.headline,
      headlineRich: Array.isArray(s.headlineRich) && s.headlineRich.length > 0 ? s.headlineRich : null,
      subheadline: s.subheadline || FALLBACK.subheadline,
      heroImageUrl: urlFor(s.heroImage),
      headlineColor: s.headlineColor || FALLBACK.headlineColor,
      lbaLogoUrl: urlFor(s.lbaLogo),
      qLogoUrl: urlFor(s.qLogo),
      experienceHeading: s.experienceHeading || FALLBACK.experienceHeading,
      experienceIntro: s.experienceIntro || FALLBACK.experienceIntro,
      experienceCards:
        Array.isArray(s.experienceCards) && s.experienceCards.length > 0
          ? s.experienceCards.map((card: any) => ({ title: card.title || '', text: card.text || '' }))
          : FALLBACK.experienceCards,
      dates: s.dates || FALLBACK.dates,
      dailyHours: s.dailyHours || FALLBACK.dailyHours,
      location: s.location || FALLBACK.location,
      ages: s.ages || FALLBACK.ages,
      tuition: s.tuition || FALLBACK.tuition,
      tuitionIncludes: s.tuitionIncludes || FALLBACK.tuitionIncludes,
      maxEnrollment: s.maxEnrollment || FALLBACK.maxEnrollment,
      bring: s.bring || FALLBACK.bring,
      weatherPolicy: s.weatherPolicy || FALLBACK.weatherPolicy,
      refundPolicy: s.refundPolicy || FALLBACK.refundPolicy,
      contactEmail: s.contactEmail || FALLBACK.contactEmail,
      motto: s.motto || FALLBACK.motto,
      waiverUrl: s.waiverUrl || null,
      registrationOpen: s.registrationStatus ? s.registrationStatus !== 'closed' : s.registrationOpen !== false,
      registrationClosedMessage: s.registrationClosedMessage || FALLBACK.registrationClosedMessage,
      coaches:
        coaches?.length > 0
          ? coaches.map((c: any) => ({
              name: c.name || '',
              role: c.role || '',
              bio: c.bio || '',
              highlights: c.highlights || [],
              photoUrl: urlFor(c.photo),
            }))
          : FALLBACK.coaches,
      schedule:
        schedule?.length > 0
          ? schedule.map((i: any) => ({ time: i.time || '', activity: i.activity || '' }))
          : FALLBACK.schedule,
    };
  } catch {
    return FALLBACK;
  }
}
