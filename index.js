const request = require('request');
const cheerio = require('cheerio');

let url = "https://j-alissa.herokuapp.com/";

module.exports = (address) => {
    request(url, (err, response, html) => {

        const links = [];
        if (!err) {
            const $ = cheerio.load(html);
            // const stylesheetLinks = $('head').children('link').attr('href');
            // console.log(stylesheetLinks);

            // $('link').attr('href')
            $('head').children('link').each((i, el) => {
                if ($(el).attr('rel') === 'stylesheet') {
                    const link = $(el).attr('href');
                    links.push(link);
                    // console.log("getting data", links);
                    return links;

                }
                else {
                    console.log('nothing here  ')
                }
            })
        }
    })
}




