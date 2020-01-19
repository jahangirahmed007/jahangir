const router = require('express').Router();

const model = require('../model/index');
// const getlinks = require('../index');
const request = require('request');
const cheerio = require('cheerio');

router.get('/', (req, res) => {

    // console.log(req.params.address);  
    // getlinks(req.params.address);
    // const { links } = getlinks;
    // console.log(links, 'these are links');

    try {
        if (req.query.address) {
            let counter = 0;
            // https://j-alissa.herokuapp.com/
            // let url = `http://${req.query.address}`;
            let url = req.query.address.split(":")
            if (url[0] === 'http' || url[0] === 'https')
                url = req.query.address
            else
                url = `http://${req.query.address}`
            console.log(url);
            request(url, (err, response, html) => {
                if (err) {
                    return res.status(200).send("No Response")
                }
                const csslinks = [];
                const jslinks = [];
                if (!err) {
                    const $ = cheerio.load(html);
                    $('head').children('link').each((i, el) => {
                        if ($(el).attr('rel') === 'stylesheet') {
                            const link = $(el).attr('href');
                            csslinks.push(link);
                            counter++
                        }
                    })
                    $('body').children('script').each((i, el) => {
                        if ($(el).attr('src')) {
                            const link = $(el).attr('src')
                            jslinks.push(link);
                            counter++
                        }
                    })
                    if (counter === 0)
                        return res.json({
                            msg: "Nothing Found Here"
                        })

                    const newLinks = new model({
                        webUrl: url,
                        cssLinks: csslinks,
                        jsLinks: jslinks
                    })
                    newLinks.save().then((data) => {
                        return res.json(data)
                    }).catch(err => {
                        res.status(500).send("Something went wrong.")
                    })
                    // console.log({ css: csslinks, js: jslinks });
                    // return res.send({ css: csslinks, js: jslinks })

                }
            })
        } else {
            res.json({
                msg: "No Address is given."
            })
        }
    } catch (e) {
        res.status(200).send('No Response')
    }
})
module.exports = router;