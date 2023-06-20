const express = require('express')
const router = express.Router()

// const path = require('path')
// const multer= require('multer')
const db = require('./data')
const mongodb = require('mongodb')


const {getRate}= require('./parserRate')
const {getTRY} = require('./parserRateTRY')
const {getRUB} = require('./parserRateRUB')
const {getCommod} = require('./parserCommodities')
const {getIndex} = require('./parserIndex')
const {getCrypto} = require('./parserCrypto')


const { getDb } = require('./data')
const e = require('express')
const ObjectId = mongodb.ObjectId



// // router.get('/ald', async(req,res)=>{


// // // // parsing ALDI

// //                 let findDefferent=[]
// //                 let newUddationsArray

// //              // to make comperison   

// //                 let fetchedAld = await getALD();
// //                 // console.log(fetchedAld)

// //                 try{
                    
// //                     const request = await db.getDb().collection('aldcars').findOne()
// //                     const resultFromDB = request.data
// //                     // console.log(resultFromDB)

// //                     let diff=[]

// //                     let fetchedALDid = fetchedAld.map(e=>e.id)
// //                     console.log(fetchedALDid)  
                    
// //                     let resultFromDBid = resultFromDB.map(e=>e.id)
// //                     console.log(resultFromDBid)

// //                     for(let i=0; i<fetchedALDid.length; i++){
// //                         if(!resultFromDBid.includes(fetchedALDid[i])){
// //                             diff.push(fetchedALDid[i])
// //                         }
// //                     }

// //                     console.log(diff)

// //                     for(let i=0; i<diff.length; i++){
// //                     const item = fetchedAld.find(e=>e.id==diff[i])
// //                      findDefferent.push(item) 
// //                     }
// //                     console.log(findDefferent)

// //                     const currentDate = new Date().toJSON().slice(0, 10);
// //                     console.log(currentDate)
// //                     const isCurrrentDateInDB = await getDb().collection('dateChanges').findOne({date:currentDate})
// //                     // console.log(isCurrrentDateInDB.date)

// //                     if (!isCurrrentDateInDB){
                    
                        
// //                         try{
// //                             const put = await getDb().collection('dateChanges').insertOne({date:currentDate, updations: findDefferent })
// //                             console.log(put)
// //                         }catch(e){
// //                         }

// //                         const dataToDB = await updateDB()
// //                         // console.log(dataToDB.length)
// //                         try{
// //                             const isExist =  await db.getDb().collection('aldcars').findOne()
// //                             // console.log(isExist)
// //                             if(isExist){
// //                                 await db.getDb().collection('aldcars').drop()
// //                                 const res = await db.getDb().collection('aldcars').insertOne({data:dataToDB})
// //                             } else {
// //                                 await db.getDb().collection('aldcars').insertOne({data:dataToDB})
// //                             }
// //                         }catch(e){
// //                             console.log(e)
// //                         }
// //                     } else {
// //                        const data = await getDb().collection('dateChanges').findOne({date:currentDate})
// //                        console.log('data:', data)
// //                        findDefferent = data.updations
// //                        console.log('diffs:', findDefferent)
// //                     }
            
// //                 }catch(e){
// //                     console.log(e)
// //                 }
            
    
// // // end of ALDI parsing

// // res.send(findDefferent)

// // })





// router.get('/uahrates', async (req,res)=>{
//     console.log('request UAH')
//     const fetchedRates = await getRate();
//     // console.log(fetchedRates)
    
//     let currencies = {
//         "EUR":[],
//         "USD":[]
//     }

    
//     currencies.USD.push(Number(fetchedRates[0]).toFixed(2))
//     currencies.USD.push(Number(fetchedRates[1]).toFixed(2))
//     currencies.EUR.push(Number(fetchedRates[3]).toFixed(2))
//     currencies.EUR.push(Number(fetchedRates[4]).toFixed(2))

//     res.send(currencies)
// })



// router.get('/foreignrates', async (req,res)=>{
//     console.log('request got TRY RUB')

//     let foreign = {
//             'TRY':'', 
//             'RUB':'',
//             'EUR':'',
//     }

//     const fetchedTRY = await getTRY();
//     // console.log(fetchedTRY)
//     foreign.TRY = Number(fetchedTRY[fetchedTRY.length-4]).toFixed(2)
//     foreign.RUB =  Number(fetchedTRY[fetchedTRY.length-26]).toFixed(2)
//     foreign.EUR = Number(fetchedTRY[1]).toFixed(2)

//     console.log(foreign)

//     res.send(foreign)

// })



// router.get('/commodities', async (req,res)=>{
//     console.log('request got commod')

//     let commoditiesPrice = {
//         prices:{
//             'Crude Oil':'', 
//             'Brent Oil':'',
//             'Urals Oil':'',
//             'Natural gas':'',
//             "Coal":'',
//             'TTF Gas':'', 
//             'Gold':'', 
//         },
//         dailyChanges:{
//             'Crude Oil':'', 
//             'Brent Oil':'', 
//             'Urals Oil':'',
//             'Natural gas':'',
//             "Coal":'',
//             'TTF Gas':'', 
//             'Gold':'',
//         },
//         weeklyChanges:{
//             'Crude Oil':'', 
//             'Brent Oil':'', 
//             'Urals Oil':'',
//             'Natural gas':'',
//             "Coal":'',
//             'TTF Gas':'', 
//             'Gold':'',
//         }
//     }
        

    
//     const commoditiesdata = await getCommod();
//     console.log(commoditiesdata)

//     commoditiesPrice.prices['Crude Oil'] = Number(commoditiesdata.goods[0]).toFixed(2)
//     commoditiesPrice.prices['Brent Oil'] = Number(commoditiesdata.goods[1]).toFixed(2)
//     commoditiesPrice.prices['Urals Oil'] = Number(commoditiesdata.goods[13]).toFixed(2)
//     commoditiesPrice.prices['Natural gas'] = Number(commoditiesdata.goods[2]).toFixed(2)
//     commoditiesPrice.prices['Coal'] = Number(commoditiesdata.goods[5]).toFixed(2)
//     commoditiesPrice.prices['TTF Gas'] = Number(commoditiesdata.goods[6]).toFixed(2)
//     commoditiesPrice.prices['Gold'] = Number(commoditiesdata.goods[14]).toFixed(2)

//     commoditiesPrice.weeklyChanges['Crude Oil'] = commoditiesdata.changes[0]
//     commoditiesPrice.weeklyChanges['Brent Oil'] = commoditiesdata.changes[3]
//     commoditiesPrice.weeklyChanges['Urals Oil'] = commoditiesdata.changes[39]
//     commoditiesPrice.weeklyChanges['Natural gas'] = commoditiesdata.changes[6]
//     commoditiesPrice.weeklyChanges['Coal'] = commoditiesdata.changes[15]
//     commoditiesPrice.weeklyChanges['TTF Gas'] = commoditiesdata.changes[18]
//     commoditiesPrice.weeklyChanges['Gold'] = commoditiesdata.changes[42]

//     commoditiesPrice.dailyChanges['Crude Oil'] = commoditiesdata.dailyChanges[0]
//     commoditiesPrice.dailyChanges['Brent Oil'] = commoditiesdata.dailyChanges[1]
//     commoditiesPrice.dailyChanges['Urals Oil'] = commoditiesdata.dailyChanges[13]
//     commoditiesPrice.dailyChanges['Natural gas'] = commoditiesdata.dailyChanges[2]
//     commoditiesPrice.dailyChanges['Coal'] = commoditiesdata.dailyChanges[5]
//     commoditiesPrice.dailyChanges['TTF Gas'] = commoditiesdata.dailyChanges[6]
//     commoditiesPrice.dailyChanges['Gold'] = commoditiesdata.dailyChanges[14]

//     // console.log(commoditiesdata)
//     // console.log(commodities)

//     res.send(commoditiesPrice)

// })




// router.get('/index', async (req,res)=>{
//     console.log('request got index')

//     let stock={
//         price:'',
//         changes:''
//     }

//     const fetchedStock = await getIndex();
//     console.log(fetchedStock)
//     stock.price = fetchedStock.price
//     stock.changes = fetchedStock.changes

   

//     res.send(stock)

// })



router.get('/crypto', async (req,res)=>{
    console.log('request got crypto')

    let crypto={
        price:'',
        changes:''
    }

  try{
    const fetchedcCypto = await getCrypto();
    console.log(fetchedcCypto)

    crypto.price = fetchedcCypto.price
    crypto.changes = fetchedcCypto.changes

   }catch (e) {
        console.log(e)
    }

    res.send(crypto)

})







module.exports = router
