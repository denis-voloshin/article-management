import { useEffect, useRef, useState } from 'react';
import _ from 'lodash/fp';
import * as PropTypes from 'prop-types';

import { initialState } from './index';
import { objectDiff } from '../utils';

export const DevTools = ({ state }) => {
  const devTools = useRef(null);
  const isInitialRender = useRef(true);

  const [prevState, setPrevState] = useState(state);

  useEffect(() => {
    devTools.current = typeof window !== 'undefined'
      && window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__.connect();

    if (devTools.current) {
      devTools.current.init(initialState);
    }
  }, []);

  useEffect(() => {
    if (!devTools.current) {
      return;
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;

      return;
    }

    const actionName = _.join(',', _.keys(objectDiff(prevState, state)));

    devTools.current.send(actionName, state);
    setPrevState(state);
  }, [state]);

  return null;
};

DevTools.propTypes = {
  state: PropTypes.any
};
