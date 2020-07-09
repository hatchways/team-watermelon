const puppeteer = require('puppeteer');
const arr = [];
// let obj = {};
const amazonUrl =
    'https://www.amazon.ca/Namco-Bandai-Dark-Souls-Fades/dp/B06XTJMF4B/ref=sr_1_1?dchild=1&keywords=dark+souls+4&qid=1594306190&sr=8-1';

const scraping = async (url) => {
    return new Promise((resolve, reject) => {
        puppeteer.launch({ headless: true })
        .then(browser => (_browser = browser))
        .then(browser => (_page = browser.newPage()))
        .then(page => page.goto(url, {"waitUntil":["load", "networkidle2"]}))
        .then(() => _page)
        .then(page => page.waitForSelector('span#productTitle'))
        .then(pageSelector => pageSelector.evaluate(() => {
            let titleData = document.getElementById(`productTitle`);
            return { title: titleData.innerText };
        }))
        .then(pageData => resolve(pageData))
        .catch(err => reject(err));
    });
}

/*scraping(amazonUrl)
.then((result) => {
    console.log(result.title);
});*/

module.exports = scraping;