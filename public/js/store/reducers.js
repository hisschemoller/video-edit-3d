
const initialState = {
  canvasHeight: 9 * 60,
  canvasWidth: 16 * 60,
};

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 * @param {String} action.type
 */
export default function reduce(state = initialState, action, actions = {}) {
  switch (action.type) {

    case actions.SET_PROJECT:
      return { 
        ...initialState,
        // ...(action.data || {}),
      };

    default:
      return state ? state : initialState;
  }
}
