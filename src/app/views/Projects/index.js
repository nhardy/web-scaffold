import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { get } from 'lodash-es';

import config from 'app/config';
import { setRouteError } from 'app/actions/routeError';
import { getReposByUsername } from 'app/actions/github';
import { makeAbsoluteUrl, makeTitle } from 'app/lib/social';
import DefaultLayout from 'app/layouts/Default';
import P from 'app/components/P';
import GitHubRepo from 'app/components/GitHub/Repo';
import Breakout from 'app/components/Breakout';
import Slider from 'app/components/Slider';
import developerProfileImg from 'app/assets/images/developer-profile.jpg';
import websiteImg from 'app/assets/images/portfolio/website.png';
import utsHelpsLoginImg from 'app/assets/images/portfolio/uts-helps-login.png';
import utsHelpsSessionImg from 'app/assets/images/portfolio/uts-helps-session.png';
import stickiesLoginImg from 'app/assets/images/portfolio/stickies-login.png';
import styles from './styles.styl';


const TITLE = 'Projects';
const DESCRIPTION = [
  'A list of projects worked on by web developer, Nathan Hardy.',
  'Take a look through a list of GitHub repos and other projects.',
].join(' ');

@asyncConnect([
  {
    promise: async ({ store: { dispatch, getState } }) => {
      const loaded = () => get(getState().github.reposByUsername, [config.github.username, 'owner', 'loaded'], false);

      if (loaded()) return;

      await dispatch(getReposByUsername(config.github.username, { sort: 'pushed' }));

      if (!loaded()) {
        dispatch(setRouteError({ status: 500 }));
      }
    },
  },
])
@connect(state => ({
  repos: (state.github.reposByUsername[config.github.username].owner.value || []).filter(({ fork }) => !fork),
}))
export default class ProjectsView extends Component {
  static propTypes = {
    repos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })).isRequired,
  };

  render() {
    const { repos } = this.props;

    return (
      <DefaultLayout className={styles.root}>
        <Helmet>
          <title>{TITLE}</title>
          <meta property="og:title" content={makeTitle(TITLE)} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:image" content={makeAbsoluteUrl(developerProfileImg)} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={config.twitter.handle} />
          <meta name="twitter:title" content={makeTitle(TITLE)} />
          <meta name="twitter:description" content={DESCRIPTION} />
          <meta name="twitter:image" content={makeAbsoluteUrl(developerProfileImg)} />
        </Helmet>
        <h1>Projects</h1>
        <P className={styles.paragraph}>
          I have worked as professionally as part of a team on a variety of web applications and services in use by the general public.
          {' '}
          These include the APIs and public website of
          {' '}
          <a href="https://www.9now.com.au/" target="_blank" rel="noopener noreferrer">9Now</a>,
          {' '}
          Channel 9&apos;s live streaming and video-on-demand platform, as well as the
          {' '}
          <a href="https://www.appliancesonline.com.au" target="_blank" rel="noopener noreferrer">Appliances Online website</a>,
          {' '}
          and the as-yet unreleased
          {' '}
          <a href="https://freeviewnz.tv/" target="_blank" rel="noopener noreferrer">Freeview New Zealand</a>
          {' '}
          <abbr title="Hybrid Broadband Broadcast Television">HbbTV</abbr>
          {' '}
          application.
        </P>
        <h2>GitHub</h2>
        <P className={styles.paragraph}>
          Below are a list of projects that I have created and published to GitHub.
          {' '}
          I have also contributed to a number of open source JavaScript projects as a result of my professional and personal work,
          {' '}
          and you can see these in
          {' '}
          <a href="https://github.com/nhardy?tab=repositories&q=&type=fork" target="_blank" rel="noopener noreferrer">my forks on GitHub</a>.
        </P>
        <ul className={styles.repos}>
          {repos.map(repo => (
            <li key={repo.id} className={styles.repo}>
              <GitHubRepo key={repo.id} repo={repo} />
            </li>
          ))}
          {/* TODO: Pagination/Tabs */}
        </ul>
        <h2>Snapshot Portfolio</h2>
        <Breakout>
          <Slider autoplay>
            <img className={styles.slide} src={websiteImg} alt="This website" />
            <img className={styles.slide} src={utsHelpsLoginImg} alt="UTS: HELPS Booking System - Login" />
            <img className={styles.slide} src={utsHelpsSessionImg} alt="UTS: HELPS Booking System - Session Information" />
            <img className={styles.slide} src={stickiesLoginImg} alt="Stickies - Login" />
          </Slider>
        </Breakout>
        <P className={styles.paragraph}>
          The above slider is a work-in-progress that was created for use in a University assignment.
          {' '}
          Its design is not yet complete, and will be improved for the purposes of this site at a later date.
          {' '}
          The images feature a number of different responsive design website projects that I have worked on,
          {' '}
          including a number of University projects.
        </P>
      </DefaultLayout>
    );
  }
}
