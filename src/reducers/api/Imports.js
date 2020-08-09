import initialState from '../../helpers/initial-state';

export default function reducer(state = initialState.api.imports, action) {
  switch (action.type) {
    case 'API_IMPORTS/FETCHING':
      return {
        ...state,
        fetching: true,
          status: null,
          error: null,
      };
    case 'API_IMPORTS/FETCHING_DONE':
      return {
        ...state,
        fetching: false,
          status: action.status,
          error: '',
      };
    case 'API_IMPORTS/FETCHING_FAILURE':
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
