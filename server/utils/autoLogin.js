const puppeteer = require('puppeteer');

const autoLogin = async () => {
	const browser = await puppeteer.launch({ headless: false, args: [`--window-size=1600,867`] });
	const page = await browser.newPage();

	await page.goto('http://localhost:3000/home');
	await page.setViewport({ width: 1566, height: 768 });
	await page.click('#login_button');
	await page.type('#standard-basic-email', 'ethorf@gmail.com');
	await page.type('#standard-password-input', 'tittyhos123');
	await page.click('#login_submit_button');
};

autoLogin();
