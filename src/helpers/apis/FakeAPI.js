import {
  random as _random,
  sample as _sample,
  range as _range,
  first as _first,
  last as _last,
  size as _size,
} from 'lodash';
import camelcaseKeys from 'camelcase-keys';

async function FAKE(data, status = 200) {
  return {
    status,
    body: camelcaseKeys(data, {
      deep: true,
    }),
  };
}

// account
const accountResponse = {
  test_credits_remaining: _random(1, 40),
  credits_remaining: _random(1, 40),
  plan: {
    name: 'Developer',
    price_per_month: 0,
    conversions_per_month: _random(1, 40),
    maximum_file_size: 1048576,
  },
};

export function getAccount() {
  return FAKE(accountResponse);
}
// formats

const formats = [
  'docx',
  'doc',
  'pdf',
  'mp3',
  'wmv',
  '3gp',
  'xps',
  'xls',
];

const randomRange = (min, max) => _range(_random(min, max));

const getFormatResponse = (format) => {
  const targets = randomRange(1, 5).map(() => ({
    name: _sample(formats),
    credit_cost: _random(1, 3),
  }));

  return {
    name: format,
    targets,
  };
};
export function getFormat(format) {
  return FAKE(getFormatResponse(format));
}
const getFormatsResponse = () => {
  const data = randomRange(1, 50).map(() => {
    const targets = randomRange(1, 5).map(() => ({
      name: _sample(formats),
      credit_cost: _random(1, 3),
    }));
    return {
      name: _sample(formats),
      targets,
    };
  });
  return {
    data,
    paging: {
      total_count: _size(data),
      first: _first(data).name,
      last: _last(data).name,
      limit: 50,
    },
  };
};

export function getFormats() {
  return FAKE(getFormatsResponse());
}
// files

const uploadFileResponse = (fileName) => ({
  id: _random(1, 5000),
  key: 'GiVUYsF4A8ssq93FR48H',
  name: fileName,
  size: _random(1, 5000),
  format: _last(fileName.split('.')),
  created_at: (new Date()).toString(),
});
export function uploadFile(fileName, fileData) {
  return FAKE(uploadFileResponse(fileName));
}

const checkFileResponse = {
  id: 3,
  key: 'GiVUYsF4A8ssq93FR48H',
  name: 'budget.xls',
  size: 16519,
  format: 'xls',
  created_at: '2013-10-27T13:41:00Z',
};
export function checkFile(jobID) {
  return FAKE(checkFileResponse);
}

const checkFilesResponse = {
  data: [{
      id: 5,
      key: 'GiVUYsF4A8ssq93FR48H',
      name: 'budget.xls.numbers',
      size: 18533,
      format: 'numbers',
      created_at: '2013-10-27T13:41:00Z',
    },
    {
      id: 3,
      key: 'GiVUYsF4A8ssq93FR48H',
      name: 'budget.xls',
      size: 16519,
      format: 'xls',
      created_at: '2013-10-27T13:41:00Z',
    },
  ],
  paging: {
    total_count: 2,
    first: 5,
    last: 3,
    limit: 50,
  },
};
export function checkFiles(jobID) {
  return FAKE(checkFilesResponse);
}

// todo get a sample payload
const getFileResponse = {};
export function getFile(jobID) {
  return FAKE(getFileResponse);
}

const deleteFileResponse = {
  id: 3,
  key: 'GiVUYsF4A8ssq93FR48H',
  name: 'budget.xls',
  size: 16519,
  format: 'xls',
  created_at: '2013-10-27T13:41:00Z',
};
export function deleteFile(jobID) {
  return FAKE(deleteFileResponse);
}
// imports

const importFileResponse = {
  id: 1,
  key: 'GiVUYsF4A8ssq93FR48H',
  url: 'https://www.example.com/logo.png',
  status: 'initialising',
  created_at: '2013-10-27T13:41:00Z',
  finished_at: null,
};
export function importFile(fileURL, fileName) {
  return FAKE(importFileResponse);
}
const checkImportResponse = {
  id: 1,
  key: 'GiVUYsF4A8ssq93FR48H',
  url: 'https://www.example.com/logo.png',
  status: 'successful',
  file: {
    id: 42,
    name: 'logo.png',
    size: 47577,
    format: 'png',
  },
};
export function checkImport(importID) {
  return FAKE(checkImportResponse);
}
const checkImportsResponse = {
  data: [{
      id: 2,
      key: 'GiVUYsF4A8ssq93FR48H',
      url: 'https://www.example.com/huge.zip',
      status: 'failed',
      failure: {
        code: 3,
        message: 'The size of the imported file (1.2 GB) exceeds the maximum file size cap for the current plan (1 GB).',
      },
    },
    {
      id: 1,
      key: 'GiVUYsF4A8ssq93FR48H',
      url: 'https://www.example.com/logo.png',
      status: 'successful',
      file: {
        id: 42,
        name: 'logo.png',
        size: 47577,
        format: 'png',
      },
    },
  ],
  paging: {
    total_count: 2,
    first: 2,
    last: 1,
    limit: 50,
  },
};
export function checkImports() {
  return FAKE(checkImportsResponse);
}
// jobs
const createJobResponse = {
  id: 15,
  key: 'GiVUYsF4A8ssq93FR48H',
  status: 'initialising',
  sandbox: true,
  created_at: '2013-10-27T13:41:00Z',
  finished_at: null,
  source_file: {
    id: 2,
    name: 'portrait.gif',
    size: 90571,
  },
  target_files: [],
  target_format: 'png',
  credit_cost: 1,
};
export function createJob(sourceFile, targetFormat) {
  return FAKE(createJobResponse);
}

const getJobResponse = {
  id: 15,
  key: 'GiVUYsF4A8ssq93FR48H',
  status: 'successful',
  sandbox: true,
  created_at: '2013-10-27T13:41:00Z',
  finished_at: '2013-10-27T13:41:13Z',
  source_file: {
    id: 2,
    name: 'portrait.gif',
    size: 90571,
  },
  target_files: [{
    id: 3,
    name: 'portrait.png',
    size: 15311,
  }],
  target_format: 'png',
  credit_cost: 1,
};
export function getJob(jobID) {
  return FAKE(getJobResponse);
}
const cancelJobResponse = {
  id: 1,
  key: 'GiVUYsF4A8ssq93FR48H',
  status: 'cancelled',
  sandbox: false,
  created_at: '2013-10-27T13:41:00Z',
  finished_at: null,
  source_file: {
    id: 1,
    name: 'budget.xls',
    size: 16519,
  },
  target_files: [],
  target_format: 'xlsx',
  credit_cost: 1,
};
export function cancelJob(jobID) {
  return FAKE(cancelJobResponse);
}
const getJobsResponse = {
  data: [{
      id: 18,
      key: 'GiVUYsF4A8ssq93FR48H',
      status: 'successful',
      sandbox: false,
      created_at: '2013-10-27T13:41:00Z',
      finished_at: '2013-10-27T13:41:13Z',
      source_file: {
        id: 3,
        name: 'invitations.doc',
        size: 38301,
      },
      target_files: [{
        id: 14,
        name: 'invitations.pdf',
        size: 0,
      }],
      target_format: 'pdf',
      credit_cost: 1,
    },
    {
      id: 3,
      key: 'GiVUYsF4A8ssq93FR48H',
      status: 'initialising',
      sandbox: false,
      created_at: '2013-10-27T13:41:00Z',
      finished_at: null,
      source_file: {
        id: 2,
        name: 'guest_list.xls',
        size: 7392,
      },
      target_files: [],
      target_format: 'xlsx',
      credit_cost: 1,
    },
    {
      id: 1,
      key: 'GiVUYsF4A8ssq93FR48H',
      status: 'cancelled',
      sandbox: false,
      created_at: '2013-10-27T13:41:00Z',
      finished_at: null,
      source_file: {
        id: 1,
        name: 'budget.xls',
        size: 16519,
      },
      target_files: [],
      target_format: 'xlsx',
      credit_cost: 1,
    },
  ],
  paging: {
    total_count: 3,
    first: 18,
    last: 1,
    limit: 50,
  },
};
export function getJobs() {
  return FAKE(getJobsResponse);
}
