import React, { createContext, useContext, useReducer } from 'react';
import produce from 'immer';
import * as PropTypes from 'prop-types';

import { DevTools } from './dev-tools';

export const initialState = {
  test: 'test'
};

const StateContext = createContext(initialState);
const UpdaterContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [state, updater] = useReducer(produce, initialState);

  return (
    <UpdaterContext.Provider value={updater}>
      <StateContext.Provider value={state}>
        { process.env.NODE_ENV !== 'production' && <DevTools state={state} /> }
        { children }
      </StateContext.Provider>
    </UpdaterContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useStore = () => [useContext(StateContext), useContext(UpdaterContext)];
