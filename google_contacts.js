const { Keyboard } = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');

puppeteer.use(StealthPlugin());

const waitTillHTMLRendered = async (page, timeout = 30000) => {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;
  
    while(checkCounts++ <= maxChecks){
      let html = await page.content();
      let currentHTMLSize = html.length; 
  
      let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);
  
      console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);
  
      if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) 
        countStableSizeIterations++;
      else 
        countStableSizeIterations = 0; //reset the counter
  
      if(countStableSizeIterations >= minStableSizeIterations) {
        console.log("Page rendered fully..");
        break;
      }
  
      lastHTMLSize = currentHTMLSize;
      await page.waitForTimeout(checkDurationMsecs);
    }  
  };

const importContacts = async (gmail, password) => {
    const browser = await puppeteer.launch({
        headless: true,
        args:[
            '--no-sandbox',
            '--disable-gpu',
            '--enable-webgl',
            '--window-size=1200,1200'
        ]
    }); 

    const loginUrl = "https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fcontacts.google.com%2F&ec=GAlANQ&hl=en&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S486917343%3A1698269238202874&theme=glif";
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36'; 
    const page = await browser.newPage();

    await page.setUserAgent(ua);
    await page.goto(loginUrl, { waitUntil: 'networkidle2' });

    await page.type('input[type="email"]', gmail);
    await page.keyboard.press('Enter');
    await waitTillHTMLRendered(page)

    await page.type('input[type="password"]', password);
    await page.keyboard.press('Enter');

    console.log("Attempting to log in...");

    await page.waitForTimeout(10000)
    const importBtn = await page.$x("/html/body/div[7]/c-wiz[1]/div/gm-coplanar-drawer/div/div/div/div[5]/div[7]/a");

    if (importBtn.length > 0) {
        await importBtn[0].click();
    } else {
        console.log("Failed... Internet maybe too slow... try again")
        throw new Error("importBtn not found");
    }

    console.log("Logged in!");

    await page.waitForTimeout(5000)
    const filePath = path.resolve('contacts.csv');

    console.log("Attempting to import contacts...");

    const selectFile = await page.$x("/html/body/div[7]/div[4]/div/div[2]/span/div/div[3]/button/div[3]");
    
    if (!(selectFile.length > 0)) {
        console.log("Failed... Internet maybe too slow... try again")
        throw new Error("selectFile not found");
    }

    const [filechooser] = await Promise.all([
        page.waitForFileChooser(),
        selectFile[0].click(),
    ]);

    filechooser.accept([filePath]);

    const finalImportBtn = await page.$x("/html/body/div[7]/div[4]/div/div[2]/div[2]/div/button[2]/span")
    if (finalImportBtn.length > 0) {
        await finalImportBtn[0].click();
    } else {
    console.log("Failed... Internet maybe too slow... try again")
    throw new Error("finalImportBtn not found");
    }

    console.log("Import completed...");
};

module.exports = {importContacts}