console.log("hello");
const puppeteer = require('puppeteer');



async function getALD (){
    let ids
    let brands
    let hrefs 
    let description

    let dataCollection 

    const browser = await puppeteer.launch({"headless": 'new',"args": ["--fast-start", "--disable-extensions", "--no-sandbox"], 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://shop.aldcarmarket.com/uk-ua/catalog?financetype=cash',{timeout: 0})


    // await newPage.click('didomi-notice-agree-button')

    let windowOpen = await newPage.evaluate( ()=>{
        const button = document.querySelector('#didomi-notice-agree-button').click()
        return button
    })



  

    // const selector  = '.search-results__cards > .close-btn';

    // await newPage.waitForXPath('.close-btn')
    // await newPage.evaluate(item =>item.scrollIntoView(),item)
    // await new Promise(res=>setTimeout(() => {
    //     res
    // }, 2000)
    // )
    

    


   
        let allBrands = await newPage.evaluate( ()=>{
            const brandArray = Array.from(document.querySelectorAll('.meta-title'), e => e.innerText)
            
            return brandArray
        })
        brands = allBrands
    
        // console.log(allBrands)
    
        let allHrefs = await newPage.evaluate( ()=>{
            // const idArray = Array.from(document.querySelectorAll('.card-car a'), e => e.href)
            const hrefArray = Array.from(document.querySelectorAll('.card-car a'), e => e.href)
    
            return hrefArray
        })
        // console.log(allHrefs)
    
        hrefs = allHrefs
       
    
        let allID = await newPage.evaluate( ()=>{
            // const idArray = Array.from(document.querySelectorAll('.card-car a'), e => e.href)
            const hrefArray = Array.from(document.querySelectorAll('.card-car a'), e => e.href)
            const idArray = hrefArray.map(e => e.slice(e.indexOf('?financetype')-6,e.indexOf('?financetype')))
    
            return idArray
        })
       
        // console.log(allID)
    
        ids = allID
    
    
        
        let allDescr = await newPage.evaluate( ()=>{
           
            const descrArray = Array.from(document.querySelectorAll('.meta-type'), e => e.innerText)
            return descrArray
        })
       
        // console.log(allDescr)
    
        description = allDescr
        
    
       
    
        dataCollection = new Array()
    
        for (let i=0; i<15;i++){
            let obj = new Object({
                'id': ids[i],
                'brand': brands[i],
                'href': hrefs[i],
                'description':description[i]
            })
            dataCollection.push(obj)
        }
        
        // console.log(dataCollection)

    


    await browser.close()

    return dataCollection
    
}






module.exports = {getALD}