const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const newsSchema = new mongoose.Schema({
    title: Types.String,
    source: { id: Types.String, name: Types.String },
    author: Types.String,
    title: Types.String,
    description: Types.String,
    url: Types.String,
    urlToImage: Types.String,
    publishedAt: Types.String,
    content: Types.String
});

module.exports = newsSchema;
