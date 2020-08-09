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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status,
        body: camelcaseKeys(data, {
          deep: true,
        }),
      });
    }, 1000);
  });
}

const randomRange = (min, max) => _range(_random(min, max));
const randomKey = () => Math.random()
  .toString(36)
  .substring(10);
const randomDate = () => (new Date())
  .toString();

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

const randomFormat = () => _sample(formats);

const getFormatResponse = (format) => {
  const targets = randomRange(1, 5)
    .map(() => ({
      name: randomFormat(),
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
  const data = randomRange(1, 50)
    .map(() => {
      const targets = randomRange(1, 5)
        .map(() => ({
          name: randomFormat(),
          credit_cost: _random(1, 3),
        }));
      return {
        name: randomFormat(),
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

const generateFileResponse = (jobID, fileName) => {
  const finalJobID = jobID || _random(1, 5000);
  const finalFileName = fileName || `${randomKey()}.${randomFormat()}`;
  return {
    id: finalJobID,
    key: randomKey(),
    name: finalFileName,
    size: _random(1, 5000),
    format: _last(finalFileName.split('.')),
    created_at: randomDate(),
  };
};

const uploadFileResponse = (fileName) => generateFileResponse(null, fileName);

export function uploadFile(fileName) {
  return FAKE(uploadFileResponse(fileName));
}

const checkFileResponse = (jobID) => generateFileResponse(jobID);

export function checkFile(jobID) {
  return FAKE(checkFileResponse(jobID));
}

const checkFilesResponse = () => {
  const data = randomRange(1, 50)
    .map(generateFileResponse());
  return {
    data,
    paging: {
      total_count: _size(data),
      first: _first(data).id,
      last: _last(data).id,
      limit: 50,
    },
  };
};
export function checkFiles() {
  return FAKE(checkFilesResponse());
}

// todo get a sample payload
const getFileResponse = {};
export function getFile(jobID) {
  return FAKE(getFileResponse);
}

const deleteFileResponse = (jobID) => generateFileResponse(jobID);

export function deleteFile(jobID) {
  return FAKE(deleteFileResponse(jobID));
}

// imports
const importFileResponse = (fileURL) => ({
  id: _random(1, 5000),
  key: randomKey(),
  url: fileURL,
  status: 'initialising',
  created_at: randomDate(),
  finished_at: null,
});

export function importFile(fileURL) {
  return FAKE(importFileResponse(fileURL));
}

const generateCheckImportResponse = (importID) => {
  const status = _sample(['successful', 'failed']);
  const ext = randomFormat();
  const filename = `${randomKey()}.${ext}`;
  const additionalResponses = status === 'failed' ? {
    code: _random(1, 50),
    message: `generic error message ${randomKey()}`,
  } : {
    id: _random(1, 50),
    name: filename,
    size: _random(1, 50000),
    format: ext,
  };
  return {
    id: importID || _random(1, 5000),
    key: randomKey(),
    url: `https://www.example.com/${filename}`,
    status,
    ...additionalResponses,
  };
};

const checkImportResponse = (importID) => generateCheckImportResponse(importID);

export function checkImport(importID) {
  return FAKE(checkImportResponse(importID));
}
const checkImportsResponse = () => {
  const data = randomRange(1, 50)
    .map(generateCheckImportResponse());
  return {
    data,
    paging: {
      total_count: _size(data),
      first: _first(data).id,
      last: _last(data).id,
      limit: 50,
    },
  };
};

export function checkImports() {
  return FAKE(checkImportsResponse());
}
// jobs
const createJobResponse = (sourceFile, targetFormat) => ({
  id: _random(1, 5000),
  key: randomKey(),
  status: 'initialising',
  created_at: randomDate(),
  finished_at: null,
  source_file: {
    id: _random(1, 5000),
    name: sourceFile,
    size: _random(1, 50000),
  },
  target_files: [],
  target_format: targetFormat,
  credit_cost: _random(1, 3),
});
export function createJob(sourceFile, targetFormat) {
  return FAKE(createJobResponse(sourceFile, targetFormat));
}

const generateJobResponse = (jobID) => {
  const status = _sample(['successful', 'initialising', 'cancelled']);
  const ext = randomFormat();
  const filename = randomKey();
  const newExt = randomFormat();

  const targetFiles = status === 'successful' ? [{
    id: _random(1, 5000),
    name: `${filename}.${newExt}`,
    size: _random(1, 50000),
  }] : [];
  return {
    id: jobID || _random(1, 5000),
    key: randomKey(),
    status,
    created_at: randomDate(),
    finished_at: null,
    source_file: {
      id: _random(1, 5000),
      name: `${filename}.${ext}`,
      size: _random(1, 50000),
    },
    target_files: targetFiles,
    target_format: newExt,
    credit_cost: _random(1, 3),
  };
};

const getJobResponse = (jobID) => generateJobResponse(jobID);
export function getJob(jobID) {
  return FAKE(getJobResponse(jobID));
}
const cancelJobResponse = (jobID) => {
  const result = generateJobResponse(jobID);
  result.status = 'cancelled';
  result.target_files = [];
  return result;
};
export function cancelJob(jobID) {
  return FAKE(cancelJobResponse(jobID));
}
const getJobsResponse = () => {
  const data = randomRange(1, 50)
    .map(generateCheckImportResponse());
  return {
    data,
    paging: {
      total_count: _size(data),
      first: _first(data).id,
      last: _last(data).id,
      limit: 50,
    },
  };
};
export function getJobs() {
  return FAKE(getJobsResponse());
}
