const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

if (!Array.prototype.flat) {
    Array.prototype.flat = function (maxDepth, currentDepth) {
        "use strict";
        var array = this;
        maxDepth = maxDepth === Infinity
            ? Number.MAX_SAFE_INTEGER
            : parseInt(maxDepth, 10) || 1;
        currentDepth = parseInt(currentDepth, 10) || 0;

        // It's not an array or it's an empty array, return the object.
        if (!Array.isArray(array) || !array.length) {
            return array;
        }

        // If the first element is itself an array and we're not at maxDepth,
        // flatten it with a recursive call first.
        // If the first element is not an array, an array with just that element IS the
        // flattened representation.
        // **Edge case**: If the first element is an empty element/an "array hole", skip it.
        // (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#Examples)
        var firstElemFlattened = (Array.isArray(array[0]) && currentDepth < maxDepth)
            ? array[0].flat(maxDepth, currentDepth + 1)
            : array[0] === undefined ? [] : [array[0]];

        return firstElemFlattened.concat(array.slice(1).flat(maxDepth, currentDepth));
    };
}

const {
    applicationID, adminAPIKey, index_name
} = process.env;

const algoliasearch = require("algoliasearch");

const client = algoliasearch(`${applicationID}`, `${adminAPIKey}`);
const index = client.initIndex(`${index_name}`);


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

const createobjectID = (fod, page, docnmb, total, index) => {
    return `${fod ? fod.replace('НАРБ-', '').replace('НАРБ', '') : index}-${`${page}`.replace('об', 'b')}-${docnmb}-${total}`.replace(/ /g, '');
}

const sheetsList = [
    {
        spreadsheetId: '1uFvynM7UY0mR-qwtZ-G6oj_ZSt94MNibOrUhiEtXxdY',
        tabRanges: ['1925!A1:O', '1926!A1:O'],
    }
];

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listMajors(auth) {

    const sheets = google.sheets({version: 'v4', auth});
    const sheetsListDataProm = await sheetsList.map(async ({spreadsheetId, tabRanges}) => {
        const tabRangesDataProm = await tabRanges.map(async (range) => {
            const tabRangesData = [];
            const res = await sheets.spreadsheets.values.get({spreadsheetId, range});
            const rows = res.data.values;
            if (!rows || rows.length === 0) {
                console.log('No data found.');
            }
            let titles = [];

            rows.forEach((row, rowIndex) => {
                const res = {index: rowIndex};
                if (rowIndex === 0) {
                    titles = row;
                } else {
                    row.forEach((cell, cellIndex) => {
                        const fieldName = titles[cellIndex];
                        if (fieldName === '№') {
                            return;
                        }
                        res[fieldName] = cell;
                    });
                }
                if (res.fio && res.fio.length) {
                    const {
                        docnmb,
                        fio,
                        place,
                        notes,
                        year,
                        page = '',
                        fod = '',
                        nationality,
                        total,
                        male = '',
                        female = '',
                        literate = '',
                        absent = '',
                        region,
                        area,
                        selsovet,
                        index
                    } = res;
                    const objectID = createobjectID(fod, page, docnmb, total, index);

                    const val = {
                        docnmb: isNaN(docnmb) ? '-' : +docnmb,
                        fio,
                        place,
                        notes,
                        year: isNaN(year) ? '-' : +year,
                        page,
                        fod,
                        nationality,
                        total: isNaN(total) ? total.length ? total : '-' : +total,
                        male: isNaN(male) ? male.length ? male : '-' : +male,
                        female: isNaN(female) ? female.length ? female : '-' : +female,
                        literate: isNaN(literate) ? literate.length ? literate : '-' : +literate,
                        absent: isNaN(absent) ? absent.length ? absent : '-' : +absent,
                        region,
                        area,
                        selsovet,
                        objectID
                    }

                    tabRangesData.push(val);
                }
            });

            return await Promise.resolve(tabRangesData);
        });
        return await Promise.all(tabRangesDataProm);
    });
    return await Promise.all(sheetsListDataProm);
}

authorize().then(listMajors).then((resultNested) => {
    const result = resultNested.flat(3);
    index.saveObjects(result).then(({objectIDs}) => {
        console.log('objectIDs', objectIDs.length);
        console.log('result', result.length);
        fs.writeFile(`./__censusIndex.json`, `${JSON.stringify(result)}`, {encoding: 'utf8', flag: 'w'});
    }).catch((e) => console.log('catch', e));

}).catch(console.error);