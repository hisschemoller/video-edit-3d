
const SET_PROJECT = 'SET_PROJECT';

// actions
export default {

  SET_PROJECT,
  setProject: (data = {}) => ({ type: SET_PROJECT, data, }),
};
