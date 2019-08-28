
const initialState = {
  canvasHeight: 600,
  canvasWidth: 800,
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
