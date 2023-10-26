const FILENAME = 'numbers.txt';

// This library transforms the qr code into a scannable code in the terminal
const { exit } = require('process');
const qrcode = require('qrcode-terminal');

// Required to read from file
const fs = require('fs')
// Required for user terminal input
const prompt = require('prompt-sync')();

const { Client } = require('whatsapp-web.js');
const client = new Client();

// Passes the qr code info to the terminal generator when needed
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', async () => {
    console.log('Client is ready!');

    const groupName = prompt('Group name: ');

    //Grabs array of all the chats
    await client.getChats().then(async (chats) => {
        // Attempts to find the group by name
        const myGroup = chats.find((chat) => chat.name == groupName)

        // Checks if there is a valid return and that the return is a group
        if(myGroup && myGroup.isGroup){
            console.log("Found (%s)!", groupName);
            
            // Raeds all the text file nums
            const numberList = fs.readFileSync(FILENAME).toString().split("\n");
            const numberListLength = numberList.length;

            // Confirmation
            console.log("You are about to add %d members to %s", numberListLength, groupName);
            if(prompt("Type Y/y to confrim: ").toUpperCase() != 'Y'){
                console.log("Operation Canceled, exiting.");
                exit();
            }
            
            // This array carries the numbers whatsapp couldnt add
            let failedNumberList = new Array();
            // This array carries the numbers already existing in the group
            let dublicateNumberList = new Array();
            // This array carries the numbers that caused unaccounted for issues
            let unExcpectedErrorList = new Array();

            // Addition loop
            for(let i = 0; i < numberListLength; i++){
                // Removes all spaces from number
                let num = numberList[i].replace(/\s/g, '');

                console.log("%d %s", (i+1), num)
                // Formats the number into a whatsapp ID {CCnum@c.us} the country code (CC) is without the +
                if(num.substring(0,1) == '0'){
                    // This condition is purely there since egyptians start their numbers with 0's mostly instead of +20 so it adds the 2 at the start
                    num = 2 + num + '@c.us';
                }
                else if(num.substring(0,1) == '+'){
                    // This handles more global cases
                    num = num.substring(1) + '@c.us';
                }

                // The addition request itself using the formated number
                await myGroup.addParticipants([num]).catch((error) => {
                    let errorcase = error.toString();
                    if(errorcase.includes('invalid wid')){
                        // Incase the whatsapp ID was invalid for anycase
                        failedNumberList.push((i+1) + " " + numberList[i]);
                    }else if(errorcase.includes('Evaluation failed: V')){
                        // Incase dublication exists
                        dublicateNumberList.push((i+1) + " " + numberList[i]);
                    }else{
                        // A catch all array
                        unExcpectedErrorList.push((i+1) + " " + numberList[i]);
                    }
                });
            }
            
            console.log("Failed Numbers: ");
            console.log(failedNumberList);
            console.log("Dublicate Numbers: ");
            console.log(dublicateNumberList);
            console.log("Unexpected Errors: ");
            console.log(unExcpectedErrorList); 
        }
        else{
            console.log("No group with name (%s) was found, exiting.", groupName);
            exit()
        }
    });
    await exit();
});

client.initialize();