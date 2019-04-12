import {
    SET_INDEX_TAB_MENU
} from './types';

export const setIndexTabMenu = (index) => (
    {
        type: SET_INDEX_TAB_MENU,
        payload: index
    }
);

