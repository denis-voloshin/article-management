import React from 'react';
import styled from 'styled-components';
import { Header as SemanticHeader } from 'semantic-ui-react';

const StyledHeader = styled(SemanticHeader)`
  margin: 0;
`;

export const Heading = props => (
  <StyledHeader {...props}>
    { props.children }
  </StyledHeader>
);
