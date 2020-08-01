import initialState from '../helpers/initial-state';

export default function reducer(state = initialState.app, action) {
    switch (action.type) {
        case 'APP/LOAD_END':
            return {
                ...state,
                loading: false,
            };
        case 'APP/SHOW_MENU':
            return {
                ...state,
                menuOpen: true,
            };
        case 'APP/HIDE_MENU':
            return {
                ...state,
                menuOpen: false,
            };
        default:
            return {
                ...state,
            };
    }
}
