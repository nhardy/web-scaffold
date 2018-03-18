import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import cx from 'classnames';
import NProgress from 'nprogress';

import config from 'app/config';
import { checkStatus } from 'app/lib/fetch';
import { makeTitle } from 'app/lib/social';
import DefaultLayout from 'app/layouts/Default';
import P from 'app/components/P';
import form, { formShape } from 'app/components/Form/form';
import Text from 'app/components/Form/Text';
import TextArea from 'app/components/Form/TextArea';
import Email from 'app/components/Form/Email';
import Recaptcha from 'app/components/Form/Recaptcha';
import formStyles from 'app/components/Form/styles.styl';
import styles from './styles.styl';


const TITLE = 'Contact Me';
const DESCRIPTION = [
  'Get in contact with Nathan Hardy.',
  'Leave me a message and I\'ll endeavour to get back to you.',
].join(' ');

@form()
export default class ContactView extends Component {
  static propTypes = {
    form: formShape, // eslint-disable-line react/require-default-props
  };

  state = {
    submitting: false,
    sent: false,
    error: null,
  };

  submit = (e) => {
    e.preventDefault();
    this._submit.blur();

    if (!this.props.form.checkValidity()) {
      // error
      this.setState({
        error: 'Looks like you haven\'t filled out the form correctly. Please check the fields and try again.',
      });
    } else {
      this.setState({
        submitting: true,
        error: null,
      });
      NProgress.start();
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.props.form.getData()),
      })
        .then(checkStatus)
        .then(() => {
          this.setState({
            submitting: false,
            sent: true,
          });
        })
        .catch((error) => {
          this.setState({
            submitting: false,
            error: `An Error occurred when sending your message: ${error.message}. Please try again later.`,
          });
          this._captcha.reset();
        })
        .then(() => NProgress.done());
    }
  };

  reset = (e) => {
    e.preventDefault();
    this.setState({
      submitting: false,
      sent: false,
      error: null,
    });
  }

  render() {
    const { submitting, sent } = this.state;
    return (
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
        {!sent ? (
          <form className={formStyles.form}>
            <h1>Contact Me</h1>
            <P className={styles.paragraph}>
              Leave me a message and I&apos;ll endeavour to get back to you as soon as I can.
            </P>
            <label className={formStyles.label} htmlFor="contact-name">Name</label>
            <Text name="name" id="contact-name" pattern=".{2,100}" required placeholder="e.g. John Smith" autofocus />
            <label className={formStyles.label} htmlFor="contact-email">Email</label>
            <Email name="email" id="contact-email" required />
            <label className={formStyles.label} htmlFor="contact-subject">Subject</label>
            <Text name="subject" id="contact-subject" pattern=".{3,50}" required placeholder="e.g. Résumé" />
            <label className={formStyles.label} htmlFor="contact-message">Message</label>
            <TextArea name="message" id="contact-message" required placeholder="Type your message..." />
            <Recaptcha withRef={ref => (this._captcha = ref)} name="captcha" />
            <div className={cx(formStyles.errors, { [formStyles.hidden]: !this.state.error })}>
              {this.state.error}
            </div>
            <button
              ref={ref => (this._submit = ref)}
              className={formStyles.button}
              onClick={this.submit}
              disabled={submitting}
            >
              {submitting ? (
                <span>Sending...</span>
              ) : (
                <span>Send</span>
              )}
            </button>
          </form>
        ) : (
          <div>
            <h1>Thanks for your message!</h1>
            <P className={styles.paragraph}>I&apos;ll be in touch soon.</P>
            <P className={styles.paragraph}>Send <a href="/contact" onClick={this.reset}>another</a>?</P>
          </div>
        )}

      </DefaultLayout>
    );
  }
}
