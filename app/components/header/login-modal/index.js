import React, { useState } from 'react';
import { Form } from 'react-final-form';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash/fp';

import { Modal } from '../../common/modal';
import { Button } from '../../common/button';
import { Tab } from '../../common/tab';
import { Register } from './register';
import { Login } from './login';

const CancelButton = styled(Button).attrs({
  children: 'Cancel'
})``;
const RegisterButton = styled(Button).attrs({
  children: 'Register',
  color: 'green'
})``;
const LoginButton = styled(Button).attrs({
  children: 'Login',
  color: 'green'
})``;

export const LoginModal = ({ className, isLoginModalShown, handleModelClose }) => {
  const modelViews = {
    login: 'Login',
    register: 'Register'
  };

  const initialValues = {
    login: '',
    password: '',
    passwordConfirmation: ''
  };

  const panes = [
    { menuItem: modelViews.login, render: () => <Login /> },
    { menuItem: modelViews.register, render: () => <Register /> },
  ];

  const [modelView, setModelView] = useState(modelViews.login);

  const handleTabChange = (e, data) => {
    if (data.activeIndex === 0) {
      return setModelView(modelViews.login);
    }

    return setModelView(modelViews.register);
  };

  const handleClearFormOnClose = clearForm => (...args) => {
    clearForm();
    handleModelClose(...args);
  };

  const handleFormSubmit = async () => {
    // Form submitted
  };

  return (
    <Form
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, form }) => (
        <Modal
          size="small"
          open={isLoginModalShown}
          className={className}
          onClose={handleClearFormOnClose(form.reset)}
          actions={(
            <>
              <CancelButton onClick={handleClearFormOnClose(form.reset)} />
              { modelView === modelViews.login && <LoginButton onClick={handleSubmit} /> }
              { modelView === modelViews.register && <RegisterButton onClick={handleSubmit} /> }
            </>
          )}
        >
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={handleTabChange}
          />
        </Modal>
      )}
    />
  );
};

LoginModal.propTypes = {
  className: PropTypes.string,
  isLoginModalShown: PropTypes.bool,
  handleModelClose: PropTypes.func
};

LoginModal.defaultProps = {
  handleModelClose: _.noop
};
