const config = {
  port: process.env.PORT || '8000',
  publicUrl: process.env.PUBLIC_URL,
  siteName: 'nhardy.id.au',
  analytics: {
    trackingId: process.env.ANALYTICS_TRACKING_ID,
  },
  github: {
    username: 'nhardy',
    repoUrl: process.env.PROJECT_HOMEPAGE,
    excludedRepos: [
      48929138,
    ],
  },
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITEKEY,
  },
  twitter: {
    handle: '@nhardy96',
  },
};
export default config;
