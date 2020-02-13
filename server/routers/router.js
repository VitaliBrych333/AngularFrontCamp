const express = require('express');
const asyncHandler = require('../handdleMidleware/utils');
const newsModel = require('../models/news-model');
const router = new express.Router();

router.get(
    '/news',
    asyncHandler(async (req, res, next) => {
        const news = await newsModel.find({}).exec();
        res.json(news);
        res.end();
    })
);

router.get(
    '/news/:id',
    asyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const news = await newsModel.findById(id).exec();
        if (news) {
            res.json(news);
            res.end();
        } else {
            throw new Error('Not found!');
        }
    })
);

router.post(
    '/news',
    asyncHandler(async (req, res, next) => {
        const content = req.body;

        if (!content['title']) {
            throw new Error('Did not set the title!');
        }

        await newsModel.create(content, (err) => {
            if (err) throw new Error(`${err}`);
            res.end();
        });
    })
);

router.put(
    '/news/:id',
    asyncHandler(async (req, res, next) => {
        const id = req.params.id;

        await newsModel.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (err) throw new Error(`${err}`);
            res.end();
        });
    })
);

router.delete(
  '/news/:id',
  asyncHandler(async (req, res, next) => {
        const id = req.params.id;

        await newsModel.findByIdAndDelete(id, (err, field) => {
            if (err) throw new Error(`${err}`);
            res.send(field);
        });
  })
)

module.exports = router;
