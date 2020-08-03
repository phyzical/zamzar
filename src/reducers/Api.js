import initialState from '../helpers/initial-state';

export default function reducer(state = initialState.api, action) {
    switch (action.type) {
        default:
            return {
                ...state,
            };
    }
}
