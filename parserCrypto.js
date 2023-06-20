console.log("helloCommod");
const puppeteer = require('puppeteer');

async function getCrypto (){
    let crypto={
        price:'',
        changes:''
    }
  
  
    const browser = await puppeteer.launch({headless:'new', 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://www.investing.com/',{
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    })


    // await newPage.click('didomi-notice-agree-button')

        let allCrypto = await newPage.evaluate( ()=>{
            const stockArray = Array.from(document.querySelectorAll('.price.js-currency-price'), e => e.innerText)
            
            return stockArray
        })
        crypto.price = allCrypto
    
        // console.log(allBrands)

        let allChanges = await newPage.evaluate( ()=>{
            const cryptoArray = Array.from(document.querySelectorAll('.js-currency-change-24h'), e => e.innerText)
            
            return cryptoArray
        })
        crypto.changes = allChanges

        console.log(crypto)

    await browser.close()

    return crypto
    
}


module.exports = {getCrypto}