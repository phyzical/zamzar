import initialState from '../../helpers/initial-state';

export default function reducer(state = initialState.api.formats, action) {
  switch (action.type) {
    case 'API_FORMATS/FETCHING':
      return {
        ...state,
        fetching: true,
          status: null,
          error: null,
      };
    case 'API_FORMATS/FETCHING_DONE':
      return {
        ...state,
        fetching: false,
          status: action.status,
          error: '',
      };
    case 'API_FORMATS/FETCHING_FAILURE':
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
