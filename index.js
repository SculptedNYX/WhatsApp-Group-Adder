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
            
            let failedNumberList = new Array();
            let dublicateNumberList = new Array();
            let weirdErrorList = new Array();

            // Addition loop
            for(let i = 0; i < numberListLength; i++){
                let num = numberList[i].replace(/\s/g, '');
                console.log("%d %s", (i+1), num)
                if(num.substring(0,1) == '0'){
                    num = 2 + num + '@c.us';
                }
                else if(num.substring(0,1) == '+'){
                    num = num.substring(1) + '@c.us';
                }

                await myGroup.addParticipants([num]).catch((error) => {
                    let errorcase = error.toString();
                    if(errorcase.includes('invalid wid')){
                        failedNumberList.push((i+1) + " " + numberList[i]);
                    }else if(errorcase.includes('Evaluation failed: V')){
                        dublicateNumberList.push((i+1) + " " + numberList[i]);
                    }else{
                        weirdErrorList.push((i+1) + " " + numberList[i]);
                    }
                });
            }
            
            console.log("Failed Numbers: ");
            console.log(failedNumberList);
            console.log("Dublicate Numbers: ");
            console.log(dublicateNumberList);
            console.log("Weird Errors: ");
            console.log(weirdErrorList); 
        }
        else{
            console.log("No group with name (%s) was found, exiting.", groupName);
            exit()
        }
    });

});

client.initialize();