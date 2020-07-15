const puppeteer = require('puppeteer');

const scraping = async (url) => {
	function domainName(address) {
		const urlBeginning = /^https?:\/\/?w+\./;
		const ebayRe = /^\bebay\b/;
		const amazonRe = /^\bamazon\b/;
		const craigslistRe = /\b\.craigslist\.\b/;
		let domain = '';
		let domainNoEnd = address.replace(urlBeginning, '');

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

	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'load' });

		if (domainName(url) === 'amazon') {
			await page.waitForSelector('span#productTitle');
			//AMAZON SECTION
			pageData = await page.evaluate(() => {
				const priceBeginning = /[a-zA-Z]*/;
				let titleData = '';
				let priceData = '';
				let imageData = '';
				let descriptionData = '';
				titleData = document.getElementById(`productTitle`);

				if (document.getElementById(`priceblock_dealprice`) !== null) {
					priceData = document
						.getElementById(`priceblock_dealprice`)
						.innerText.replace(priceBeginning, '')
						.replace(/\s/, '')
						.trim();
				} else if (document.getElementById(`price_inside_buybox`) !== null) {
					priceData = document
						.getElementById(`price_inside_buybox`)
						.innerText.replace(priceBeginning, '')
						.replace(/\s/, '')
						.trim();
				} else if (document.getElementById(`priceblock_ourprice`) !== null) {
					priceData = document
						.getElementById(`priceblock_ourprice`)
						.innerText.replace(priceBeginning, '')
						.replace(/\s/, '')
						.trim();
				} else {
					priceData = 'Unknown';
				}

				imageData = document.getElementById(`landingImage`);
				if (document.querySelector(`#productDescription p`)) {
					descriptionData = document.querySelector(`#productDescription p`).innerText;
				} else if ([...document.querySelectorAll(`#feature-bullets ul li span`)][0] !== null) {
					descriptionData = [...document.querySelectorAll(`#feature-bullets ul li span`)].map(
						(elem) => elem.innerText
					).join;
				} else {
					descriptionData = 'Unknown';
				}

				return {
					title: titleData.innerText,
					price: priceData,
					image: imageData.src,
					description: descriptionData
				};
			});

			await browser.close();
			return pageData;
		} else if (domainName(url) === 'ebay') {
			//EBAY SECTION
			await page.waitForSelector('#itemTitle');
			pageData = await page.evaluate(() => {
				const priceBeginning = /[a-zA-Z]*/;
				let titleData = document.getElementById(`itemTitle`);
				let titleDataText = titleData.innerText.split('').splice(16).join('');
				let priceData = document.getElementById(`prcIsum`);
				let imageData = document.getElementById(`viEnlargeImgLayer_img_ctr`);
				return {
					title: titleDataText,
					price: priceData.innerText.replace(priceBeginning, ''),
					image: imageData.src
				};
			});
			pageData.url = url;
			await browser.close();
			return pageData;
		} else if (domainName(url) === 'craigslist') {
			//CRAIGSLIST SECTION

			await page.waitForSelector('#titletextonly');

			pageData = await page.evaluate(() => {
				let titleData = '';
				let priceData = '';
				let imageData = '';
				let descriptionData = '';

				titleData = document.getElementById(`titletextonly`);
				if (document.querySelector(`.price`) !== null) {
					priceData = document.querySelector(`.price`).innerText;
				} else {
					priceData = 'Unknown';
				}
				imageData = document.querySelector(`.swipe .swipe-wrap div img`);
				descriptionData = document.querySelector('#postingbody');

				return {
					title: titleData.innerText,
					price: priceData,
					image: imageData.src,
					description: descriptionData.innerText.replace(/\n/g, '')
				};
			});

			await browser.close();
			return pageData;
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = scraping;
