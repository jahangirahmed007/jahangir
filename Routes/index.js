const router = require('express').Router();
const model = require('../model/index');
const request = require('request');
const cheerio = require('cheerio');

router.get('/', (req, res) => {
    try {
        if (req.query.address) {
            let counter = 0;
            let url = req.query.address.split(":")
            if (url[0] === 'http' || url[0] === 'https')
                url = req.query.address
            else
                url = `http://${req.query.address}`
            request(url, (err, response, html) => {
                if (err) {
                    return res.status(200).send({ msg: "No Response" })
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
                }
            })
        } else {
            res.json({
                msg: "No Address is given."
            })
        }
    } catch (e) {
        res.status(200).send({ msg: 'No Response' })
    }
})
module.exports = router;