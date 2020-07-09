const puppeteer = require('puppeteer');
const arr = [];
// let obj = {};
const amazonUrl =
	'https://www.amazon.ca/Namco-Bandai-Dark-Souls-Fades/dp/B06XTJMF4B/ref=sr_1_1?dchild=1&keywords=dark+souls+4&qid=1594306190&sr=8-1';
const scraping = async (url) => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url);
		await page.waitForSelector('span#productTitle');
		let pageData = await page.evaluate(() => {
			let titleData = document.getElementById(`productTitle`);
			return { title: titleData.innerText };
		});
		await browser.close();
		return pageData;
		console.log(pageData);
	} catch (error) {}
	console.log(pageData);
	return pageData;
};
const promiseTest = async () => {
	try {
		const bob = 'bob';
		return bob;
	} catch (error) {}
};
const promiseReturn = () => {
	return promiseTest();
};
async function run() {
	const data = await scraping(amazonUrl).then((result) => {
		return result;
	});
	return data;
	// Your logic goes here.
}
// console.log(Promise.resolve(scraping(amazonUrl)));
console.log(scraping(amazonUrl));
// console.log(run());
