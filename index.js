const prompt = require('prompt-sync')();
const google_contacts = require('./google_contacts');

(async () => {
    const choice = prompt("Do you want to create and import a CSV? (required if numbers arent your contacts)... (Yes/No/Exit) ").toLowerCase();
    if(choice == 'yes'){
        const email =  prompt("Enter you google contacts Gmail: ");
        const password =  prompt("Enter you google contacts password: ");
        await require('./csv_creator');
        await google_contacts.importContacts(email, password);
    }
    else if (choice == 'Exit'){
        exit();
    }

    console.log("Generating whatsapp web QR code");

    await require('./whatsapp_adder');
})();