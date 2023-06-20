console.log("helloCommod");
const puppeteer = require('puppeteer');

async function getCommod (){
    let goods={
        goods:'',
        dailyChanges:'',
        changes:'',
    }
  
  
    const browser = await puppeteer.launch({headless:'new', 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://tradingeconomics.com/commodities',{timeout: 0})


    // await newPage.click('didomi-notice-agree-button')

        let allGoods = await newPage.evaluate( ()=>{
            const goodsArray = Array.from(document.querySelectorAll('#p.datatable-item'), e => e.innerText)
            
            return goodsArray
        })
        goods.goods =allGoods
    
        // console.log(allBrands)

        let allChanges = await newPage.evaluate( ()=>{
            const goodsArray = Array.from(document.querySelectorAll('.datatable-item.datatable-heatmap'), e => e.innerText)
            
            return goodsArray
        })


        goods.changes=allChanges


        let dailyChanges = await newPage.evaluate( ()=>{
            const goodsArray = Array.from(document.querySelectorAll('#pch.datatable-item'), e => e.innerText)
            
            return goodsArray
        })


        goods.dailyChanges = dailyChanges
    
       

    await browser.close()

    return goods
    
}


module.exports = {getCommod}