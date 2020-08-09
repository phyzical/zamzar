import FakeAPI from './apis/FakeAPI';
import RealAPI from './apis/RealAPI';

const fakeData = true;
const getAPI = fakeData ? FakeAPI : RealAPI;

// Accounts
// todo add dispatches for requests
export function getAccount() {
  return getAPI.getAccount();
}

// Formats
export function getFormat(format) {
  return getAPI.getFormat(format);
}

export function getAllFormats() {
  return getAPI.getAllFormats();
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
