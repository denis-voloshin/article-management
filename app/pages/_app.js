import React from 'react';
import App from 'next/app';

import 'semantic-ui-css/semantic.min.css';

export default class NextApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}
