const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const exp = require('constants');
const fs = require('fs');



async function csv_creator_fn(){
    const FILENAME = 'numbers.txt';

    // Creates CSV file with appropriate google import headers
    const csvWriter = createCsvWriter({
        path: 'contacts.csv',
        header: [
            { id: 'Name', title: 'Name' },
            { id: 'Family', title: 'Family Name' },
            { id: 'Type', title: 'Phone 1 - Type' },
            { id: 'Phone', title: 'Phone 1 - Value' }
        ]
    });
    
    let records = [];
    const numberList = fs.readFileSync(FILENAME).toString().split("\n");
    const numberListLength = numberList.length;
    // Adds all the numbers to the records array
    for(let i = 0; i < numberListLength; i ++){
        records.push({Name: `${(i+1)}`,Family: `${(i+1)}` ,Type: '', Phone: numberList[i]});
    }
    
    // Writes to the CSV
    console.log("Creating CSV");
    await csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
}
module.exports = {csv_creator_fn};