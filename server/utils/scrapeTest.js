const scrape1 = require('./scrapingFunction');
// const scrape2 = require('./scrapingFunction');

const url =
	'https://www.amazon.ca/Namco-Bandai-Dark-Souls-Fades/dp/B06XTJMF4B/ref=sr_1_1?dchild=1&keywords=dark+souls+4&qid=1594306190&sr=8-1';

const func = (fn) => {
	return fn(url);
};

console.log(func(scrape1));
