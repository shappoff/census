var XlsxToJsonToGedcom = require('xlsx')
const fs = require('fs');

const {
    applicationID, adminAPIKey, index_name
} = process.env;

const algoliasearch = require("algoliasearch");

const client = algoliasearch(`${applicationID}`, `${adminAPIKey}`);
const index = client.initIndex(`${index_name}`);

const createobjectID = (fod, page, docnmb, total, index) => {
    return `${fod ? fod.replace('НАРБ-', '').replace('НАРБ', '') : index}-${`${page}`.replace('об', 'b')}-${docnmb}-${total}`.replace(/ /g, '');
}

fs.readdir('./xlsx/', (err, files) => {
    const census1925 = [];
    files.forEach((file) => {
        console.log(file);

        var workbook = XlsxToJsonToGedcom.readFile('./xlsx/' + file);
        var sheet_name_list = workbook.SheetNames;
        var xlData0 = XlsxToJsonToGedcom.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        var xlData1 = XlsxToJsonToGedcom.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);

        xlData0.map(({
                         docnmb,
                         fio,
                         place,
                         notes = '',
                         year,
                         page = '',
                         fod = '',
                         nationality,
                         total,
                         male = '-',
                         female = '-',
                         literate = '-',
                         absent = '-',
                         region, area, selsovet
                     }, index, ss) => {
            const objectID = createobjectID(fod, page, docnmb, total, index);
            fio && census1925.push({
                docnmb,
                fio,
                place,
                notes,
                year,
                page,
                fod,
                nationality,
                total,
                male,
                female,
                literate,
                absent,
                region,
                area,
                selsovet,
                objectID
            });
        });
        xlData1.map(({
                         docnmb,
                         fio,
                         place,
                         notes = '',
                         year,
                         page = '',
                         fod = '',
                         nationality,
                         total,
                         male = '-',
                         female = '-',
                         literate = '-',
                         absent = '-', region, area, selsovet
                     }, index, ss) => {
            const objectID = createobjectID(fod, page, docnmb, total, index);
            fio && census1925.push({
                docnmb,
                fio,
                place,
                notes,
                year,
                page,
                fod,
                nationality,
                total,
                male,
                female,
                literate,
                absent,
                region,
                area,
                selsovet,
                objectID
            });
        });
    });
    index.saveObjects(census1925).then(({objectIDs}) => {
        console.log('objectIDs', objectIDs.length);
        fs.writeFileSync(`./censusIndex.json`, `${JSON.stringify(census1925)}`, {encoding: 'utf8', flag: 'w'});
    }).catch((e) => console.log('catch', e));
});