import actions from './actions.js';
import memoize from './selectors.js';
import reduce from './reducers.js';

export const STATE_CHANGE = 'STATE_CHANGE';

let currentState = null;

export function setup() {
  currentState = reduce(null, { type: null }, actions);
}

export function dispatch(action) {
  // thunk or not
  if (typeof action === 'function') {
    const resultActionObject = action(dispatch, getState, getActions);
    if (resultActionObject) {
      dispatch(resultActionObject);
    }
  } else {
    const state = reduce(currentState, action, actions);
    memoize(state, action, actions);
    currentState = state;
    document.dispatchEvent(new CustomEvent(STATE_CHANGE, { detail: {
      state, action, actions,
    }}));
  }
}

export function getActions() {
  return actions;
}

export function getState() {
  return currentState;
}

export function persist() {
  const name = 'persist';
  window.addEventListener('beforeunload', e => {
    localStorage.setItem(name, JSON.stringify(currentState));
  });
  let data = localStorage.getItem(name);
  if (data && data !== 'undefined' && actions.setProject) {
    dispatch(actions.setProject(JSON.parse(data)));
  }
}
