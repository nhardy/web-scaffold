// @ flow

import React from 'react';
import { Helmet } from 'react-helmet';

import config from 'app/config';
import { makeTitle } from 'app/lib/social';
import DefaultLayout from 'app/layouts/Default';
import P from 'app/components/P';
import YouTube from 'app/components/YouTube';
import styles from './styles.styl';


const TITLE = 'GovHack';
const DESCRIPTION = [
  'Experiences and Projects of GovHack 2016 and 2017.',
  'See GitHub projects, YouTube videos and more.',
].join('\n');

const GovHackView = () => (
  <DefaultLayout className={styles.root}>
    <Helmet>
      <title>{TITLE}</title>
      <meta property="og:title" content={makeTitle(TITLE)} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={config.twitter.handle} />
      <meta name="twitter:title" content={makeTitle(TITLE)} />
      <meta name="twitter:description" content={DESCRIPTION} />
    </Helmet>
    <h1><a href="https://www.govhack.org/" target="_blank" rel="noopener noreferrer">GovHack</a></h1>
    <h2><a href="https://www.twitter.com/GovHackNZ" target="_blank" rel="noopener noreferrer">GovHackNZ</a> 2017</h2>
    <P className={styles.paragraph}>
      As part of my time abroad in New Zealand, I participated in
      {' '}
      <a href="https://www.twitter.com/GovHackNZ" target="_blank" rel="noopener noreferrer">GovHackNZ</a>
      {' '}
      2017.
      {' '}
      I formed a team with three other individuals at the event, where we worked on
      {' '}
      <a href="https://github.com/nhardy/south-of-45" target="_blank" rel="noopener noreferrer">
        data journalism project
      </a>
      {' '}
      using a number of datasets, including the New Zealand Census (Stats NZ), electricity pricing history, and
      {' '}
      <a
        href="https://github.com/Phil-Wheeler/govhack-dunedin/tree/0b45ecbf0f808ee335acceaad56fa27e7417d201/data"
        target="_blank"
        rel="noopener noreferrer"
      >
        other datasets
      </a>
      {' '}
      provided by the
      {' '}
      <a href="https://www.dunedin.govt.nz/" target="_blank" rel="noopener noreferrer">Dunedin City Council</a>.
    </P>
    <P className={styles.paragraph}>
      Our submission was awarded two cash prizes, totalling NZ$1500 - the Open Government prize and the Dunedin City Council prize.
      {' '}
      You can read our submission &quot;South of 45&quot; on the
      {' '}
      <a href="https://2017.hackerspace.govhack.org/project/south-45" target="_blank" rel="noopener noreferrer">hackerspace</a>,
      {' '}
      or watch the
      {' '}
      <a href="https://youtu.be/fhVv2PB7Hg4" target="_blank" rel="noopener noreferrer">video pitch</a> that we submitted below.
    </P>
    <YouTube className={styles.player} videoId="fhVv2PB7Hg4" />
    <h2><a href="https://www.twitter.com/GovHackSydney" target="_blank" rel="noopener noreferrer">GovHackSydney</a> 2016</h2>
    <P className={styles.paragraph}>
      For GovHack 2016, our team, <em>{'//'}no&nbsp;comment</em> built a social network, entitled &quot;Tagger&quot;.
      {' '}
      Tagger allowed individuals to tag (its namesake) messages at points of interest described by the NSW POI database.
    </P>
    <P className={styles.paragraph}>
      You can read our submission on the
      {' '}
      <a href="https://2016.hackerspace.govhack.org/content/tagger" target="_blank" rel="noopener noreferrer">hackerspace</a>,
      {' '}
      or watch the
      {' '}
      <a href="https://youtu.be/3ne1Qaaas3g" target="_blank" rel="noopener noreferrer">video pitch</a> below.
    </P>
    <YouTube className={styles.player} videoId="3ne1Qaaas3g" />
  </DefaultLayout>
);

export default GovHackView;
