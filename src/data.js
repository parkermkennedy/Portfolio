export const JOBS = [
  {
    dates: '2024 — Now',
    role: 'UX/UI Engineer',
    company: 'Portrait Displays, Inc.',
    description:
      'End-to-end UX/UI for next-generation Calman, design system maintenance, and cross-functional collaboration with engineering.',
    mobileDescription:
      'End-to-end UX/UI for next-generation Calman, design system maintenance, and cross-functional collaboration.',
  },
  {
    dates: '2021 — 2024',
    role: 'Workflow Designer',
    company: 'Portrait Displays, Inc.',
    description:
      'Calibration workflows for studios and display manufacturers; contributed to Calibration-as-a-Service (CaaS).',
    mobileDescription:
      'Calibration workflows for studios and manufacturers; contributed to Calibration-as-a-Service (CaaS).',
  },
  {
    dates: '2021',
    role: 'UX Designer',
    company: 'Cruz Street: Dashprophet',
    description: 'A read-only viewing experience for a data management platform.',
  },
];

// `joined` columns collapse to a single "a · b · c" line on mobile.
export const SKILL_COLUMNS = [
  {
    label: 'Skills',
    joined: true,
    items: [
      'UX & UI design',
      'User research',
      'Information architecture',
      'Design systems',
      'Wireframing',
      'Usability testing',
      'Accessibility',
    ],
  },
  {
    label: 'Technical',
    joined: true,
    items: ['Agile', 'Front-end handoff', 'React, JavaScript, HTML, CSS', 'Python (working knowledge)'],
  },
  {
    label: 'Tools',
    joined: true,
    items: ['Figma', 'Miro', 'GitLab', 'Slack', 'Adobe XD'],
  },
  {
    label: 'Education',
    joined: false,
    items: ['Springboard — UX/UI Design, 2021', 'University of Washington — BA, 2016'],
  },
  {
    label: 'Before design',
    joined: false,
    items: ['Retail and teaching roles at Amazon, Nordstrom, and Chungdahm Learning, 2017–2021.'],
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
            'The template made maintenance easier and workflow creation faster.',
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
