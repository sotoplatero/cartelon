const chromium = require('chrome-aws-lambda');
const got = require("got");
// const cheerio = require("cheerio");
const fs = require("fs");
const path = require('path');
const URL = require('url');
var dot = require("dot");

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
])

const localChrome = process.env.PATH_CHROME;

export default async ( req, res ) => {

    const {
        query: { url, bg = '', color = '', theme = 'play', font },
    } = req

    let [ bgfrom, bgto ] = bg.split('_') ;
    let [ colorfrom, colorto ] = color.split('_');
    let metadata;

    if ( !url ) return {
        statusCode: 400,
        body: JSON.stringify({ message: 'url parameter not defined' })
    }

      const { body: html } = await got(url)
      metadata = await metascraper({ html, url })

    try {
        const resolved = path.resolve(__dirname, `./themes/${theme}.html`)        
        let tmpl = fs.readFileSync( resolved, "utf8" );
        const view = dot.template(tmpl);

         const content = view({ 
            ...metadata,
            bgto: bgto, 
            bgfrom: bgfrom, 
            colorto: colorto, 
            colorfrom: colorfrom, 
            font: font, 
            domain: URL.parse(url).hostname 
        })
        
        const browser = await chromium.puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: localChrome || await chromium.executablePath,
            headless: true,
        });
        
        // Open page base
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 628 }); // relation 1/2
        await page.setContent( content ) ;
      
        // const card = await page.$('body');
        const screenshot = await page.screenshot();
        await browser.close();

        res.setHeader('Content-Type', `image/jpg`);
        // res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.status(200).send(screenshot);;

        // return {
        //     statusCode: 200,
        //     headers: { 
        //     	'Content-type': 'image/jpeg', 
        //         'Cache-Control': 'no-store',
        //     },
        //     body: screenshot,   
        //     isBase64Encoded: true            
        // }     

    } catch (e) {
        console.log(e)
        return {
            headers: { 'Content-Type':'application/json'},            
            statusCode: 500,
            body: JSON.stringify({ message: 'Error' }),   
        }     

    }
}
