# WhatsApp-Group-Adder
This is a js app developed to allow mass addition of phone numbers to a whatsApp group through levreaging google contacts and whatsapp-web.js.

# Description
In order to achieve the goal of adding the list numbers.txt to a whatsapp group the app first creates a CSV file of the numbers then addes the numbers to [google contacts](https://contacts.google.com/). This step is required since sometimes the program encounters errors when trying to add non-contacts. After the csv is created and the google contacts added, The whatsapp group addition process starts. The additon process is handled using the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js#whatsapp-webjs) framework.

# Disclaimer
- This app is not offical or related to developers from whatsapp.
- This app is built based on [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js#whatsapp-webjs) so please read their disclaimer.

# Dependencies
- a google account and the [google contacts](https://contacts.google.com/) app on your phone
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
1. First the user enters the numbers in the 'numbers.txt' file in the correct format.
2. A prompt asking the user to create and import a csv to google contacts **NOTE: THIS IS ESSINTAL IF YOU DONT HAVE THE NUMBERS ALREADY IN YOUR CONTACTS**
3. A prompt asking the user to enter their Gmail email and password. No information is collected on my behalf and you are encourged to check the code if you dont trust it
4. The user should check their phone to make sure the contacts are synced then proceed to the next step
5. Once the program is running you will get a QR code on screen. This QR code should be scanned using the whatsapp client (linked devices on whatsapp)
6. Enter the group name you want the numbers to be added to
7. If the group is found you will be prompted to enter Y/y to begin the process

# Output
The final output will be 3 lists.
- Failed Numbers: this list containes all the numbers whatsapp couldn't resolve with their number in the file
- Dublicate Numbers: this lists contains all the numbers already in the whatsapp group with their number in the file
- Weird Errors: this list contains all the numbers that caused unexcpected errors (will be empty in most cases)

# Credits
to [Julzk](https://github.com/Julzk/) for providing the whatsapp-web.js's hotfix <br>
to [pedroslopez](https://github.com/pedroslopez) for providing the whatsapp-web.js framework
