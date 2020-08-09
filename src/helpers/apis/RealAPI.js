import camelcaseKeys from 'camelcase-keys';
import fetch from 'fetch';
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
export function GET(url, params) {
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
export function POST(url, body) {
  return request('POST', url, body);
}

// eslint-disable-next-line
export function PATCH(url, body) {
  return request('PATCH', url, body);
}

// eslint-disable-next-line
export function PUT(url, body) {
  return request('PUT', url, body);
}

// eslint-disable-next-line
export function DELETE(url, body) {
  return request('DELETE', url, body);
}

const testAPI = false;
const zamzarURL = testAPI ? 'https://sandbox.zamzar.com' : 'https://api.zamzar.com';
const apiV1URL = [zamzarURL, 'v1'].join('/');

// Accounts
const accountURL = [apiV1URL, 'account'].join('/');

export function getAccount() {
  return GET(accountURL);
}

// Formats
const formatsURL = [apiV1URL, 'formats'].join('/');

export function getFormat(format) {
  return GET([formatsURL, format].join('/'));
}

export function getAllFormats() {
  return GET(formatsURL);
}

// Files
const filesURL = [apiV1URL, 'files'].join('/');

export function uploadFile(fileName, fileData) {
  return POST(filesURL, {
    name: fileName,
    content: fileData,
  });
}

export function checkFile(jobID) {
  return GET([filesURL, jobID].join('/'));
}

export function checkFiles(jobID) {
  return GET([filesURL, jobID].join('/'));
}

export function getFile(jobID) {
  return GET([filesURL, jobID, 'content'].join('/'));
}

export function deleteFile(jobID) {
  return DELETE([filesURL, jobID].join('/'));
}

// imports
const importsURL = [apiV1URL, 'imports'].join('/');
export function importFile(fileURL, fileName = null) {
  return POST(importsURL, {
    url: fileURL,
    filename: fileName,
  });
}

export function checkImport(importID) {
  return GET([importsURL, importID].join('/'));
}

export function checkImports() {
  return GET(importsURL);
}

// jobs
const jobsURL = [apiV1URL, 'jobs'].join('/');

export function createJob(sourceFile, targetFormat) {
  return POST(jobsURL, {
    source_file: sourceFile,
    target_format: targetFormat,
  });
}

export function getJob(jobID) {
  return GET([jobsURL, jobID].join('/'));
}

export function getJobs() {
  return GET(jobsURL);
}

export function cancelJob(jobID) {
  return DELETE([jobsURL, jobID].join('/'));
}
