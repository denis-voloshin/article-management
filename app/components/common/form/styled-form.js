import React from 'react';
import { Form as SemanticForm } from 'semantic-ui-react';

export const StyledForm = props => {
  const handleFormSubmit = e => e.preventDefault();

  return <SemanticForm onSubmit={handleFormSubmit} {...props} />;
};
