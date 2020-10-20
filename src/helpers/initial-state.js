const initialState = {
  app: {
    menuOpen: false,
  },
  home: {
    selectedInput: null,
    inputs: [],
    outputs: [],
  },
  settings: {
    apiKey: null,
    testCredits: 0,
    credits: 0,
    plan: {
      name: '',
      price: 0,
      conversions: 0,
      maxFileSize: 0,
    },
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
