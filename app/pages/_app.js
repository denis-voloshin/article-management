import React from 'react';
import NextApp from 'next/app';

import 'semantic-ui-css/semantic.min.css';

import { StoreProvider } from '../store';
import { Header } from '../components/header';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
  
  table {
    border-collapse: collapse;
  }
  
  body {
    background: #e2e2e2;
  }
`;

const Content = styled.main`
  padding: 20px;
`;

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <StoreProvider>
        <GlobalStyles />
        <Header />
        <Content>
          <Component {...pageProps} />
        </Content>
      </StoreProvider>
    );
  }
}
