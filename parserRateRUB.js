console.log("hello rates");
const puppeteer = require('puppeteer');



async function getRUB (){
    let RUB
       
    const browser = await puppeteer.launch({"headless": 'new',"args": ["--fast-start", "--disable-extensions", "--no-sandbox"], 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.setDefaultNavigationTimeout(0);
    await newPage.goto('https://www.investing.com/currencies/usd-rub',{waitUntil: 'load'},{timeout: 0})

   
        let allNums = await newPage.evaluate( ()=>{
            const nums = Array.from(document.querySelectorAll('.text-2xl'), e => e.innerText)
            console.log(nums)
            return nums
        })
        RUB = allNums[2]
    
        // console.log(currencyName)

    await browser.close()

    return RUB
    
}


module.exports = {getRUB}