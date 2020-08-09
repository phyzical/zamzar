import initialState from '../../helpers/initial-state';

export default function reducer(state = initialState.api.account, action) {
  switch (action.type) {
    case 'API_ACCOUNT/FETCHING':
      return {
        ...state,
        fetching: true,
          status: null,
          error: null,
      };
    case 'API_ACCOUNT/FETCHING_DONE':
      return {
        ...state,
        fetching: false,
          status: action.status,
          error: '',
      };
    case 'API_ACCOUNT/FETCHING_FAILURE':
      return {
        ...state,
        fetching: false,
          status: action.status,
          error: action.message,
      };
    default:
      return {
        ...state,
      };
  }
}
