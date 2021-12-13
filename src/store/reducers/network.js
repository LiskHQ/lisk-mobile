import actionTypes from '../../constants/actions';

export const INITIAL_STATE = {
  height: 0,
  blockTime: 10,
};

/**
 * @param {Object} state
 * @param {String} state.height - Current height of node network
 * @param {Object} state.blockTime - Current block time of node network
 * @returns {Object}
 */

const networks = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.networkInfoUpdated:
      return action.data.payload;

    default:
      return state;
  }
};

export default networks;
