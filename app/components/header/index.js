import React, { useState } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

import { Heading } from '../common/heading';
import { Button } from '../common/button';
import { LoginModal } from './login-modal';

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
  children: 'Login/register',
  color: 'blue'
})``;

export const Header = ({ className }) => {
  const [isLoginModalShown, setIsLoginModalShown] = useState(false);

  const handleModelShow = () => setIsLoginModalShown(true);
  const handleModelClose = () => setIsLoginModalShown(false);

  return (
    <HeaderContainer className={className}>
      <HeaderText />
      <LoginButton onClick={handleModelShow} />
      <LoginModal
        isLoginModalShown={isLoginModalShown}
        handleModelClose={handleModelClose}
      />
    </HeaderContainer>
  );
};

Header.propTypes = {
  className: PropTypes.string
};
