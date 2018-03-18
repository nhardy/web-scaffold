// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';

import config from 'app/config';
import { makeTitle } from 'app/lib/social';
import SpecialLayout from 'app/layouts/Special';
import P from 'app/components/P';
import profileImg from 'app/assets/images/profile.jpg';
import profileImg2x from 'app/assets/images/profile-2x.jpg';
import profileImg3x from 'app/assets/images/profile-3x.jpg';
import styles from './styles.styl';


const TITLE = 'Home';
const DESCRIPTION = [
  'The website of web developer, Nathan Hardy.',
  'I\'ve worked on world-class web applications and services used by millions of Australians.',
].join(' ');

const HomeView = () => (
  <SpecialLayout className={styles.root}>
    <Helmet>
      <title>{TITLE}</title>
      <meta property="og:title" content={makeTitle(TITLE)} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={config.twitter.handle} />
      <meta name="twitter:title" content={makeTitle(TITLE)} />
      <meta name="twitter:description" content={DESCRIPTION} />
    </Helmet>
    <h1>Home</h1>
    <img className={styles.profile} src={profileImg} srcSet={`${profileImg2x} 2x, ${profileImg3x} 3x`} alt="Profile" />
    <P className={styles.paragraph}>
      I&apos;m a graduate of the
      {' '}
      <a
        href="https://www.uts.edu.au/future-students/information-technology/about-information-technology/bit-co-operative-scholarship"
        target="_blank"
        rel="noopener noreferrer"
      >
        Bachelor of Information Technology Co-operative Scholarship Program
      </a>
      {' '}
      at the
      {' '}
      <a href="https://www.uts.edu.au/" target="_blank" rel="noopener noreferrer">University of Technology, Sydney</a>
      {' '}
      with a passion for IT and computer science.
      {' '}
      I also studied overseas in Dunedin, New Zealand at the
      {' '}
      <a href="http://www.otago.ac.nz/" target="_blank" rel="noopener noreferrer">University of Otago</a>
      {' '}
      for my final semester.
      {' '}
      I am currently working at
      {' '}
      <a href="https://www.kablamo.com.au/" target="_blank" rel="noopener noreferrer">Kablamo</a>
      {' '}
      as a Full Stack Engineer.
    </P>
    <P className={styles.paragraph}>
      I have previously interned at
      {' '}
      <a href="https://www.appliancesonline.com.au/" target="_blank" rel="noopener noreferrer">Appliances Online</a>
      {' '}
      as a front end web developer.
      {' '}
      Prior to that, I have interned for and subsequently worked at
      {' '}
      <a href="http://www.nineentertainmentco.com.au/" target="_blank" rel="noopener noreferrer">Nine Digital</a>
      {' '}
      as a full stack developer building the
      {' '}
      <a href="https://www.9now.com.au/">9Now</a>
      {' '}
      <abbr title="Video On Demand">VOD</abbr>
      {' '}
      website and APIs.
    </P>
    <P className={styles.paragraph}>
      I have had an interest in computers from a young age and have worked on many small projects.
      {' '}
      Some of my more recent ones are listed
      {' '}
      <Link to="/projects">here</Link>.
      {' '}
      I am proficient in the use of the git version control system and have used this in a variety of personal and professional projects.
      {' '}
      Often in an academic environment, I have found myself
      {' '}
      <a href="https://gist.github.com/nhardy/05617237c1d3208213bd21749b735277" target="_blank" rel="noopener noreferrer">assisting others</a>
      {' '}
      with this occasionally extending into the workplace as well.
      {' '}
      In my time at
      {' '}
      <a href="http://www.nineentertainmentco.com.au/" target="_blank" rel="noopener noreferrer">Nine Digital</a>,
      {' '}
      I developed an understanding of the frameworks and architecture around which this website is based, including
      {' '}
      <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">Node.js</a>,
      {' '}
      <a href="https://facebook.github.io/react/" target="_blank" rel="noopener noreferrer">React</a>,
      {' '}
      <a href="http://redux.js.org/" target="_blank" rel="noopener noreferrer">Redux</a>,
      {' '}
      <a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer">Webpack</a>,
      {' '}
      <a href="https://github.com/css-modules/css-modules" target="_blank" rel="noopener noreferrer">CSS Modules</a>,
      {' '}
      etc. and have continually built upon this skillset since.
      {' '}
      I am extremely passionate about this combination of technologies,
      {' '}
      and I would look positively upon the opportunity to work with a similar mix in future.
    </P>
    <P className={styles.paragraph}>
      This website is an open-source project
      {' '}
      <a href={config.github.repoUrl} target="_blank" rel="noopener noreferrer">available on GitHub</a>.
      {' '}
      Please note that although the project itself is open-source, some images and content are protected by copyright.
    </P>
    <P className={styles.paragraph}>
      Feel free to take a look at my
      {' '}
      <Link to="/cv">online curriculum vitæ</Link>,
      {' '}
      or
      {' '}
      <Link to="/contact">contact me</Link>
      {' '}
      if you have any questions.
    </P>
  </SpecialLayout>
);

export default HomeView;
