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

        xlData0.map(({docnmb, fio, place, notes = '', year, page, fod, nationality, total, male, female, literate, absent}, index, ss) => {
            fio && census1925.push({
                docnmb, fio, place, notes, year, page, fod, nationality, total, male, female, literate, absent,
                objectID: `${index}-1925`
            });
        });
        console.log(census1925.length);
        xlData1.map(({docnmb, fio, place, notes = '', year, page, fod, nationality, total, male, female, literate, absent}, index, ss) => {
            fio && census1925.push({
                docnmb, fio, place, notes, year, page, fod, nationality, total, male, female, literate, absent,
                objectID: `${index}-1926`
            });
        });
    });
    index.clearObjects().then((del) => {
        console.log('clearObjects', del);
        return index.saveObjects(census1925).then(({ objectIDs }) => {
            console.log('objectIDs', objectIDs.length);
            fs.writeFileSync(`./censusIndex.json`, `${JSON.stringify(census1925)}`, {encoding: 'utf8', flag: 'w'});
        })
    }).catch((e) => console.log('catch', e));
});