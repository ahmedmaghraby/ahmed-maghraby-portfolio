'use client';

const EXPERIENCE = [
  {
    company: 'Lendo',
    location: 'Riyadh',
    role: 'Associate Principal Engineer',
    period: 'Mar 2024 — Present',
    type: 'Full-time',
    bullets: [
      'Led a cross-functional team of 10+ front-end & mobile engineers.',
      'Built the full architecture for Lendo\'s new customer mobile app.',
      'Improved web app performance by 30% via systematic refactoring.',
      'Delivered 10+ new features with React & clean architecture.',
      'Designed and implemented Micro Frontend architecture.',
      'Built and maintained Lendo\'s private UI library.',
      'Achieved 100% test coverage for core modules.',
      'Built a CS AI Assistant POC.',
      'Managed sprint planning, delivery, and code quality.',
    ],
  },
  {
    company: 'BuildMart',
    location: 'Riyadh',
    role: 'Senior Front-End Engineer',
    period: 'Nov 2022 — Mar 2024',
    type: 'Full-time',
    bullets: [
      'Enhanced existing Vue TS applications.',
      'Designed FE architecture and UI workflows.',
      'Developed a complete React + Next.js website.',
      'Built a Flutter mobile application for the platform.',
    ],
  },
  {
    company: 'Wtheq',
    location: 'Riyadh',
    role: 'Senior Front-End Engineer',
    period: 'May 2023 — Jan 2024',
    type: 'Part-time',
    bullets: [
      'Architected a full Vue TS platform from scratch.',
      'Developed SEO-first landing pages using Next.js SSG.',
    ],
  },
  {
    company: 'Tribal',
    location: 'San Francisco',
    role: 'Senior Front-End Engineer',
    period: 'Dec 2022 — Apr 2023',
    type: 'Part-time',
    bullets: [
      'Refactored and optimized a large-scale Nuxt.js codebase.',
      'Delivered new UI features and reduced load time.',
    ],
  },
  {
    company: 'Link TSP',
    location: 'Cairo',
    role: 'Senior Software Engineer',
    period: 'Mar 2021 — Nov 2022',
    type: 'Full-time',
    bullets: [
      'Led the front-end team and code guidelines.',
      'Built dashboards with Angular 13.',
      'Developed .NET Core modules.',
    ],
  },
  {
    company: 'Electrified',
    location: 'Cairo',
    role: 'Software Engineer',
    period: 'Mar 2020 — Mar 2021',
    type: 'Full-time',
    bullets: [
      'Developed Vue web apps and Flutter mobile apps.',
      'Built .NET Core modules.',
    ],
  },
  {
    company: 'Bedab Software',
    location: 'Cairo',
    role: '.Net Full-Stack Engineer',
    period: 'Dec 2019 — Mar 2020',
    type: 'Full-time',
    bullets: [
      'Built .NET MVC + AngularJS systems.',
      'Developed a full chat application like Slack using SignalR.',
    ],
  },
];

const SKILLS_GROUPS = [
  {
    label: 'Frontend',
    items: ['HTML5', 'CSS3', 'Tailwind', 'Bootstrap', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue', 'Nuxt', 'Angular 2+', 'AngularJS', 'Redux', 'Vuex', 'PWA', 'StoryBook'],
  },
  {
    label: 'Testing',
    items: ['Jest', 'Testing Library', 'Selenium (Python)'],
  },
  {
    label: 'Mobile',
    items: ['React Native', 'Flutter'],
  },
  {
    label: 'Backend & Other',
    items: ['Firebase', 'GraphQL', 'SignalR', 'ASP.NET Core', 'Python', 'TensorFlow', 'SQL', 'gRPC', 'Webpack', 'GULP'],
  },
];

export default function ResumeApp() {
  return (
    <div
      className="h-full overflow-y-auto"
      style={{ background: '#06090f', color: '#e2e8f0', scrollbarWidth: 'none' }}
    >
      <div className="max-w-lg mx-auto px-6 py-6 space-y-8">

        {/* Experience */}
        <div>
          <div
            className="font-mono mb-4 tracking-widest uppercase"
            style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}
          >
            Experience
          </div>

          <div className="space-y-5">
            {EXPERIENCE.map((job, idx) => (
              <div
                key={idx}
                className="relative pl-4"
                style={{ borderLeft: '1px solid rgba(245,211,147,0.12)' }}
              >
                {/* Dot on timeline */}
                <span
                  className="absolute -left-[5px] top-1 rounded-full"
                  style={{ width: 8, height: 8, background: '#f5d393', opacity: idx === 0 ? 1 : 0.35 }}
                />

                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <span
                      className="font-mono font-bold"
                      style={{ fontSize: 13, color: '#f5d393' }}
                    >
                      {job.company}
                    </span>
                    <span
                      className="font-mono ml-2"
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}
                    >
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.type === 'Part-time' && (
                      <span
                        className="font-mono px-2 py-0.5 rounded"
                        style={{
                          fontSize: 10,
                          color: 'rgba(74,243,255,0.6)',
                          background: 'rgba(74,243,255,0.08)',
                          border: '1px solid rgba(74,243,255,0.14)',
                        }}
                      >
                        part-time
                      </span>
                    )}
                    <span
                      className="font-mono"
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}
                    >
                      {job.period}
                    </span>
                  </div>
                </div>

                <p
                  className="font-mono mt-0.5 mb-2"
                  style={{ fontSize: 12, color: 'rgba(74,243,255,0.65)' }}
                >
                  {job.role}
                </p>

                <ul className="space-y-0.5">
                  {job.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="flex gap-2"
                      style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}
                    >
                      <span style={{ color: 'rgba(245,211,147,0.3)', flexShrink: 0 }}>›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div
            className="font-mono mb-3 tracking-widest uppercase"
            style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}
          >
            Education
          </div>
          <div
            className="rounded-lg px-4 py-3"
            style={{ background: 'rgba(245,211,147,0.04)', border: '1px solid rgba(245,211,147,0.1)' }}
          >
            <p className="font-mono font-bold" style={{ fontSize: 13, color: '#f5d393' }}>
              Banha University — Egypt
            </p>
            <p className="font-mono mt-0.5" style={{ fontSize: 12, color: 'rgba(74,243,255,0.65)' }}>
              Bachelor of Science in Computer Science
            </p>
            <p className="font-mono mt-0.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
              2015 — 2019
            </p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div
            className="font-mono mb-3 tracking-widest uppercase"
            style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}
          >
            Skills
          </div>
          <div className="space-y-3">
            {SKILLS_GROUPS.map(group => (
              <div key={group.label}>
                <div
                  className="font-mono mb-1.5"
                  style={{ fontSize: 11, color: 'rgba(74,243,255,0.5)' }}
                >
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map(skill => (
                    <span
                      key={skill}
                      className="font-mono px-2.5 py-0.5 rounded"
                      style={{
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.6)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <div
            className="font-mono mb-2 tracking-widest uppercase"
            style={{ fontSize: 10, color: 'rgba(245,211,147,0.45)' }}
          >
            Languages
          </div>
          <div className="flex gap-3">
            {[
              { lang: 'Arabic', level: 'Native' },
              { lang: 'English', level: 'Full Professional' },
            ].map(({ lang, level }) => (
              <div
                key={lang}
                className="flex-1 rounded-lg px-3 py-2 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="font-mono font-bold" style={{ fontSize: 13, color: '#f5d393' }}>
                  {lang}
                </div>
                <div className="font-mono mt-0.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                  {level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
