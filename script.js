const request = require('request');
const cheerio = require('cheerio');


let url = 'https://j-alissa.herokuapp.com/';

module.exports = request(url, (err, response, html) => {
    const links = [];
    if (!err) {
        const $ = cheerio.load(html);
        $('body').children('script').each((i, el) => {
            const link = $(el).attr('src')
            console.log(link)
        })
    }




})
