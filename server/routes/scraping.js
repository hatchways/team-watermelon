const puppeteer = require('puppeteer');
const express = require('express');
const router = express.Router();

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
router.post('/', async (req, res) => {
	const url = req.body.url;

	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url);

		if (domainName(url) === 'amazon') {
			//Amazon Section
			await page.waitForSelector('span#productTitle');
			pageData = await page.evaluate(() => {
				const priceBeginning = /[a-zA-Z]*/;
				const dollarSign = /[$]/;
				let titleData = document.getElementById(`productTitle`);
				let priceData = document.getElementById(`price_inside_buybox`);
				let imageData = document.getElementById(`landingImage`);
				// let descriptionData = document.getElementById(`productDescription`);
				// let descriptionData = [...document.querySelectorAll(`#feature-bullets ul li span`)].map(
				// 	(elem) => elem.innerText
				// );
				return {
					title: titleData.innerText,
					price: priceData.innerText.replace(priceBeginning, '').replace(dollarSign, '').trim(),
					image: imageData.src
				};
			});

			await browser.close();
			res.status(200).send(pageData);
		} else if (domainName(url) === 'ebay') {
			//Ebay Section
			await page.waitForSelector('#itemTitle');
			pageData = await page.evaluate(() => {
				const priceBeginning = /[a-zA-Z]*/;
				let titleData = document.getElementById(`itemTitle`);
				let titleDataText = titleData.innerText.split('').splice(16).join('');
				let priceData = document.getElementById(`prcIsum`);
				let imageData = document.getElementById(`viEnlargeImgLayer_img_ctr`);
				let descriptionData = [...document.querySelectorAll(`#feature-bullets div div div`)].map(
					(elem) => elem.innerText
				);

				return {
					title: titleDataText,
					price: priceData.innerText.replace(priceBeginning, ''),
					image: imageData.src
					// description: descriptionData
				};
			});

			await browser.close();
			res.status(200).send(pageData);
		} else if (domainName(url) === 'craigslist') {
			//Craigslist Section
			await page.waitForSelector('#titletextonly');
			pageData = await page.evaluate(() => {
				let titleData = document.getElementById(`titletextonly`);
				let priceData = document.querySelector(`.price`);
				let imageData = document.querySelector(`.swipe .swipe-wrap div img`);
				let descriptionData = document.querySelector('#postingbody');

				return {
					title: titleData.innerText,
					price: priceData.innerText,
					image: imageData.src,
					description: descriptionData.innerText.replace(/\n/g, '')
				};
			});

			await browser.close();
			res.status(200).send(pageData);
		}
	} catch (err) {
		console.log(err);
		await browser.close();
		console.log('Browser Closed');
		res.status(500).send('Server Error');
	}
});

module.exports = router;
