const puppeteer = require('puppeteer');

const autoLogin = async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto('http://localhost:3000/home');
	await page.setViewport({ width: 1366, height: 768 });
	await page.click('#login_button');
	await page.type('#standard-basic-email', '<your email here>');
	await page.type('#standard-password-input', '<your password here>');
	await page.click('#login_submit_button');

	await page.waitForNavigation();
	console.log('New Page URL:', page.url());
};

autoLogin();
