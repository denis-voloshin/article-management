import React from 'react';
import styled from 'styled-components';

import { Heading } from '../common/heading';
import { Button } from '../common/button';

const HeaderContainer = styled.header`
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 5px 3px #cdcdcd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled(Heading).attrs({
  as: 'h1',
  children: 'Header'
})``;

const LoginButton = styled(Button).attrs({
  children: 'Login',
  color: 'blue'
})``;

export const Header = () => (
  <HeaderContainer>
    <HeaderText />
    <LoginButton />
  </HeaderContainer>
);
