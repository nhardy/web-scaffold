import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import FontAwesome from 'app/components/FontAwesome';
import Icon from 'app/components/Icon';
import styles from './styles.styl';


const GitHubRepo = ({ repo }) => {
  const {
    name,
    html_url: url,
    owner: {
      avatar_url: avatarUrl,
      login: username,
      html_url: profileUrl,
    },
    description,
    language,
    forks_count: forksCount,
    stargazers_count: stargazersCount,
    watchers_count: watchersCount,
  } = repo;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.name}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></h3>
        <a className={styles.profile} href={profileUrl} target="_blank" rel="noopener noreferrer">
          <img src={avatarUrl} alt={username} />
        </a>
      </div>
      <div className={styles.info}>
        <p className={styles.description}>{description || 'This repository has no description yet'}</p>
      </div>
      <div className={styles.meta}>
        <div className={styles.language}>
          <Icon className={styles.icon} name={language.toLowerCase()} image />
          <span>{language}</span>
        </div>
        <a className={styles.watchers} href={`${url}/watchers`} target="_blank" rel="noopener noreferrer">
          <FontAwesome className={cx(styles.pictogram, 'fa-eye')} />
          <span>{watchersCount}</span>
        </a>
        <a className={styles.forks} href={`${url}/network`} target="_blank" rel="noopener noreferrer">
          <FontAwesome className={cx(styles.pictogram, 'fa-code-fork')} />
          <span>{forksCount}</span>
        </a>
        <a className={styles.stargazers} href={`${url}/stargazers`} target="_blank" rel="noopener noreferrer">
          <FontAwesome className={cx(styles.pictogram, 'fa-star')} />
          <span>{stargazersCount}</span>
        </a>
      </div>
    </div>
  );
};

GitHubRepo.propTypes = {
  repo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default GitHubRepo;
