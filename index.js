const prompt = require('prompt-sync')();
const google_contacts = require('./google_contacts');

(async () => {
    let choice = '';
    choice = prompt("Do you want to create a CSV for your google contacts? (required if numbers arent your contacts)... (Yes/No/Exit) ").toLowerCase();
    if(choice == 'yes'){
        await require('./csv_creator');
        await console.log("Please import the CSV file to google contacts");
    }
    else if (choice == 'Exit'){
        exit();
    }
    await console.log("Please make sure you are an admin in the group other wise all the numbers will be dumped in the dublicate numbers list");
    choice = prompt("Are the files synced on your google contacts app? (Yes/yes)").toLowerCase();
    if(choice == 'yes'){
        console.log("Generating whatsapp web QR code");
        await require('./whatsapp_adder');
    }
})();