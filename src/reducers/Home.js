import initialState from '../helpers/initial-state';

export default function reducer(state = initialState.home, action) {
    switch (action.type) {
        default:
            return {
                ...state,
            };
    }
}
