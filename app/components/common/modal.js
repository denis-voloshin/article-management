import React from 'react';
import * as PropTypes from 'prop-types';
import { Modal as SemanticModal } from 'semantic-ui-react';

export const Modal = ({ header, actions, children, ...props }) => (
  <SemanticModal {...props}>
    { header && <SemanticModal.Header>{ header }</SemanticModal.Header> }
    <SemanticModal.Content>
      { children }
    </SemanticModal.Content>
    { actions && <SemanticModal.Actions>{ actions }</SemanticModal.Actions> }
  </SemanticModal>
);

Modal.propTypes = {
  header: PropTypes.node,
  actions: PropTypes.node,
  children: PropTypes.node
};
