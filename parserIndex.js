console.log("helloCommod");
const puppeteer = require('puppeteer');

async function getIndex (){
    let stock={
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

        let allStock = await newPage.evaluate( ()=>{
            const stockArray = Array.from(document.querySelectorAll('#QBS_2_inner .lastNum'), e => e.innerText)
            
            return stockArray
        })
        stock.price = allStock
    
        // console.log(allBrands)

        let allChanges = await newPage.evaluate( ()=>{
            const stockArray = Array.from(document.querySelectorAll('#QBS_2_inner .chgPer'), e => e.innerText)
            
            return stockArray
        })
        stock.changes = allChanges

        console.log(stock)

    await browser.close()

    return stock
    
}


module.exports = {getIndex}