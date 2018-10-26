const httpModule = require("http");


const config = require("./config");


function listNews() {
    return httpModule.getJSON(config.serverUrl + "/api/news/homepage");
}

function getNews(url) {
    return httpModule.getJSON(config.serverUrl + "/api/news/" + url);
}


exports.listNews = listNews;
exports.getNews = getNews;
