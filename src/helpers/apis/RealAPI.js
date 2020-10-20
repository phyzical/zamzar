import camelcaseKeys from 'camelcase-keys';
import fetch from 'electron-fetch';
import {
  log,
} from '../helpers';

function RequestError(response, status) {
  this.status = status;
  const context = typeof response.context !== 'undefined' ? `'\n${response.context.reason}` : '';
  this.message = `${response.message}${context}`;
}

function checkResponseForErrors(response, status) {
  if (status !== 200 && status !== 201) {
    throw new RequestError(response, status);
  }
}

function generateRequestBody(theData) {
  return theData ? {
    body: JSON.stringify(theData),
  } : null;
}

function performFetch(url, method, body) {
  const headers = {
    Accept: 'application/json',
  };

  return fetch(url, {
    method,
    headers,
    ...generateRequestBody(body),
  });
}

function handleResponse(url, response, resolve, reject) {
  return response.json()
    .then((parsedResponse) => {
      log(`before processing ${url}`, parsedResponse, response.status);
      checkResponseForErrors(parsedResponse, response.status);
      resolve({
        body: camelcaseKeys(parsedResponse.data),
        status: response.status,
      });
    })
    .catch((error) => {
      reject({
        status: error.status,
        body: {
          message: error.message,
        },
      });
    });
}

function request(method, url, body) {
  return new Promise((resolve, reject) => {
    performFetch(url, method, body)
      .then((resp) => handleResponse(url, resp, resolve, reject))
      .catch((
        error
      ) => reject(RequestError(error, 500)));
  });
}

// eslint-disable-next-line
function GET(url, params) {
  let finalURL = url;
  let finalParams = params;
  if (finalParams) {
    finalParams = Object.keys(finalParams)
      .reduce((acc, val) => `${acc}&${val}=${encodeURIComponent(finalParams[val])}`,
        '')
      .substr(1);
    finalURL = `${finalURL}?${finalParams}`;
  }
  return request('GET', finalURL, null);
}
// eslint-disable-next-line
function POST(url, body) {
  return request('POST', url, body);
}

// eslint-disable-next-line
function PATCH(url, body) {
  return request('PATCH', url, body);
}

// eslint-disable-next-line
function PUT(url, body) {
  return request('PUT', url, body);
}

// eslint-disable-next-line
function DELETE(url, body) {
  return request('DELETE', url, body);
}

const testAPI = false;
const zamzarURL = testAPI ? 'https://sandbox.zamzar.com' : 'https://api.zamzar.com';
const apiV1URL = [zamzarURL, 'v1'].join('/');

// Accounts
const accountURL = [apiV1URL, 'account'].join('/');

function getAccount() {
  return GET(accountURL);
}

// Formats
const formatsURL = [apiV1URL, 'formats'].join('/');

function getFormat(format) {
  return GET([formatsURL, format].join('/'));
}

function getFormats() {
  return GET(formatsURL);
}

// Files
const filesURL = [apiV1URL, 'files'].join('/');

function uploadFile(fileName, fileData) {
  return POST(filesURL, {
    name: fileName,
    content: fileData,
  });
}

function checkFile(jobID) {
  return GET([filesURL, jobID].join('/'));
}

function checkFiles(jobID) {
  return GET([filesURL, jobID].join('/'));
}

function getFile(jobID) {
  return GET([filesURL, jobID, 'content'].join('/'));
}

function deleteFile(jobID) {
  return DELETE([filesURL, jobID].join('/'));
}

// imports
const importsURL = [apiV1URL, 'imports'].join('/');

function importFile(fileURL, fileName = null) {
  return POST(importsURL, {
    url: fileURL,
    filename: fileName,
  });
}

function checkImport(importID) {
  return GET([importsURL, importID].join('/'));
}

function checkImports() {
  return GET(importsURL);
}

// jobs
const jobsURL = [apiV1URL, 'jobs'].join('/');

function createJob(sourceFile, targetFormat) {
  return POST(jobsURL, {
    source_file: sourceFile,
    target_format: targetFormat,
  });
}

function getJob(jobID) {
  return GET([jobsURL, jobID].join('/'));
}

function getJobs() {
  return GET(jobsURL);
}

function cancelJob(jobID) {
  return DELETE([jobsURL, jobID].join('/'));
}

export default {
  getJobs,
  cancelJob,
  getJob,
  createJob,
  checkImports,
  checkImport,
  importFile,
  deleteFile,
  checkFiles,
  getFormat,
  getFormats,
  getFile,
  getAccount,
  checkFile,
  uploadFile,
};
