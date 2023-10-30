const prompt = require('prompt-sync')();
const csv = require('./csv_creator');
(async () => {
    let choice = '';
    choice = prompt("Do you want to create and import a CSV? (required if numbers arent your contacts)... (Yes/No/Exit) ").toLowerCase();
    if(choice == 'yes'){
        await csv.csv_creator_fn();
    }
    else if (choice == 'Exit'){
        exit();
    }

    choice = prompt("Are the files synced on your google contacts app? (Yes/yes)").toLowerCase();
    if(choice == 'yes'){
        console.log("Generating whatsapp web QR code");
        require('./whatsapp_adder');
    }
})();