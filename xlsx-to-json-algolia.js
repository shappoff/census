var XlsxToJsonToGedcom = require('xlsx')
const fs = require('fs');

const {
    applicationID, adminAPIKey, index_name
} = process.env;

const algoliasearch = require("algoliasearch");

const client = algoliasearch(`${applicationID}`, `${adminAPIKey}`);
const index = client.initIndex(`${index_name}`);

fs.readdir('./xlsx/', (err, files) => {
    const census1925 = [];
    const census1926 = [];
    files.forEach((file) => {
        console.log(file);

        var workbook = XlsxToJsonToGedcom.readFile('./xlsx/' + file);
        var sheet_name_list = workbook.SheetNames;
        var xlData0 = XlsxToJsonToGedcom.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        var xlData1 = XlsxToJsonToGedcom.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);

        xlData0.map(({docnmb, fio, place, notes = '', year}, index, ss) => {
            census1925.push({docnmb, fio, place, notes, year, objectID: index});
        });

    });
    index.clearObjects().then(() => {
        return index.saveObjects(census1925).then(({ objectIDs }) => {
            console.log('objectIDs', JSON.stringify(objectIDs));
        })
    }).catch((e) => console.log('catch', e));
});