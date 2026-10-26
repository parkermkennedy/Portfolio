export const JOBS = [
  {
    dates: '2024 — Now',
    role: 'UX/UI Engineer',
    company: 'Portrait Displays, Inc.',
    description:
      'Sole UX/UI designer for next-generation Calman: turned an expert-only calibration process into one guided, automated flow, ran usability testing, and maintain the design system.',
    mobileDescription:
      'Sole UX/UI designer for next-generation Calman: one guided, automated calibration flow, usability testing, and the design system.',
  },
  {
    dates: '2021 — 2024',
    role: 'Workflow Designer',
    company: 'Portrait Displays, Inc.',
    description:
      'Built a workflow template behind 30+ calibration workflows, cutting build time from days to minutes, for manufacturers and studios like LG, Samsung, Sony, and Netflix.',
    mobileDescription:
      'Built a template behind 30+ calibration workflows, cutting build time from days to minutes, for brands like LG, Sony, and Netflix.',
  },
  {
    dates: '2021',
    role: 'UX Designer',
    company: 'Cruz Street · Springboard industry project',
    description: 'A read-only viewing experience for Dashprophet, a data management platform.',
  },
];

// `joined` columns collapse to a single "a · b · c" line on mobile.
export const SKILL_COLUMNS = [
  {
    label: 'Skills',
    joined: true,
    items: [
      'User research & usability testing',
      'Information architecture',
      'Interaction design',
      'Wireframing & prototyping',
      'Design systems',
      'Accessibility',
    ],
  },
  {
    label: 'Technical',
    joined: true,
    items: [
      'React, JavaScript, HTML/CSS',
      'Design-to-development handoff',
      'AI-assisted design & prototyping',
      'Python (working knowledge)',
      'Agile',
    ],
  },
  {
    label: 'Tools',
    joined: true,
    items: ['Figma', 'Figma AI', 'Claude', 'Claude Code', 'Miro', 'Slack'],
  },
  {
    label: 'Education',
    joined: false,
    items: ['Springboard — UX/UI Design Course', 'University of Washington — Bachelor of Arts'],
  },
  {
    label: 'Before design',
    joined: false,
    items: ['Amazon (Site Lead), Nordstrom, and Chungdahm Learning (ESL Instructor), 2017–2021.'],
  },
];

export const CASE_STUDY_CALMAN5 = {
  title: 'Calman 5 Workflow Makeover',
  company: 'Portrait Displays, Inc.',
  meta: [
    { label: 'Role', value: 'Workflow Designer' },
    { label: 'Timeline', value: '3 months' },
    { label: 'Team', value: 'Solo project' },
    { label: 'Platform', value: 'Calman 5 software' },
  ],
  tldr: [
    {
      label: 'Problem',
      text: 'Years of one-off additions left Calman 5’s workflows inconsistent, so users re-learned the process for every device they calibrated.',
    },
    {
      label: 'What I did',
      text: 'Designed one reusable workflow template with a central configuration page, working within Calman 5’s fixed components.',
    },
    {
      label: 'Result',
      text: '30+ workflows built from the template, new ones in minutes instead of days, and more useful diagnostic data for Support and R&D.',
    },
  ],
  summary:
    'A facelift for the shipping Calman 5 products. The goal: consistency across products, a higher success rate for people calibrating with Calman 5, and better usability.',
  sections: [
    {
      title: 'Background',
      blocks: [
        {
          type: 'p',
          text: 'Calman 5 was built out of necessity. The makeover spans two lines of business, Home and Business, and neither had been touched in years except to add features newer displays required.',
        },
        {
          type: 'p',
          text: 'With a next-generation application underway, the idea was to give these workflows one last update that would hold users over until they could migrate. Since most engineering effort would go to the new application, the plan was to update once and then leave the old one alone until retirement.',
        },
      ],
    },
    {
      title: 'Problem statement',
      blocks: [
        {
          type: 'pull',
          text: 'Inconsistent patterns made users re-learn the workflow every time they calibrated a different device.',
        },
        {
          type: 'p',
          text: 'Calman 5’s interface and workflow structure evolved incrementally in response to user and manufacturer needs, resulting in inconsistent patterns across products and workflows. These inconsistencies increased cognitive load: users navigated numerous manual steps and mentally re-learned workflows when calibrating different devices. Over time, the fragmentation made calibration harder than it needed to be.',
        },
      ],
    },
    {
      title: 'Goals',
      blocks: [
        {
          type: 'pair',
          items: [
            { heading: 'User goals', text: 'Calibrate their displays and have confidence in the accuracy of the results.' },
            {
              heading: 'Business goals',
              text: 'Update workflows to create a unified look and feel, and provide just enough “newness” to hold users over until the next-generation application is released.',
            },
          ],
        },
      ],
    },
    {
      title: 'Audience & constraints',
      blocks: [
        { type: 'h', text: 'Target users' },
        { type: 'p', text: 'Professional calibrators, home enthusiasts, and production studios.' },
        { type: 'h', text: 'Feedback constraints' },
        {
          type: 'p',
          text: 'Direct access to end users was limited; feedback mostly surfaced through support channels when issues occurred. Design decisions were informed by patterns in customer complaints, support tickets, and QA findings.',
        },
        { type: 'h', text: 'Platform constraints' },
        {
          type: 'list',
          items: [
            'Fixed layout and component limitations within Calman 5’s design environment',
            'Workflow logic defined by a proprietary pseudo-coding system',
            'No new UI components or interactions',
            'Compatibility maintained across existing manufacturer workflows',
          ],
        },
      ],
    },
    {
      title: 'Design strategy',
      blocks: [
        {
          type: 'list',
          items: [
            'Consistency over customization',
            'Systemization over one-off fixes',
            'Automate where feasible to reduce repetitive or procedural tasks',
            'Systemize with reusable templates',
          ],
        },
      ],
    },
    {
      title: 'Solution',
      blocks: [
        { type: 'h', text: 'Reusable workflow template' },
        {
          type: 'p',
          text: 'The template standardized the flow of every workflow. Users can open any workflow and expect the same navigational layout inside it, and new workflows were created directly from the template.',
        },
        { type: 'h', text: 'Centralized logic & configuration' },
        {
          type: 'p',
          text: 'A configuration page lets engineers edit targets and other parts of the calibration process in one place. With the template, building a new workflow takes minutes instead of days, and updates are simple: engineers know exactly where and how to change something instead of searching the whole workflow for one action.',
        },
      ],
    },
    {
      title: 'Tradeoffs',
      blocks: [
        {
          type: 'pair',
          items: [
            {
              heading: 'Customization vs. consistency',
              text: 'Standardizing the experience at the expense of per-product uniqueness.',
            },
            {
              heading: 'Speed vs. transparency',
              text: 'Calibrations take a little longer because they include more measurements, but the analysis is more accurate where earlier workflows may have hidden flaws in display accuracy.',
            },
          ],
        },
      ],
    },
    {
      title: 'Outcomes & impact',
      blocks: [
        {
          type: 'list',
          items: [
            'The calibration process became cleaner and more concise.',
            'More than 30 workflows have been built from the template, and its patterns shaped six more built outside it. Maintenance got easier and workflow creation faster.',
            'Customer Support and R&D found the extra data points much more useful for diagnosing calibration issues.',
            'There is appetite for more usability testing after releases to inform design.',
          ],
        },
      ],
    },
    {
      title: 'Key takeaway',
      blocks: [
        {
          type: 'pull',
          text: 'Each new workflow revealed ways to improve the template underneath it — turning a finite project into an ongoing, iterative system.',
        },
      ],
    },
  ],
  disclaimer: 'Some details have been modified or omitted to protect confidential information.',
};

export const CASE_STUDY_PORTFOLIO = {
  title: 'Rebuilding my portfolio to keep up with my work',
  company: 'Personal project',
  meta: [
    { label: 'Role', value: 'Designer & front-end developer' },
    { label: 'Timeline', value: '1 week' },
    { label: 'Tools', value: 'Figma, React, AI' },
    { label: 'Platform', value: 'Web (GitHub Pages)' },
  ],
  tldr: [
    {
      label: 'Problem',
      text: 'My first portfolio, built in Figma Sites, was static. Updating one section took several days of placing buttons, linking them, and re-entering content by hand.',
    },
    {
      label: 'What I did',
      text: 'Rebuilt it as a coded site driven by my own Figma design system, with AI assistance, so the code and the Figma files can be updated together, by hand or with AI.',
    },
    {
      label: 'Result',
      text: 'A batch of changes now takes a few hours instead of days per section, and the unreleased project is now shared behind a password.',
    },
  ],
  summary:
    'A rebuild of the site you’re reading. I kept its content and structure, gave it a stronger visual identity, and moved it from a static page builder to a coded site built on a design system, so it can keep up with my work.',
  sections: [
    {
      title: 'Background',
      blocks: [
        {
          type: 'p',
          text: 'The first version of this site was built and published with Figma Sites: a hero, two projects, an about section, and my résumé. It did the job, but every change was manual. I placed buttons, linked them, and worked out how to attach my résumé, one piece at a time.',
        },
        {
          type: 'p',
          text: 'My unreleased project was on the public site too, with some details redacted, but most of it was visible to anyone.',
        },
      ],
    },
    {
      title: 'Problem statement',
      blocks: [
        {
          type: 'pull',
          text: 'My portfolio couldn’t keep up with my work. Updating one section took several days, so it fell behind.',
        },
        {
          type: 'p',
          text: 'The site was static: content, layout, and links all had to be changed by hand, and there was no safe way to share work that isn’t public yet.',
        },
      ],
    },
    {
      title: 'Goals',
      blocks: [
        {
          type: 'pair',
          items: [
            {
              heading: 'Easy to update',
              text: 'Make changes in hours instead of days, in both the code and the Figma files, either by hand or with AI.',
            },
            {
              heading: 'Share unreleased work responsibly',
              text: 'Show the full unreleased project only to people with the password, and give everyone else a public preview.',
            },
          ],
        },
      ],
    },
    {
      title: 'Visual direction',
      blocks: [
        {
          type: 'p',
          text: 'The look grew out of paper and brush strokes. The heart of the original site, its content and the order of its sections, stayed the same.',
        },
        {
          type: 'list',
          items: [
            'A paper-toned background instead of plain white',
            'A red seal stamp of my Korean name as the site’s mark',
            'Serif type for headings, paired with a clean sans-serif for reading',
          ],
        },
      ],
    },
    {
      title: 'Design strategy',
      blocks: [
        {
          type: 'list',
          items: [
            'One source of truth: colors, type, and spacing live in my Figma design system, and the code reads from it',
            'Content as data, so updating text doesn’t mean touching the layout',
            'Keep the Figma mockups and the code in sync, so either can be the starting point',
            'Use AI to speed up building, while I make the design decisions',
          ],
        },
      ],
    },
    {
      title: 'Updating, before vs. after',
      blocks: [
        {
          type: 'flow',
          columns: [
            {
              heading: 'Before: Figma Sites',
              summary: 'Several days to update one section.',
              items: [
                {
                  kind: 'repeat',
                  label: 'Repeat for every section',
                  note: 'Hero, projects, about, résumé',
                  steps: [
                    'Edit the layout by hand',
                    'Re-enter the content',
                    'Place and link each button',
                    'Work out how to attach files, like my résumé',
                    'Publish from Figma Sites',
                  ],
                },
              ],
            },
            {
              heading: 'After: coded site + design system',
              summary: 'A few hours for a whole batch of changes.',
              items: [
                'Make the changes, by hand or with AI',
                'Update the Figma mockups to match',
                'Review in the browser',
                'Push to GitHub',
                {
                  kind: 'auto',
                  label: 'Automatic',
                  note: 'GitHub builds and publishes the site on every push.',
                  steps: ['Build', 'Publish'],
                },
              ],
            },
          ],
          caption: 'Updating the site, from my side.',
        },
      ],
    },
    {
      title: 'Solution',
      blocks: [
        { type: 'h', text: 'A design system that feeds the code' },
        {
          type: 'p',
          text: 'Colors, type, spacing, and shadows live as variables and text styles in my Figma design system. One command exports them into the site’s styles, so a change in Figma reaches the site without retyping a value. Dark mode is already built into the tokens, ready to switch on.',
        },
        { type: 'h', text: 'Password protection without a server' },
        {
          type: 'p',
          text: 'The site is hosted on GitHub Pages, which has no server to check a password. So the unreleased case study is encrypted, and it only decrypts with the right password. Everyone else sees a public preview and a Request access button that emails me.',
        },
        { type: 'h', text: 'Design and code that stay in sync' },
        {
          type: 'p',
          text: 'Changes go into both the code and the Figma mockups, so the mockups always reflect the live site and I can start a change from either one.',
        },
      ],
    },
    {
      title: 'Working with AI',
      blocks: [
        {
          type: 'p',
          text: 'I made the decisions: the visual direction, the structure, and what to build, like putting the unreleased project behind a password and leading that page with a public summary. AI helped me:',
        },
        {
          type: 'list',
          items: [
            'Write the code for new features, such as the password-protected preview, Request access, and the process flowcharts',
            'Suggest clean-up ideas, some of which I adopted, like the TL;DR summaries',
            'Draft copy that I edited and approved',
            'Fine-tune small visual details and structure content',
            'Keep the Figma mockups in sync with the code',
          ],
        },
      ],
    },
    {
      title: 'Tradeoffs',
      blocks: [
        {
          type: 'pair',
          items: [
            {
              heading: 'Setup vs. speed',
              text: 'A coded site takes more setup than a page builder. Once the system exists, every change after that is faster and more consistent.',
            },
            {
              heading: 'Encryption vs. a real login',
              text: 'Without a server there are no accounts: one shared password unlocks the case study. It’s simple for visitors, and I send the password on request instead of managing users.',
            },
          ],
        },
      ],
    },
    {
      title: 'Outcomes & impact',
      blocks: [
        {
          type: 'list',
          items: [
            'Updates that took several days per section now take a few hours, even for a batch of changes across the code and Figma.',
            'The unreleased project is now behind a password, with a public preview and a way to request access.',
            'The Figma mockups match the live site, so either can be the starting point for the next change.',
            'This case study was added with the same workflow.',
          ],
        },
      ],
    },
    {
      title: 'Key takeaway',
      blocks: [
        {
          type: 'pull',
          text: 'A portfolio is a product too. Making it easy to change matters more than getting it perfect the first time.',
        },
      ],
    },
  ],
};

// Only what's safe to show before unlocking. The case study itself is
// encrypted in public/protected/next-gen-calman.json (see scripts/encrypt.mjs).
export const NEXTGEN_GATE = {
  slug: 'next-gen-calman',
  title: 'Next-Gen Calman',
  company: 'Portrait Displays, Inc.',
  intro:
    'The product hasn’t been announced yet, so the full case study, with the process, usability findings, and outcomes, is password protected. If you don’t have the password, request access and I’ll send it to you.',
  meta: [
    { label: 'Role', value: 'Sole UX/UI Designer' },
    { label: 'Timeline', value: '2024–present' },
    { label: 'Platform', value: 'Desktop (Windows/Mac)' },
  ],
  // Public preview: nothing here goes beyond what the home page already says.
  teaser:
    'A guided desktop calibration app for home users. As the sole UX/UI designer, I took a long, expert-only process and turned it into a single automated flow, then tested it with both expert calibrators and first-time users.',
  contents: [
    'Background, goals, and who it’s for',
    'The problem with the old workflow',
    'Design strategy: the old process vs. the new guided flow',
    'Interaction and visual design decisions',
    'Usability testing: what we found and what we’re changing',
    'Status and success metrics',
  ],
};

// Opens the visitor's email app with an access request addressed to me.
export const REQUEST_ACCESS_SUBJECT = 'Access request: Next-Gen Calman case study';
export const REQUEST_ACCESS_BODY = `Hi Parker,

I'd like access to the Next-Gen Calman case study on your portfolio.

Name:
Company:
Role:

Thanks!`;
