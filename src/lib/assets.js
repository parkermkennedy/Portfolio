// Static assets live in /public/assets (see scripts/fetch-assets.sh).
export const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

export const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;
// Filename the browser saves the résumé as (the `download` attribute).
export const RESUME_FILENAME = 'Parker Kennedy - Resume.pdf';
export const EMAIL = 'parkerminkennedy@gmail.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/parkermkennedy';
