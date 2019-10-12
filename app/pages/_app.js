import React from 'react';
import NextApp from 'next/app';

import 'semantic-ui-css/semantic.min.css';

import { StoreProvider } from '../store';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    );
  }
}
