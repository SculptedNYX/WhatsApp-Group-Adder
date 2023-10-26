const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

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
    records.push({Name: `${(i+2)}`,Family: 'WhatsAppAdder' ,Type: '', Phone: numberList[i]});
}

// Writes to the CSV
console.log("Creating CSV");
csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
