import initialState from '../helpers/initial-state';
import accounts from './api/Accounts';
import files from './api/Files';
import formats from './api/Formats';
import imports from './api/Imports';
import jobs from './api/Jobs';

export default function reducer(state = initialState.api, action) {
  switch (action.type) {
    default:
      return {
        ...state,
        accounts: accounts(state.accounts, action),
          files: files(state.files, action),
          formats: formats(state.formats, action),
          imports: imports(state.imports, action),
          jobs: jobs(state.jobs, action),
      };
  }
}
