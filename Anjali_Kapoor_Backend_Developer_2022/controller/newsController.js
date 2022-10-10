
var db = require('../models');
var url = require('url');
const { validationResult } = require('express-validator/check');

const News = db.news;

let addNews = async (req, resp) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            resp.status(422).json({ errors: errors.array()[0].msg });
            return;
        }
        let params = req.body;
        await News.create(
            {
                ...(params.article && { article: params.article }),
                ...(params.author_name && { author_name: params.author_name }),
                ...(params.title && { title: params.title }),
                ...(params.subtitle && { subtitle: params.subtitle }),
                ...(params.description && { description: params.description }),
                ...(params.image && { image: params.image }),
                ...(params.publish_date && { publish_date: params.publish_date })
            }
        ).then((x) => resp.status(200).json({ success_msg: "News Added", data: x }))
            .catch((err) => resp.status(500).json({ errors: err }))

    }
    catch (err) {
        console.log(err);
    }
}

let updateNews = async (req, resp) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            resp.status(422).json({ errors: errors.array()[0].msg });
            return;
        }
        let params = req.body;
        await News.update(
            {
                ...(params.article && { article: params.article }),
                ...(params.author_name && { author_name: params.author_name }),
                ...(params.title && { title: params.title }),
                ...(params.subtitle && { subtitle: params.subtitle }),
                ...(params.description && { description: params.description }),
                ...(params.read_status && { read_status: params.read_status })
            },
            {
                where: {
                    id: params.id,
                }
            }).then((x) => resp.status(200).json({ success_msg: "Article updated!" }))
            .catch((err) => resp.status(500).json({ errors: err }));
    }
    catch (err) {
        console.log(err);
    }
}

let deleteNews = async (req, resp) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            resp.status(422).json({ errors: errors.array()[0].msg });
            return;
        }
        let params = req.body;

        await News.destroy({
            where: {
                id: params.id
            }
        }).then((x) => resp.status(200).json({ success_msg: "News Deleted" }))
            .catch((err) => resp.status(500).json({ errors: err }))
    }
    catch (err) {
        console.log(err);
    }
}

let getAllNews = async (req, resp) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            resp.status(422).json({ errors: errors.array()[0].msg });
            return;
        }
        let params = req.body;
        let getAllData = await News.findAll({
            order: [['read_status', 'asc'], ['publish_date', 'desc']],
            ...(params.limit && {limit: params.limit}),
            ...(params.offset && {offset: params.offset}),
        });

        let response = {
            data: getAllData
        }

        resp.status(200).json(response);
    }
    catch (err) {
        console.log(err);
    }
}

let getNewsById = async (req, resp) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            resp.status(422).json({ errors: errors.array()[0].msg });
            return;
        }

        let params = url.parse(req.url, true).query;

        let getNewsData = await News.findOne({
            where: {
                id: params.id
            }
        });
        let response = {
            data: getNewsData
        }

        resp.status(200).json(response);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    addNews,
    updateNews,
    deleteNews,
    getAllNews,
    getNewsById,
}