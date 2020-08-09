import initialState from '../../helpers/initial-state';

export default function reducer(state = initialState.api.jobs, action) {
  switch (action.type) {
    case 'API_JOBS/FETCHING':
      return {
        ...state,
        fetching: true,
          status: null,
          error: null,
      };
    case 'API_JOBS/FETCHING_DONE':
      return {
        ...state,
        fetching: false,
          status: action.status,
          error: '',
      };
    case 'API_JOBS/FETCHING_FAILURE':
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
