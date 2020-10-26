import FakeAPI from './apis/FakeAPI';
import RealAPI from './apis/RealAPI';
import {
  getDispatch,
} from './store';

const fakeData = true;
const getAPI = fakeData ? FakeAPI : RealAPI;

// Accounts
// todo add dispatches for requests
export function getAccount() {
  const dispatch = getDispatch();
  dispatch({
    type: '',
  });
  return new Promise((resolve) => {
    getAPI.getAccount()
      .then((data) => {
        resolve();
      });
  });
}

// Formats
export function getFormat(format) {
  return getAPI.getFormat(format);
}

export function getFormats() {
  const dispatch = getDispatch();
  dispatch({
    type: 'API_FORMATS/FETCHING',
  });
  getAPI.getFormats()
    .then((data) => {
      dispatch({
        type: 'API_FORMATS/FETCHING_DONE',
        status: 200,
      });

      dispatch({
        type: 'HOME/SET_SELECTIONS',
        data: data.body.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: 'API_FORMATS/FETCHING_FAILURE',
        status: e.status,
        message: e.body.message,
      });
    });
}

// Files
export function uploadFile(fileName, fileData) {
  return getAPI.uploadFile(fileName, fileData);
}

export function checkFile(jobID) {
  return getAPI.checkFile(jobID);
}

export function checkFiles(jobID) {
  return getAPI.checkFiles(jobID);
}

export function getFile(jobID) {
  return getAPI.getFile(jobID);
}

export function deleteFile(jobID) {
  return getAPI.deleteFile(jobID);
}

// imports
export function importFile(fileURL, fileName) {
  return getAPI.importFile(fileURL, fileName);
}

export function checkImport(importID) {
  return getAPI.checkImport(importID);
}

export function checkImports() {
  return getAPI.checkImports();
}

// jobs
export function createJob(sourceFile, targetFormat) {
  return getAPI.createJob(sourceFile, targetFormat);
}

export function getJob(jobID) {
  return getAPI.getJob(jobID);
}

export function getJobs() {
  return getAPI.getJobs();
}

export function cancelJob(jobID) {
  return getAPI.cancelJob(jobID);
}
