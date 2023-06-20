const puppeteer = require('puppeteer');
(async () => {
    // Launch a headless browser

    let data=[]
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Navigate to the target page
    await page.goto('https://shop.aldcarmarket.com/uk-ua/catalog?financetype=cash');
  
    // Wait for the cars container to load (adjust the selector if needed)
    await page.waitForSelector('.search-result');
  
    const containerElement = await page.$('.search-result');
    let previousHeight = 0;
    let currentHeight = await page.evaluate(element => element.scrollHeight, containerElement);
  
    // Scroll the container to the bottom until no more new content is loaded
    while (previousHeight !== currentHeight) {
      previousHeight = currentHeight;
  
      // Scroll the container to the bottom
      await page.evaluate(element => {
        element.scrollTop = element.scrollHeight;
      }, containerElement);
  
      // Wait for a short delay after each scroll
      await page.waitForTimeout(2000); // Adjust the delay as needed
  
      // Update the current height
      currentHeight = await page.evaluate(element => element.scrollHeight, containerElement);
    }
  
    // Extract the desired information from each car element
    const carElements = await containerElement.$$('.card-car');
    for (const carElement of carElements) {
      const nameElement = await carElement.$('.meta-title');
      const name = await page.evaluate(element => element.textContent.trim(), nameElement);
  
      const priceElement = await carElement.$('.price-text');
      const price = await page.evaluate(element => element.textContent.trim(), priceElement);
  
      const descrElement = await carElement.$('.meta-type');
      const descr = await page.evaluate(element => element.textContent.trim(), descrElement);
  
      // Extract other relevant details here
      data.push({ car: name, desc: descr, price: price });
      console.log(`Car: ${name}, Description: ${descr}, Price: ${price}`);
    }
  
    // Close the browser
    await browser.close();
  })();
  


