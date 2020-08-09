const inputs = [
  'doc',
  'epub',
  'pdf',
  'csv',
];
const initialState = {
  app: {
    menuOpen: false,
  },
  home: {
    selectedInput: 'doc',
    inputs,
    outputs: inputs.reduce((acc, input) => {
      acc[input] = {
        outputs: [],
      };
      return acc;
    }, {}),
  },
  settings: {
    account: {},
  },
  history: {
    items: [],
  },
  api: {
    accounts: {
      fetching: false,
      status: null,
      error: null,
    },
    files: {
      fetching: false,
      status: null,
      error: null,
    },
    formats: {
      fetching: false,
      status: null,
      error: null,
    },
    imports: {
      fetching: false,
      status: null,
      error: null,
    },
    jobs: {
      fetching: false,
      status: null,
      error: null,
    },
  },
};

export default initialState;
