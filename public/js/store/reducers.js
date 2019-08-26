
const defaultState = {
};

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 * @param {String} action.type
 */
export default function reduce(state = defaultState, action, actions = {}) {
  switch (action.type) {
    default:
      return state ? state : defaultState;
  }
}
