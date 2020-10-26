import initialState from '../helpers/initial-state';

export default function reducer(state = initialState.home, action) {
  switch (action.type) {
    case 'HOME/SET_SELECTIONS':
      return {
        ...state,
        outputs: action.data,
          inputs: action.data.map((input) => input.name),
      };
    default:
      return {
        ...state,
      };
  }
}
