const chromium = require('chrome-aws-lambda');

const localChrome = process.env.PATH_CHROME;
var xss = require("xss");
var path = require("path")
const fs = require("fs");
var dot = require("dot");

exports.handler = async (event, context) => {

    let qs = event.queryStringParameters;
    Object.keys(qs).forEach((key, index) => qs[key] = xss(qs[key]));
    let parameters = qs;

    parameters.text = parameters.text
        .replace(/\*\*(.+)\*\*/g,'<strong style="font-weight: 900;">$1</strong>')
        .replace(/\*(.+)\*/g,'<em>$1</em>')
        .replace(/\_(.+)\_/g,'<span style="text-decoration: underline;">$1</span>')
        .replace(/\./g,'<br/>');

    try {
        
        const browser = await chromium.puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: localChrome || await chromium.executablePath,
            headless: chromium.headless,
        });
        
        // Open page base
        let tmpl = fs.readFileSync( path.resolve(__dirname, "./layout.html"), "utf8" );
        const view = dot.template(tmpl);
        
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 640 }); // relation 1/2        
        await page.setContent( view(parameters) ) ;
        await page.evaluate( () => {
            let text = document.querySelector('h1')
            do {
                text.style.fontSize =  (parseInt(text.style.fontSize) - 1) + 'px'
            } while (text.offsetHeight > 640 || text.offsetWidth > 1280);            
        })
      
        const elCode = await page.$('#txt2img');
        const screenshot = await elCode.screenshot({ encoding: 'base64' });
        await browser.close();

        return {
            statusCode: 200,
            headers: { 
            	'Content-type': 'application/json', 
            	// 'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000' 
            },
            body: JSON.stringify(screenshot),   
            // isBase64Encoded: true            
        }     

    } catch (e) {

        return {
            headers: { 'Content-Type':'application/json'},            
            statusCode: 500,
            body: JSON.stringify({error: e}),   
        }     

    }
    

}
