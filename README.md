# WhatsApp-Group-Adder
This is a js app developed to allow mass addition of phone numbers to a whatsApp group

# Disclaimer
This app is not offical or related to developers from whatsapp <br>
This app is built based on [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js#whatsapp-webjs) so please read their disclaimer.

# Dependencies
- [git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en)

# Instructions

Make sure you installed all the required dependinces listed above!!

Start by cloning this Repo in a desired directory by running
```
git clone https://github.com/SculptedNYX/WhatsApp-Group-Adder.git
```
then, Navigate to the cloned directory
```
cd ./WhatsApp-Group-Adder/
```
Here we will need to install the npm packages through (this could take a bit)
```
npm install
```
Now we are ready to prepare the number list, copy the list of numbers and make sure they are formated correctly and paste them in the numbers.txt file found in the project

a correctly formated number.txt file should look like this (each number in its own line)
```
number1
number2
number3
```
Now run this command to start the process
```
node ./index
```

# Handled cases
- The number contains spaces
- The number starts with 0 in typical egyptian fashion
- The number starts with a valid country code
- All other cases that arent added to the group are sent to their respective lists in the output 

# Usage
Once the program is running you will get a QR code on screen. This QR code should be scanned using the whatsapp client (linked devices on whatsapp).<br>
If the link is completed you will see 'AUTHENTICATED' then 'Client is ready!'.<br>
Enter the group name you want the numbers to be added to.<br>
If the group is found you will be prompted to enter Y/y to begin the process.<br>

# Output
The final output will be 3 lists.
- Failed Numbers: this list containes all the numbers whatsapp couldn't resolve with their number in the file
- Dublicate Numbers: this lists contains all the numbers already in the whatsapp group with their number in the file
- Weird Errors: this list contains all the numbers that caused unexcpected errors (will be empty in most cases)

# Credits
to [Julzk](https://github.com/Julzk/) for providing the whatsapp-web.js's hotfix <br>
to [pedroslopez](https://github.com/pedroslopez) for providing the whatsapp-web.js framework
