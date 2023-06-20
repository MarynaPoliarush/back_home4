console.log("hello rates");
const puppeteer = require('puppeteer');



async function getRate (){
    let currencies
       
   

    let dataCollection 

    const browser = await puppeteer.launch({"headless": 'new' ,"args": ["--fast-start", "--disable-extensions", "--no-sandbox"], 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://finance.i.ua/',{timeout: 0})

   
        let allNums = await newPage.evaluate( ()=>{
            const nums = Array.from(document.querySelectorAll('.value>span:not(._description)'), e => e.innerText).slice(0,6)
            
            return nums
        })
        currencies = allNums
    
        // console.log(currencyName)
    
    

        // console.log(currencies)

    await browser.close()

    return currencies
    
}





module.exports = {getRate}