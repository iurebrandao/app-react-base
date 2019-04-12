import {
    SET_INDEX_TAB_MENU
} from '../actions/types';

const INITIAL_STATE = {
    index: 0
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_INDEX_TAB_MENU:
            return { ...state, index: action.payload };
        default:
            return state;
    }
}