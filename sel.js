let {Builder, By, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
driver = new Builder().forBrowser('chrome').build();

let fs = require("fs")
// Intitializing the readFileLines with the file
const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\r\n');

// Calling the readFiles function with file name
let arraySite = readFileLines('sites.txt');


(async function test(){
    
    await driver.get(arraySite[0].toString() + 'frontend/paper_lantern/addon/index.html');

    let user = driver.findElement(By.id('user'));
    let pass = driver.findElement(By.id('pass'));
    await user.sendKeys(arraySite[1].toString());
    await pass.sendKeys(arraySite[2].toString());
    let sub = driver.findElement(By.id('login_submit')).click();
    await timer(2000)
    addDomains(arraySite)
       
    
})();


const timer = ms => new Promise(res=>setTimeout(res, ms))

 async function addDomains(params){
        for (let i =3; i<params.length;i++){
            let user = driver.findElement(By.id('domain'));
            user.clear();
            user.sendKeys(params[i]);
            await timer(1000)
            let ftpChek = driver.findElement(By.id('create_ftp_account')).click();
            let ftpuser = driver.findElement(By.id('ftpuser'));
            ftpuser.clear();
            ftpuser.sendKeys('user')
           
            let password1 = driver.findElement(By.id('password1'));
            let password2 = driver.findElement(By.id('password2'));
            
            password1.sendKeys(params[i])
            password2.sendKeys(params[i])
            
            setTimeout(()=>{
                clickBtn()
            },5000)
            await timer(8000)
            await driver.navigate().back();
            await timer(1500)
            await driver.navigate().refresh();
            await timer(1500)
        }
        
       
     
}

function clickBtn(){
    let domainSub = driver.findElement(By.id('submit_domain'));
    domainSub.click()
}