console.log("hello rates");
const puppeteer = require('puppeteer');



async function getTRY (){
    let TRY
       
    const browser = await puppeteer.launch({"headless": 'new',"args": ["--fast-start", "--disable-extensions", "--no-sandbox"], 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://www.x-rates.com/table/?from=USD&amount=1',{timeout: 0})

   
        let allNums = await newPage.evaluate( ()=>{
            const nums = Array.from(document.querySelectorAll('.rtRates>a'), e => e.innerText)
            console.log(nums)
            return nums
        })
        TRY = allNums
    
        // console.log(currencyName)

    await browser.close()

    return TRY
    
}


module.exports = {getTRY}