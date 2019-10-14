import React from 'react';
import { Field } from 'react-final-form';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormInput, StyledForm } from '../../common/form';

const Wrapper = styled.div``;

const LoginInput = styled(FormInput).attrs({
  label: 'Login'
})``;
const PasswordInput = styled(FormInput).attrs({
  label: 'Password',
  type: 'password'
})``;

export const Register = ({ className }) => (
  <Wrapper className={className}>
    <StyledForm>
      <Field
        name="login"
        render={({ input }) => <LoginInput {...input} />}
      />
      <Field
        name="password"
        render={({ input }) => <PasswordInput {...input} />}
      />
      <Field
        name="passwordConfirmation"
        render={({ input }) => <PasswordInput {...input} />}
      />
    </StyledForm>
  </Wrapper>
);

Register.propTypes = {
  className: PropTypes.string
};
