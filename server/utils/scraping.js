const puppeteer = require('puppeteer');

function domainName(url) {
	const urlBeginning = /^https?:\/\/?w+\./;
	const ebayRe = /^\bebay\b/;
	const amazonRe = /^\bamazon\b/;
	const craigslistRe = /\b\.craigslist\.\b/;
	let domain = '';
	let domainNoEnd = url.replace(urlBeginning, '');

	if (ebayRe.test(domainNoEnd)) {
		domain = 'ebay';
	} else if (amazonRe.test(domainNoEnd)) {
		domain = 'amazon';
	} else if (craigslistRe.test(domainNoEnd)) {
		domain = 'craigslist';
	} else {
		domain = 'Please enter an ebay or amazon domain';
	}
	return domain;
}
const scraping = async (url) => {
	let pageData;

	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url);

		//This makes sure that the page has loaded based on one selector
		if (domainName(url) === 'amazon') {
			await page.waitForSelector('span#productTitle');

			pageData = await page.evaluate(() => {
				const priceBeginning = /[a-zA-Z]*/;
				const dollarSign = /[$]/;
				//nothing inside or outside of page.evaluate is available outside of it's closure, because it is running purely in the dom
				let titleData = document.getElementById(`productTitle`);
				let priceData = document.getElementById(`price_inside_buybox`);
				let imageData = document.getElementById(`landingImage`);
				// let descriptionData = document.getElementById(`productDescription`);
				// let descriptionData = [...document.querySelectorAll(`#feature-bullets ul li span`)].map(
				// 	(elem) => elem.innerText
				// );

				let pageDataObject = {
					title: titleData.innerText,
					price: priceData.innerText.replace(priceBeginning, '').replace(dollarSign, ''),
					image: imageData.src
					// description: descriptionData.innerText
				};
				return JSON.stringify(pageDataObject);
			});

			await browser.close();
			// return `page data: ${pageData}`;

			console.log(pageData);
		} else if (domainName(url) === 'ebay') {
			//EBAY SECTION
			await page.waitForSelector('#itemTitle');
			pageData = await page.evaluate(() => {
				const priceBeginning = /[a-zA-Z]*/;
				const dollarSign = /[$]/;
				let titleData = document.getElementById(`itemTitle`);
				let titleDataText = titleData.innerText.split('').splice(16).join('');
				let priceData = document.getElementById(`prcIsum`);
				let imageData = document.getElementById(`viEnlargeImgLayer_img_ctr`);
				let descriptionData = [...document.querySelectorAll(`#feature-bullets div div div`)].map(
					(elem) => elem.innerText
				);

				let pageDataObject = {
					title: titleDataText,
					//will want to change this to just the number
					price: priceData.innerText.replace(priceBeginning, ''),
					image: imageData.src
					// description: descriptionData
				};
				return JSON.stringify(pageDataObject);
			});

			await browser.close();
			console.log(pageData);
		} else if (domainName(url) === 'craigslist') {
			//CRAIGSLIST SECTION
			await page.waitForSelector('#titletextonly');
			pageData = await page.evaluate(() => {
				const priceBeginning = /[a-zA-Z]*/;
				const dollarSign = /[$]/;
				let titleData = document.getElementById(`titletextonly`);
				let priceData = document.querySelector(`.price`);
				let imageData = document.querySelector(`.swipe .swipe-wrap div img`);
				// let descriptionData = [...document.querySelectorAll(`#feature-bullets div div div`)].map(
				// 	(elem) => elem.innerText
				// );
				let descriptionData = document.querySelector('#postingbody');

				let pageDataObject = {
					title: titleData.innerText,
					//will want to change this to just the number
					price: priceData.innerText,
					image: imageData.src,
					description: descriptionData.innerText
				};
				return JSON.stringify(pageDataObject);
			});

			await browser.close();
			console.log(pageData);
		}
	} catch (err) {
		console.log(err);
		await browser.close();
		console.log('Browser Closed');
	}
};

console.log(scraping('https://newyork.craigslist.org/lgi/cto/d/hempstead-2004-acura-rsx-automatic/7155188223.html'));

module.exports = scraping;
