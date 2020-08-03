import camelcaseKeys from 'camelcase-keys';
import {
    log
} from './helpers'

function RequestError(data) {
    this.status = data.status;
    this.message = data.message;
}

function checkResponseForErrors(response, status) {
    // if 401 returned redirect to login
    if (status === 401) {
        const message = 'Failed to authenticate';
        const formatted = formatItemizedErrorMessage(message, response);
        throw new RequestError({
            message: formatted,
            status: status
        });
    } else if (status !== 200 && status !== 201) {
        const formatted = formatItemizedErrorMessage("An error was encountered",
            response);
        throw new RequestError({
            message: formatted,
            status: status
        });
    }
}

function generateRequestBody(theData) {
    return theData ? {
        body: JSON.stringify(theData)
    } : null;
}

function performFetch(url, method, body, useFormData) {
    let headers = {
        Accept: 'application/json',
    };

    return fetch(url, {
        method,
        headers,
        ...generateRequestBody(body)
    });
}

function handleResponse(url, response, resolve, reject) {
    return response.json().then((parsedResponse) => {
        log(`before processing ${url}`, parsedResponse, response.status);
        checkResponseForErrors(parsedResponse, response.status, lookForErrorMessage);
        resolve({
            body: parsedResponse.data,
            status: response.status,
        });
    }).catch((error) => {
        reject({
            status: error.status,
            body: {
                message: error.message
            }
        });
    });
}

function request(method, url, body) {
    return new Promise((resolve, reject) => {
        performFetch(url, method, body, useFormData).then((resp) => {
            return handleResponse(url, resp, resolve, reject)
        }).catch((error) => {
            return reject({
                status: 500,
                body: {
                    message: error
                }
            })
        })
    })
}

async function FAKE(data, status = 200) {
    return {
        status: 200,
        body: camelcaseKeys(data, {
            deep: true
        }),
    };
}

// eslint-disable-next-line
export function GET(url, params) {
    if (params) {
        params = Object.keys(params).reduce((acc, val) => {
            return `${acc}&${val}=${encodeURIComponent(params[val])}`
        }, '').substr(1)
        url = `${url}?${params}`
    }
    return request('GET', url, null);
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

const fakeData = false;
const zambarURL = 'https://api.zamzar.com'
const apiV1URL = [zambarURL, 'v1'].join('/')

//Accounts
const accountURL = [apiV1URL, 'account'].join('/')
const accountFakeData = {
    "test_credits_remaining": 3,
    "credits_remaining": 18,
    "plan": {
        "name": "Developer",
        "price_per_month": 0,
        "conversions_per_month": 25,
        "maximum_file_size": 1048576
    }
}
//todo add dispatches for requests
export function getAccount() {
    return fakeData ? FAKE(accountFakeData) :
        GET(accountURL)
}

//Formats
const formatsURL = [apiV1URL, 'formats'].join('/')
const formatsFakeData = {
    "name": "doc",
    "targets": [{
            "name": "docx",
            "credit_cost": 1
        },
        {
            "name": "pdf",
            "credit_cost": 1
        }
    ]
}
export function getFormat(format) {
    return fakeData ? FAKE(formatsFakeData) :
        GET([formatsURL, format].join('/'))
}

const allFormatsFakeData = {
    "data": [{
            "name": "doc",
            "targets": [{
                    "name": "docx",
                    "credit_cost": 1
                },
                {
                    "name": "pdf",
                    "credit_cost": 1
                }
            ]
        }, {
            "name": "3g2",
            "targets": [{
                    "name": "3gp",
                    "credit_cost": 1
                },
                {
                    "name": "wmv",
                    "credit_cost": 1
                }
            ]
        },
        {
            "name": "msg",
            "targets": [{
                    "name": "doc",
                    "credit_cost": 2
                },
                ...{
                    "name": "xps",
                    "credit_cost": 2
                }
            ]
        }
    ],
    "paging": {
        "total_count": 104,
        "first": "3g2",
        "last": "msg",
        "limit": 50
    }
}

export function getAllFormats() {
    return fakeData ? FAKE(allFormatsFakeData) :
        GET(formatsURL)
}


//Files
const filesURL = [apiV1URL, 'files'].join('/')
const uploadFileFakeData = {
    "id": 3,
    "key": "GiVUYsF4A8ssq93FR48H",
    "name": "budget.xls",
    "size": 16519,
    "format": "xls",
    "created_at": "2013-10-27T13:41:00Z"
}

export function uploadFile(fileName, fileData) {
    return fakeData ? FAKE(uploadFileFakeData) :
        POST(filesURL, {
            name: fileName,
            content: fileData
        })
}

const checkFileFakeData = {
    "id": 3,
    "key": "GiVUYsF4A8ssq93FR48H",
    "name": "budget.xls",
    "size": 16519,
    "format": "xls",
    "created_at": "2013-10-27T13:41:00Z"
}

export function checkFile(jobID) {
    return fakeData ? FAKE(checkFileFakeData) :
        GET([filesURL, jobID].join('/'))
}

const checkFilesFakeData = {
    "data": [{
            "id": 5,
            "key": "GiVUYsF4A8ssq93FR48H",
            "name": "budget.xls.numbers",
            "size": 18533,
            "format": "numbers",
            "created_at": "2013-10-27T13:41:00Z"
        },
        {
            "id": 3,
            "key": "GiVUYsF4A8ssq93FR48H",
            "name": "budget.xls",
            "size": 16519,
            "format": "xls",
            "created_at": "2013-10-27T13:41:00Z"
        }
    ],
    "paging": {
        "total_count": 2,
        "first": 5,
        "last": 3,
        "limit": 50
    }
}

export function checkFiles(jobID) {
    return fakeData ? FAKE(checkFilesFakeData) :
        GET([filesURL, jobID].join('/'))
}

//todo
const getFileFakeData = {}
export function getFile(jobID) {
    return fakeData ? FAKE(getFileData) :
        GET([filesURL, jobID, 'content'].join('/'))
}

const deleteFileFakeData = {
    "id": 3,
    "key": "GiVUYsF4A8ssq93FR48H",
    "name": "budget.xls",
    "size": 16519,
    "format": "xls",
    "created_at": "2013-10-27T13:41:00Z"
}
export function deleteFile(jobID) {
    return fakeData ? FAKE(deleteFileFakeData) :
        DELETE([filesURL, jobID].join('/'))
}

//imports

//jobs
